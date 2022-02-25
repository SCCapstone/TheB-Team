<template>
  <div id="nav">
    <router-link to="/TheB-Team/">Home</router-link> |
    <router-link to="/TheB-Team/loginsignup">Log in/Sign up</router-link> |
    <router-link to="/TheB-Team/trucklist">Truck List</router-link> |
    <router-link to="/TheB-Team/routelist">Route List</router-link> |
    <router-link to="/TheB-Team/truckdetails">Truck Details</router-link> |
    <router-link to="/TheB-Team/routedetails">Route Details</router-link> |
    <router-link to="/TheB-Team/gps">GPS</router-link> |
    <router-link to="/TheB-Team/calculator">Calculator</router-link> |
    <router-link to="/TheB-Team/rulesregulations">Rules/Regulations</router-link>
    <HereMap  :center="center" />
  </div>
  <router-view/>
  
  
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #000000;
}

#nav {
  padding: 0px;
}

#nav a {
  font-weight: bold;
  color: #105B3D;
}

#nav a.router-link-exact-active {
  color: #499375;
}
</style>

<script>

export default {
  name: 'app'
  
    }
    
    


</script>
