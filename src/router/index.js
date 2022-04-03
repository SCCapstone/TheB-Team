import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Loginsignup from '../views/Loginsignup.vue'
import GPS from '../views/GPS.vue'
import Calculator from '../views/Calculator.vue'
import Rulesregulations from '../views/Rulesregulations.vue'
import Condition from '../views/Condition.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'

 const routes = [
  {
    path: '',
    name: 'Home',
    component: Home,
  },
  {
    path: '/TheB-Team/loginsignup',
    name: 'Loginsignup',
    component: Loginsignup,
  },
  {
    path: '/TheB-Team/gps',
    name: 'GPS',
    component: GPS,
    meta: {requiresAuth: true }
  },
  {
    path: '/TheB-Team/calculator',
    name: 'Calculator',
    component: Calculator,
    meta: {requiresAuth: true }
  },
  {
    path: '/TheB-Team/rulesregulations',
    name: 'Rulesregulations',
    component: Rulesregulations,
    meta: {requiresAuth: true }
  },
  {
    path: '/TheB-Team/condition/:id',
    name: 'Condition',
    component: Condition,
  },
  {
    path: '/TheB-Team/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/TheB-Team/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
