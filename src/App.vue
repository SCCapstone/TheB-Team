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
</style>

