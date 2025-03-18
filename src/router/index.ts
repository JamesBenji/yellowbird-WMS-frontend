import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DashboardView.vue')
  },
  {
    path: '/dashboard/stock-in',
    name: 'stockIn',
    component: () => import('../views/sub-pages/StockInPage.vue')
  },
  {
    path: '/account',
    name: 'stockIn',
    component: () => import('../views/sub-pages/AccountPage.vue')
  },
  {
    path: '/notifications',
    name: 'stockIn',
    component: () => import('../views/sub-pages/NotificationPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
