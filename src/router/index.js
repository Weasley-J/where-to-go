import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/HomeView.vue'

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
      component: () => import('../views/account/LoginView.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
