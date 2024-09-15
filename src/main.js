import './assets/styles/reset.css'
import './assets/styles/border.css'
import '@/assets/styles/iconfont.css'
import 'swiper/swiper-bundle.css'
import 'swiper/css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FastClick } from 'wy-fastclick'
import { Swiper, SwiperSlide } from 'swiper/vue'

FastClick.attach(document.body)

function isDebugEnabled() {
  return !!import.meta.env.VITE_IS_DEBUG_ENABLE
}

export const isDebugEnable = isDebugEnabled()

const app = createApp(App)
app.config.globalProperties.isDebugEnable = isDebugEnabled()

app.component('Swiper', Swiper)
app.component('SwiperSlide', SwiperSlide)

app.use(router)
app.mount('#app')
