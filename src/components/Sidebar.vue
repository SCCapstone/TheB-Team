<script>
import firebase from 'firebase';
import SidebarLink from './SidebarLink';
import { collapsed, toggleSidebar, sidebarWidth, sidebarWidth2 } from './state';

export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth, sidebarWidth2 }
  },
  data() {
    return {
      isLoggedIn: false
    }
  },
  watch: {
    $route () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      });
    }
  }
}
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1 style=font-size:45px>
      <span v-if="collapsed">
        <div align=center>G</div>
      </span>
      <span v-else><div align=center>Geofee</div></span>
    </h1>

    <SidebarLink v-if="!isLoggedIn" to="/TheB-Team/loginsignup" icon="fas fa-users">Log in/Sign up</SidebarLink>
    <SidebarLink v-if="isLoggedIn" to="/TheB-Team/loginsignup" icon="fas fa-users">Log out</SidebarLink>
    <SidebarLink v-if="isLoggedIn" to="/TheB-Team/gps" icon="fa-solid fa-location-arrow">GPS</SidebarLink>
    <SidebarLink v-if="isLoggedIn" to="/TheB-Team/calculator" icon="fa-solid fa-calculator">Calculator</SidebarLink>
    <SidebarLink v-if="isLoggedIn" to="/TheB-Team/rulesregulations" icon="fa-solid fa-truck">Rules/Regulations</SidebarLink>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fa-solid fa-angles-left" />
    </span>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
