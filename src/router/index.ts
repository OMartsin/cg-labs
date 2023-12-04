import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/fractals',
      name: 'fractals',
      component: () => import('../views/FractalsView.vue')
    },
    {
      path: '/colors',
      name: 'colors',
      component: () => import('../views/ColoursView.vue')
    },
    {
      path: '/geometry',
      name: 'geometry',
      component: () => import('../views/GeometryView.vue')
    }
  ]
})

export default router
