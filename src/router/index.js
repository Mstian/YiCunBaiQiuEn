import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'baiqiuen',
    component: () => import('../views/baiqiuen.vue')
  },
  {
    path:'/page',
    component:()=> import('../components/page')
  }
]

const router = new VueRouter({
  routes
})

export default router
