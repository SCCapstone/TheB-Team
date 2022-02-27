import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Loginsignup from '../views/Loginsignup.vue'
import GPS from '../views/GPS.vue'
import Calculator from '../views/Calculator.vue'
import Rulesregulations from '../views/Rulesregulations.vue'
import Condition from '../views/Condition.vue'

const routes = [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/TheB-Team/loginsignup',
    name: 'Loginsignup',
    component: Loginsignup
  },
  {
    path: '/TheB-Team/gps',
    name: 'GPS',
    component: GPS
  },
  {
    path: '/TheB-Team/calculator',
    name: 'Calculator',
    component: Calculator
  },
  {
    path: '/TheB-Team/rulesregulations',
    name: 'Rulesregulations',
    component: Rulesregulations
  },
  {
    path: '/TheB-Team/condition/:id',
    name: 'Condition',
    component: Condition
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
