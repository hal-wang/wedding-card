import { RouteRecordRaw } from 'vue-router';

const detail: RouteRecordRaw[] = [
  {
    path: '/d',
    name: 'Detail',
    component: () => import('/@/views/detail/index.vue'),
    meta: {
      title: '喜帖详情',
    },
  },
];

export default detail;
