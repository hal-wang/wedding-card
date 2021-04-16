import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
    meta: {
      title: '我们结婚啦'
    }
  },
  {
    path: '/d',
    name: 'Detail',
    component: () => import('@/views/Detail'),
    meta: {
      title: '喜帖详情'
    }
  },
  {
    path: '/album',
    name: 'Album',
    component: () => import('@/views/Album'),
    meta: {
      title: '相册'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin'),
    meta: {
      title: '管理'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
