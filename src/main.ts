import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createPinia } from 'pinia'
import VueTheMask from 'vue-the-mask'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(VueTheMask)

app.mount('#app')
