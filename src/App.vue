<template>
  <div id="nav" align="center">
    <router-link to="/loginsignup">Log in/Sign up</router-link> |
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

.seperator h5 {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1em;
}

.seperator h5::before,
.seperator h5::after {
  content: "";
  display: block;
  flex-grow: 1;
  height: 1px;
  background: #ccc;
}

.seperator h5 span {
  padding: 0 2em;
}