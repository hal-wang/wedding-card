import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '我们结婚啦'
    }
  },
  {
    path: '/d',
    name: 'Detail',
    component: () => import('@/views/Detail.vue'),
    meta: {
      title: '喜帖详情'
    }
  },
  {
    path: '/album',
    name: 'Album',
    component: () => import('@/views/Album.vue'),
    meta: {
      title: '相册'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    meta: {
      title: '管理'
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
