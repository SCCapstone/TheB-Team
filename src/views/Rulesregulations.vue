<template>
  <div class="rulesregulations">
    <hr>
    <h1>Rules and Regulations:</h1>
    <hr>
    <div v-for="(item, index) of conditions" :key="index">
      <label>{{ index + 1 }}: {{ item.state }} {{ item.variable }} {{ item.condition }} {{ item.value }}</label>
      <button @click="editCondition(item.id)">Edit</button>
      <button class="button2" @click="deleteCondition(item.id)">Delete</button>
    </div>
    <button class="fab-add-condition" @click="goToAddCondition">+</button>
  </div>
</template>

<script>
import { getConditions, deleteCondition } from '@/firebase';
import router from '@/router';
//import firebase from 'firebase'

export default {
  name: 'RulesRegulations',
  props: {
    msg: String
  },
  data () {
    return {
      conditions: [],
      /*user: {
        email: ''
      }*/
    }
  },
  
  /*beforeCreate(){
    var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            self.user = user;
        });

        this.users = [];
        firebase
            .firestore()
            .collection("roles")
            .get()
            .then(snap => {
                snap.forEach(doc => {
                    var user = doc.data();
                    user.id = doc.id;
                    console.log(doc.data());
                    if (!user.role.admin) this.users.push(user);
                });
            });
    /*firebase.auth().getUserByEmail('admin@admin.com')
      .then((user) => {
     //Confirm user is verified.
    if (user.emailVerified) {
      // Add custom claims for additional privileges.
      // This will be picked up by the user on token refresh or next sign in on new device.
      return getAuth().setCustomUserClaims(user.uid, {
        admin: true,
      });
      return this.user.email;
    }
  })
  .catch((error) => {
    console.log(error);
  });*/
  //},
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
</style>