<template>
    <div class="calculator">
        <hr>
        <h1>Calculator</h1>
        <hr>
        <p>Enter a street, city, and state for both Point A and Point B (Note: No route will be displayed if a route for your coordinates does not exist)</p>
        <h4>Point A</h4>
        <input type="text" v-model="street1" placeholder="Street">
        <input type="text" v-model="city1" placeholder="City">
        <input type="text" v-model="state1" placeholder="State">
        <h4>Point B</h4>
        <input type="text" v-model="street2" placeholder="Street">
        <input type="text" v-model="city2" placeholder="City">
        <input type="text" v-model="state2" placeholder="State">
        <button @click="getVariables()">Start Calculation</button>
        <div v-for="(variable, index) in variables" :key="index">
            <label>{{ variable.name }}: </label>
            <input :type="variable.type" v-model="inputs[variable.name]">
        </div>
        <button v-if="variables.length" @click="calculate()">Submit</button>
        <div v-if="showPrice">
            <hr>
            <h1>Price = ${{ permit }}</h1>
            <hr>
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
            permit: 0,
            mileage: {},
            fourLaneMileage: {},
            showPrice: false
        }
    },
    created () {
        this.states = states;  
    },
    methods: {
        async getVariables() {
            this.showPrice = false;
            this.permit = 0;
            var response1 = await getCoord(this.street1,this.city1,this.state1);
            var response2 = await getCoord(this.street2,this.city2,this.state2);

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
                        this.permit += state.base + state.broker;
                    }
                });
            });
            this.routesSans4L.forEach(route => {
                this.states.forEach(state => {
                    if (route.country === state.text) {
                        this.fourLaneMileage[state.key] = (route.distance * 0.00062137) - this.mileage[state.key];
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
            this.variables = await getVariablesFiltered(variableQuery);
        },
        calculate () {
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
</style>