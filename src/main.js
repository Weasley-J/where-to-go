import './assets/styles/reset.css'
import './assets/styles/border.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { FastClick } from 'wy-fastclick'

FastClick.attach(document.body)

const app = createApp(App)

app.use(router)

app.mount('#app')
