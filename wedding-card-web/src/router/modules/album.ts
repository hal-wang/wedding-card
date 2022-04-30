import { RouteRecordRaw } from 'vue-router';

const album: RouteRecordRaw[] = [
  {
    path: '/album',
    name: 'Album',
    component: () => import('/@/views/album/index.vue'),
    meta: {
      title: '相册',
    },
  },
];

export default album;
