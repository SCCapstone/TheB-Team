<template>
    <div class="calculator">
        <hr>
        <h1>Calculator</h1>
        <hr>
        <p>Enter a street, city, and state for both Point A and Point B to start calculations</p>
        <h4>Point A</h4>
        <input type="text" v-model="street1" placeholder="Street">
        <input type="text" v-model="city1" placeholder="City">
        <input type="text" v-model="state1" placeholder="State">
        <h4>Point B</h4>
        <input type="text" v-model="street2" placeholder="Street">
        <input type="text" v-model="city2" placeholder="City">
        <input type="text" v-model="state2" placeholder="State">
        <button :disabled="!(street1 && city1 && state1 && street2 && city2 && state2)" @click="getVariables()">Submit</button>
        <div v-if="variables.length">
            <hr>
            <label>Please provide some more info about the vehicle</label>
            <div v-for="(variable, index) in variables" :key="index">
                <label>{{ variable.name }}: </label>
                <input type="number" min="0" oninput="this.value = Math.abs(this.value)" v-model="inputs[variable.name]">
            </div>
            <button @click="calculate()">Submit</button>
            <hr>
        </div>
        <div v-if="showPrice">
            <hr>
            <h1>Price = ${{ permit }}</h1>
            <hr>
        </div>
        <div>
            <label class="error">{{ errorMessage }}</label>
        </div>
        <div v-if="isLoading">
            <label>Loading...</label>
        </div>
    </div>
</template>

<script>
import { getRoute, getRouteAvoid4L, states, getCoord } from '@/utils';
import { getConditionsByStates, getVariablesFiltered } from '@/firebase';

export default {
    name: 'calculatorView',
    data() {
        return {
            street1: "",
            street2: "",
            city1: "",
            city2: "",
            state1: "",
            state2: "",
            lat1: 0,
            lng1: 0,
            lat2: 0,
            lng2: 0,
            routes: [],
            states: [],
            conditions: [],
            variables: [],
            inputs: {},
            basePermit: 0,
            permit: 0,
            mileage: {},
            fourLaneMileage: {},
            showPrice: false,
            errorMessage: '',
            isLoading: false
        }
    },
    created () {
        this.states = states;  
    },
    methods: {
        async getVariables() {
            this.isLoading = true;
            try {
                this.errorMessage = '';
                this.showPrice = false;
                this.variables = [];
                this.inputs = [];
                this.basePermit = 0;
                var response1 = await getCoord(this.street1,this.city1,this.state1);
                var response2 = await getCoord(this.street2,this.city2,this.state2);

                if (response1.data.Response.View.length && response2.data.Response.View.length) {
                    this.lat1 = response1.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude
                    this.lng1 = response1.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude
                    this.lat2 = response2.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude
                    this.lng2 = response2.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude
                    const response = await getRoute(this.lat1, this.lng1, this.lat2, this.lng2);
                    const responseSans4L = await getRouteAvoid4L(this.lat1, this.lng1, this.lat2, this.lng2);
                    this.routes = response.data.response.route[0].summaryByCountry;
                    this.routesSans4L = responseSans4L.data.response.route[0].summaryByCountry;
                    const routeStates = [];
                    this.routes.forEach(route => {
                        this.states.forEach(state => {
                            if (route.country === state.text) {
                                routeStates.push(state.key);
                                this.mileage[state.key] = route.distance * 0.00062137;
                                this.basePermit += state.base + state.broker;
                            }
                        });
                    });
                    this.routesSans4L.forEach(route => {
                        this.states.forEach(state => {
                            if (route.country === state.text) {
                                this.fourLaneMileage[state.key] = (route.distance * 0.00062137) - this.mileage[state.key];
                                if(this.fourLaneMileage[state.key] < 0) {
                                    this.fourLaneMileage[state.key] = 0;
                                }
                            }
                        });
                    });
                    this.conditions = await getConditionsByStates(routeStates);
                    const variableQuery = [];
                    this.conditions.forEach(condition => {
                        if (variableQuery.indexOf(condition.variable) === -1) {
                            variableQuery.push(condition.variable);
                        }
                    });
                    if (variableQuery.length) {
                        this.variables = await getVariablesFiltered(variableQuery);
                    } else {
                        this.calculate();
                    }
                } else {
                    this.errorMessage = 'One or more of these addresses is invalid'
                }
            } catch (error) {
                console.log(error);
                this.errorMessage = 'Cannot find a route between these points';
            } finally {
                this.isLoading = false;
            }
        },
        calculate () {
            this.permit = this.basePermit;
            this.conditions.forEach(condition => {
                var ifTrue = false;
                if (condition.condition === 'less-than') {
                    ifTrue = this.inputs[condition.variable] < condition.value;
                } else if (condition.condition === 'less-equal') {
                    ifTrue = this.inputs[condition.variable] <= condition.value;
                } else if (condition.condition === 'greater-than') {
                    ifTrue = this.inputs[condition.variable] > condition.value;
                } else if (condition.condition === 'greater-equal') {
                    ifTrue = this.inputs[condition.variable] >= condition.value;
                } else if (condition.condition === 'equal-to') {
                    ifTrue = this.inputs[condition.variable] === condition.value;
                }
                if (ifTrue) {
                    if (condition.operation === 'addFlat') {
                        this.permit += condition.operand;
                    } else if (condition.operation === 'addPerMile') {
                        this.permit += condition.operand * this.mileage[condition.state];
                    } else if (condition.operation === 'addPer4LaneMile') {
                        this.permit += condition.operand * this.fourLaneMileage[condition.state];
                    }
                }
            });
            this.permit = this.permit.toFixed(2);
            this.showPrice = true;
        }
    }
}
</script>

<style scoped>
    h4{
        color: #4CAF50;
    }
    h2,h3{
        text-shadow: 1px 1px 1px #4CAF50,
                    2px 2px 1px #4CAF50;
    }
    .display{
        text-align: center;
    }
    input{
        width: 20%;
    }
    .error{
        color: red;
    }
</style>