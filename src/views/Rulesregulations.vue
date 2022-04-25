<template>
  <div class="rulesregulations">
    <hr>
    <h1>Rules and Regulations:</h1>
    <h3>These rules are used by the calculator to estimate how much a permit for a given route and vehicle should be</h3>
    <hr>
    <div class="item" v-for="(item, index) of conditionsList" :key="index">
      <div class="item-label">
        <label>{{ index + 1 }}: In {{ item.state }} if {{ item.variable }} {{ item.condition }} {{ item.value }}, then {{ item.operation }}</label>
      </div>
      <div class="item-buttons">
        <button class="button1" v-if="isAdmin" @click="editCondition(item.id)">Edit</button>
        <button class="button2" v-if="isAdmin" @click="deleteCondition(item.id)">Delete</button>
      </div>
    </div>
    <button v-if="isAdmin" class="fab-add-condition" @click="goToAddCondition">+</button>
  </div>
</template>

<script>
import { getConditions, deleteCondition, getAdmins } from '@/firebase';
import router from '@/router';
import firebase from 'firebase'
import { conditions } from '@/utils';

export default {
  name: 'RulesRegulations',
  props: {
    msg: String
  },
  data () {
    return {
      conditionsList: [],
      admins: [],
      isAdmin: false
    }
  },
  async created () {
    this.conditionsList = await getConditions();
    this.admins = await getAdmins();
    this.checkAdmin();
    this.translateConditions();
  },
  methods: {
    checkAdmin() {
      var user = firebase.auth().currentUser;
      var email = user.email;
      this.isAdmin = this.admins.find(admin => {
        if (admin.username === email){
          return true;
        }
      });
    },
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
      this.conditionsList = this.conditionsList.filter((condition) => {
        return condition.id !== id;
      });
    },
    translateConditions() {
      for (let i = 0; i < this.conditionsList.length; i++) {
        this.conditionsList[i].condition = conditions.find(condition => condition.key === this.conditionsList[i].condition).text;
        if (this.conditionsList[i].operation === 'addPerMile') {
          this.conditionsList[i].operation = `add $${this.conditionsList[i].operand} per mile`;
        } else if (this.conditionsList[i].operation === 'addFlat') {
          this.conditionsList[i].operation = `add a flat rate of $${this.conditionsList[i].operand}`;
        } else if (this.conditionsList[i].operation === 'addPer4LaneMile') {
          this.conditionsList[i].operation = `add $${this.conditionsList[i].operand} per mile on 4-lane roads`;
        }
      }
    }
  }
}
</script>

<style scoped>
  .fab-add-condition {
    background-color: #2f855a;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background: #2f855a;
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
  .item {
    height: 30px;
    position: relative;
    border-bottom: 2px dotted lightgray;
  }
  .item-label {
    float: left;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50%;
  }
  .item-buttons {
    float: right;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5%;
    width: 40%;
  }
  .button1 {
    float: left;
    width: 45%;
  }
  .button2 {
    float: right;
    width: 45%;
  }
</style>