import './assets/styles/reset.css'
import './assets/styles/border.css'
import '@/assets/styles/iconfont.css'
import 'swiper/swiper-bundle.css'
import 'swiper/css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'

import { FastClick } from 'wy-fastclick'
import { Swiper, SwiperSlide } from 'swiper/vue'

export const isDebugEnable = isDebugEnabled()
export default isTrue

FastClick.attach(document.body)

const app = createApp(App)
app.component('Swiper', Swiper)
app.component('SwiperSlide', SwiperSlide)
app.use(router)
app.use(store)
app.mount('#app')

/**
 * This function is used to convert a string or boolean value to boolean.
 */
function isTrue(value) {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value.toLowerCase() === '1'
  }
  return Boolean(value).valueOf()
}

/**
 * This function is used to check if the debug mode is enabled.
 */
function isDebugEnabled() {
  return isTrue(import.meta.env.VITE_IS_DEBUG_ENABLE)
}
