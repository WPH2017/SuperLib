import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Login from '@/views/login'
import Register from '@/views/register'
import Magzine from '@/views/magzine'
import Detail from '@/views/detail'
import Cart from '@/views/cart'
import Settle from '@/views/settle'
import Order from '@/views/order'
import Search from '@/views/search'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/index',
      redirect: { name: 'index' }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // {
    //   path: '/mlogin',
    //   name:'mlogin',
    //   component: Login
    // },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/list',
      // component: List
    },
    {
      path: '/detail',
      component: Detail
    },
    {
      path: '/magzine',
      component: Magzine
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/settle',
      component: Settle
    },
    {
      path: '/order',
      component: Order
    }
  ]
})
