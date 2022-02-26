import { createRouter, createWebHistory } from 'vue-router'
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
    path: '/TheB-Team/',
    name: 'Home',
    component: Home
  },
  {
    path: '/TheB-Team/loginsignup',
    name: 'Loginsignup',
    component: Loginsignup
  },
  {
    path: '/TheB-Team/trucklist',
    name: 'Trucklist',
    component: Trucklist
  },
  {
    path: '/TheB-Team/routelist',
    name: 'Routelist',
    component: Routelist
  },
  {
    path: '/TheB-Team/truckdetails',
    name: 'Truckdetails',
    component: Truckdetails
  },
  {
    path: '/TheB-Team/routedetails',
    name: 'Routedetails',
    component: Routedetails
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
