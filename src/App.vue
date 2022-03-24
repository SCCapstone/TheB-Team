<!-- <template>
  <div id="nav" align="center">
    <router-link to="/TheB-Team/loginsignup">Log in/Sign up</router-link> |
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
    
    


</script> -->
<script>
import Sidebar from '@/components/Sidebar'
import { sidebarWidth2 } from '@/components/state'
export default {
  components: { Sidebar },
  setup() {
    return { sidebarWidth2 }
  }
}
</script>
<template>
  <Sidebar />
  <div :style="{ 'margin-left': sidebarWidth2 }">
    <router-view />
    <HereMap  :center="center" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: left : sidebarWidth;*/
  color: #000000;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

