import Vue from 'vue'
import VueRouter from 'vue-router'
import GoodsList from '@/views/GoodsList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Main'),
    children: [
      {
        path: '/',
        name: 'GoodsList',
        component: GoodsList
      },
      {
        path: '/goods/detail/:goodsId',
        name: 'GoodsDetail',
        component: () => import('../views/GoodsDetail.vue')
      },
      {
        path: '/order/detail',
        name: 'OrderDetail',
        component: () => import('../views/OrderDetail.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
