import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/fractals',
      name: 'fractals',
      component: () => import('../views/FractalsView.vue')
    }
  ]
})

export default router
