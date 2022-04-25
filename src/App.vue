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
hr {
  height: 5px;
        background-color: #38a169;
        border: none;
}
button {
  background-color: #38a169;
  border: 2px solid black;
  border-radius: 10px;
  color: white;
  padding: 2px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 2px 2px;
}

button:enabled {
  cursor: pointer;
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.1s;
}

button:disabled {
  background-color: lightgrey;
}

.button2 {
  background-color: red;
  border: 2px solid black;
  border-radius: 10px;
  color: white;
  padding: 2px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 2px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.1s;
}

button:hover:enabled {
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}
</style>

