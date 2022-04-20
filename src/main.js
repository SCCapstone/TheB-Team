import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@fortawesome/fontawesome-free/js/all'
import Embed from 'v-video-embed';

createApp(App).use(VueAxios,axios).use(router).mount('#app').use(Embed)
