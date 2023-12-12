import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LandingPageView.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/MainView.vue')
    },
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
    },
    {
      path: '/definitions',
      name: 'definitions',
      component: () => import('../views/DefinitionsView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestsView.vue')
    }
  ]
})

export default router
