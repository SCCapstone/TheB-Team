<template>
  <div class="rulesregulations">
    <h1>Rules and Regulations:</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>State: </label>  
        <input
          v-model="form.states"
          class="form-control"
          required
        />
      </div>

      <div class="form-group">
        <label>Name: </label>
        <input
          v-model="form.name"
          class="form-control"
          required
        />
      </div>

      <div class="form-group">
        <label>Type: </label>
        <input
          v-model="form.type"
          class="form-control"
          required
        />
      </div>
        
      <button type="submit">
        Create Variable
      </button>
    </form>
  </div>
</template>

<script>
import { createVariable, getVariables } from '@/firebase';
import { sortVariables } from '@/utils';
import { reactive } from 'vue';
export default {
  name: 'Rulesregulations',
  props: {
    msg: String
  },
  setup () {
    const form = reactive({
      name: '',
      states: '',
      type: ''
    });

    const onSubmit = async () => {
      const items = getVariables();
      const sorted = sortVariables(items);
      console.log(sorted);
      createVariable({ ...form });
      form.name = '';
      form.states = '';
      form.type = '';
    }

    return { form, onSubmit };
  }
}
</script>