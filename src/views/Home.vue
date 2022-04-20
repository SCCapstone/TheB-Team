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
      <p>
        <br>PoC Demo video as placeholder<br>
        <i class="fa-solid fa-angles-down" />
      </p>
      <iframe width="560" height="315" 
      src="https://www.youtube.com/embed/zR0bBWwRF4I" title="YouTube video player" frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen></iframe>
      <h3>Why use Geofee:</h3>
      <p>
        idk lol<br>
      </p>
      <h3>How to use Geofee:</h3>
      <p>
        * Use the side bar to the left to navigate through the features<br>
        <img src="../assets/PointToLeft.png" height="400px" /><br><br>
        * Log in to see avaible features (GPS, Calculator, and Rules/Regulations List<br>
        <img src="../assets/LoginSignup.png" height="300px" /><br><br>
        * Input your start and stop locations into the GPS to get your route<br>
        <img src="../assets/gps.png" height="300px" /><br><br>
        * Input your start and stop locations as well as the length and width of your truck to get the total cost of fees for your route<br>
        <img src="../assets/calculator.png" height="300px" /><br><br>
        * View rules and regulations nation wide with the Rules/Regulations List (Administrative accounts are able to edit the list)<br>
        <img src="../assets/RulesReg.png" height="300px" /><br>
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