<template>
    <div class="calculator">
        <hr>
        <h1>Calculator</h1>
        <hr>
        <p>Enter a latitude followed by a longitude for both points and click submit to get your permit price</p>
        <p>An example of a set of valid coordinates is: 33.520217,-80.672052 and 35.725890, -78.589105</p>
        <h4>Point A</h4>
        <input type="number" v-model="lat1" placeholder="Lat1">
        <input type="number" v-model="lng1" placeholder="Lng1">
        <h4>Point B</h4>
        <input type="number" v-model="lat2" placeholder="Lat2">
        <input type="number" v-model="lng2" placeholder="Lng2">
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
import { getRoute, states } from '@/utils';
import { getConditionsByStates, getVariablesFiltered } from '@/firebase';

export default {
    name: 'calculatorView',
    data() {
        return {
            lat1: 33.520217,
            lng1: -80.672052,
            lat2: 35.725890,
            lng2: -78.589105,
            routes: [],
            states: [],
            conditions: [],
            variables: [],
            inputs: {},
            permit: 0,
            mileage: {},
            showPrice: false
        }
    },
    created () {
        this.states = states;  
    },
    methods: {
        async getVariables() {
            this.showPrice = false;
            const response = await getRoute(this.lat1, this.lng1, this.lat2, this.lng2);
            this.routes = response.data.response.route[0].summaryByCountry;
            const routeStates = [];
            this.routes.forEach(route => {
                this.states.forEach(state => {
                    if (route.country === state.text) {
                        routeStates.push(state.key);
                        this.mileage[state.key] = route.distance / 0.00062137;
                        this.permit += state.base + state.broker;
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
                    }
                }
            });
            this.showPrice = true;
        }
    }
}
</script>