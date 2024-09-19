import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { keepAlive: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue'),
      meta: { keepAlive: true }
    },
    {
      path: '/sayHi',
      name: 'SayHello',
      component: () => import('../components/SayHello.vue'),
      meta: { keepAlive: false }
    },
    {
      path: '/city',
      name: 'City',
      component: () => import('../views/City.vue'),
      meta: { keepAlive: true }
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../views/city.vue'),
      meta: { keepAlive: true }
    }
  ]
})

export default router
