<template>
  <div class="home">
    <hr>
    <h1>Home</h1>
    <hr>
    <div align="center">
    <div v-if="isLoggedIn"> 
      <p>Welcome: {{user.email}}</p> 
    </div>
    <h3>Features:</h3>
    <p>
      GPS -- see your routes <br>
      Calculator -- calculate the costs/fee totals for your routes<br>
      Rules/Regulations List -- see what laws/guidlines are required for each of your trucks<br>
    </p>
    <h4>***** You must log in to see these features *****</h4>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  data() {
    return {
      user: null,
      isLoggedIn: false
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.isLoggedIn = true;
      } else {
        this.user = null;
        this.isLoggedIn = false;
      }
    });
  },
  name: 'HomeView',
  props: {
    msg: String
  }
}
</script>