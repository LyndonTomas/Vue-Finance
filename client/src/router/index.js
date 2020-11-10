import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Orders from '../views/OrderComponent'
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path:'/orders',
    name:'Orders',
    component:Orders
  },
  {
    path:'/',
    name:'login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
