
import { registerPlugins } from '@/plugins'
import axios from 'axios';
import App from './App.vue'
import { createApp } from 'vue'
const app = createApp(App)
registerPlugins(app)
app.config.globalProperties.$axios = axios;
app.mount('#app')
