import { RouteRecordRaw } from 'vue-router';

const home: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('/@/views/home/index.vue'),
    meta: {
      title: '我们结婚啦',
    },
  },
];

export default home;
