<template>
    <div>
        <h3>{{ id }}</h3>
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="state">State:</label><br>
                <select id="state" name="state" v-model="form.state" required>
                    <option disabled selected value> -- select an option -- </option>
                    <option v-for="(state, index) in states" :key="index" :value="state.key">{{ state.text }}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="variable">Variable:</label><br>
                <input type="text" id="variable" name="variable" v-model="form.variable" required>
            </div>

            <div class="form-group">
                <label for="condition">Condition:</label><br>
                <select id="condition" name="condition" v-model="form.condition" required>
                    <option disabled selected value> -- select an option -- </option>
                    <option v-for="(condition, index) in conditions" :key="index" :value="condition.key">{{ condition.text }}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="value">Value:</label><br>
                <input type="number" id="value" name="value" step=".01" v-model="form.value" required>
            </div>
            
            <label>If True Then...</label><br>

            <div class="form-group">
                <label for="operation">Operation:</label><br>
                <select id="operation" name="operation" v-model="form.operation" required>
                    <option disabled selected value> -- select an option -- </option>
                    <option v-for="(operation, index) in operations" :key="index" :value="operation.key">{{ operation.text }}</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="operand">Operand:</label><br>
                <input type="number" id="operand" name="operand" step=".01" v-model="form.operand" required>
            </div>

            <button type="submit">
                Submit
            </button>
        </form>
    </div>
</template>

<script>
import { createCondition, updateCondition, getCondition } from '@/firebase';
import { reactive } from 'vue';
import router from '@/router';
export default {
    name: 'Condition',
    data () {
        return {
            id: '',
            conditions: [
                {
                    key: 'lessthan',
                    text: '<'
                },
                {
                    key: 'less-equal',
                    text: '<='
                },
                {
                    key: 'greater-than',
                    text: '>'
                },
                {
                    key: 'greater-equal',
                    text: '>='
                },
                {
                    key: 'equal-to',
                    text: '='
                }
            ],
            states: [
                {
                    key: 'AL',
                    text: 'Alabama'
                }
            ],
            operations: [
                {
                    key: 'addFlat',
                    text: 'Add Flat'
                },
                {
                    key: 'addPerMile',
                    text: 'Add Per Mile'
                }
            ],
            form: reactive({
                state: '',
                variable: '',
                condition: '',
                value: 0,
                operation: '',
                operand: 0
            })
        }
    },
    async created () {
        this.id = this.$route.params.id;
        if (this.id !== 'new') {
            const condition = await getCondition(this.id);
            this.form.state = condition.state;
            this.form.variable = condition.variable;
            this.form.condition = condition.condition;
            this.form.value = condition.value;
            this.form.operation = condition.operation;
            this.form.operand = condition.operand;
        }
    },
    methods: {
        async onSubmit () {
            if (this.id === 'new') {
                createCondition({ ...this.form });
            } else {
                updateCondition(this.id, { ...this.form });
            }
            router.push({
                name: 'Rulesregulations'
            });
        }
    }
}
</script>
