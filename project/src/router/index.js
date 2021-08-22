import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recipe_write',
    name: 'Recipe_Write',
    component: () => import('../views/Recipe_Write.vue')
  },
  {
    path: '/recipe_info',
    name: 'Recipe_Info',
    component: () => import('../views/Recipe_Info.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
