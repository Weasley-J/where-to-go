import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue')
    },
    {
      path: '/sayHi',
      name: 'SayHello',
      component: () => import('../components/SayHello.vue')
    },
    {
      path: '/city',
      name: 'City',
      component: () => import('../views/City.vue')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../views/city.vue')
    }
  ]
})

export default router
