<template>
  <div class="home">
    <hr>
    <h1>Welcome</h1>
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
      <section>
        <iframe width="560" height="315" 
        src="https://www.youtube.com/embed/1ORnEuLVHWE" title="YouTube video player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
      </section>
      <h3>Why use Geofee:</h3>
      <p>
        * To see and get the directions of your trucking route<br>
        * To calculate the costs of travel based on state and dimensions of your truck<br>
        * To see the rules and regulations that certain U.S. states have<br>
      </p>
      <h3>How to use Geofee:</h3>
      <p>
        * Use the side bar to the left to navigate through the features<br>
        <img src="/TheB-Team/images/PointToLeft.png" height="400px"><br><br>
        * Log in to see avaible features (GPS, Calculator, and Rules/Regulations List)<br>
        <img src="/TheB-Team/images/LoginSignup.png" height="300px"><br><br>
        * Input your start and stop locations into the GPS to get your route<br>
        <img src="/TheB-Team/images/gps.png" height="300px"><br><br>
        * Input your start and stop locations as well as the dimensions of your truck to get the total cost of fees for your route<br>
        <img src="/TheB-Team/images/calculator.png" height="300px"><br><br>
        * View rules and regulations nation wide with the Rules/Regulations List (Administrative accounts are able to edit the list)<br>
        <img src="/TheB-Team/images/RulesReg.png" height="300px"><br>
      </p>
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