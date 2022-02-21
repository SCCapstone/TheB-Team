import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Loginsignup from '../views/Loginsignup.vue'
import Trucklist from '../views/Trucklist.vue'
import Routelist from '../views/Routelist.vue'
import Truckdetails from '../views/Truckdetails.vue'
import Routedetails from '../views/Routedetails.vue'
import GPS from '../views/GPS.vue'
import Calculator from '../views/Calculator.vue'
import Rulesregulations from '../views/Rulesregulations.vue'

const routes = [
  {
    path: '#',
    name: 'Home',
    component: Home
  },
  {
    path: 'loginsignup',
    name: 'Loginsignup',
    component: Loginsignup
  },
  {
    path: 'trucklist',
    name: 'Trucklist',
    component: Trucklist
  },
  {
    path: 'routelist',
    name: 'Routelist',
    component: Routelist
  },
  {
    path: 'truckdetails',
    name: 'Truckdetails',
    component: Truckdetails
  },
  {
    path: 'routedetails',
    name: 'Routedetails',
    component: Routedetails
  },
  {
    path: 'gps',
    name: 'GPS',
    component: GPS
  },
  {
    path: 'calculator',
    name: 'Calculator',
    component: Calculator
  },
  {
    path: 'rulesregulations',
    name: 'Rulesregulations',
    component: Rulesregulations
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
