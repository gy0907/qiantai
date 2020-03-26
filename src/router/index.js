import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Home'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('../views/Home/HomeLeftCard')
      },
      {
        name: 'detail',
        path: '/detail/:id',
        component: () => import('../views/Home/Detail')
      },
      {
        path: '/message',
        component: () => import('../views/Home/Message')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
