<template>
  <div id="nav">
    <router-link to="">Home</router-link> |
    <router-link to="/loginsignup">Log in/Sign up</router-link> |
    <router-link to="/trucklist">Truck List</router-link> |
    <router-link to="/routelist">Route List</router-link> |
    <router-link to="/truckdetails">Truck Details</router-link> |
    <router-link to="/routedetails">Route Details</router-link> |
    <router-link to="/gps">GPS</router-link> |
    <router-link to="/calculator">Calculator</router-link> |
    <router-link to="/rulesregulations">Rules/Regulations</router-link>
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
