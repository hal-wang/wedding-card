import { RouteRecordRaw } from 'vue-router';

const admin: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('/@/views/admin/index.vue'),
    meta: {
      title: '管理',
    },
  },
];

export default admin;
