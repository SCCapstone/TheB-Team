<template>
  <div class="rulesregulations">
    <hr>
    <h1>Rules and Regulations:</h1>
    <hr>
    <div v-for="(item, index) of conditions" :key="index">
      <label>{{ index + 1 }}: {{ item.state }} {{ item.variable }} {{ item.condition }} {{ item.value }}</label>
      <button @click="editCondition(item.id)">Edit</button>
      <button @click="deleteCondition(item.id)">Delete</button>
    </div>
    <button class="fab-add-condition" @click="goToAddCondition">+</button>
  </div>
</template>

<script>
import { getConditions, deleteCondition } from '@/firebase';
import router from '@/router';
export default {
  name: 'RulesRegulations',
  props: {
    msg: String
  },
  data () {
    return {
      conditions: []
    }
  },
  async created () {
    this.conditions = await getConditions();
  },
  methods: {
    goToAddCondition () {
      router.push({
        name: 'Condition',
        params: {
          id: 'new'
        }
      });
    },
    editCondition (id) {
      router.push({
        name: 'Condition',
        params: {
          id
        }
      });
    },
    deleteCondition (id) {
      deleteCondition(id);
      this.conditions = this.conditions.filter((condition) => {
        return condition.id !== id;
      });
    }
  }
}
</script>

<style scoped>
  .fab-add-condition {
  background-color: #F44336;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background: #F44336;
  border: none;
  outline: none;
  color: #FFF;
  font-size: 36px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: .3s;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>