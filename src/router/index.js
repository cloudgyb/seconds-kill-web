import Vue from 'vue'
import VueRouter from 'vue-router'
import GoodsList from '@/views/GoodsList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'GoodsList',
    component: GoodsList
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
