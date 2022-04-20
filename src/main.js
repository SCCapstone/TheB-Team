import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@fortawesome/fontawesome-free/js/all'

createApp(App).use(VueAxios,axios).use(router).mount('#app')
