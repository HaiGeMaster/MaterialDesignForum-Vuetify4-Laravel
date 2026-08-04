
import { registerPlugins } from '@/plugins'
import axios from 'axios';
import App from './App.vue'

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
// import router from '@/router'
// import i18n from '@/plugins/i18n' 
// import pinia from '@/plugins/pinia'
// import vuetify from '@/plugins/vuetify'

import { createApp } from 'vue'
const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$Fancybox = Fancybox;
registerPlugins(app)
// app.use(router)
// app.use(i18n)
// app.use(pinia)
// app.use(vuetify)
app.mount('#app')
