import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from '/@/router';
import { setupStore } from '/@/store';
import '/@/utils/tcbEnv';

import '/@/design/index.less';
import 'virtual:windi.css';
import 'virtual:svg-icons-register';
import 'animate.css';

const app = createApp(App);
setupStore(app);
setupRouter(app);
app.mount('#app');
