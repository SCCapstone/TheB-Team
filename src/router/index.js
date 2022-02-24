import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Loginsignup from '../views/Loginsignup.vue'
import GPS from '../views/GPS.vue'
import Calculator from '../views/Calculator.vue'
import Rulesregulations from '../views/Rulesregulations.vue'

const routes = [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/loginsignup',
    name: 'Loginsignup',
    component: Loginsignup
  },
  {
    path: '/gps',
    name: 'GPS',
    component: GPS
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: Calculator
  },
  {
    path: '/rulesregulations',
    name: 'Rulesregulations',
    component: Rulesregulations
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
