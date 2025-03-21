import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createPinia } from 'pinia'
import { setupImask } from './plugins/imask';

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

setupImask(app);

app.mount('#app')
