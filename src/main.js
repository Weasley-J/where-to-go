import './assets/styles/reset.css'
import './assets/styles/border.css'
import '@/assets/styles/iconfont.css'
import 'swiper/swiper-bundle.css'
import 'swiper/css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuexStore from './stores/vuexStore.js'

import { FastClick } from 'wy-fastclick'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { createPinia } from 'pinia'

FastClick.attach(document.body)

const pinia = createPinia()
const app = createApp(App)

app.component('Swiper', Swiper)
app.component('SwiperSlide', SwiperSlide)

app.use(router)
app.use(vuexStore)
app.use(pinia)

app.mount('#app')
