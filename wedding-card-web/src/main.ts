import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/icons"; // icon

import request from '@/utils/request'

import '@/styles/index.scss'
import '@/icons'

import SvgIcon from "@/components/SvgIcon/index.vue";

const animated =require('animate.css')

if(!(window as any)._tcbEnv){
  (window as any)._tcbEnv={
    API_NAME:'v2',
    ADMIN: "ADMIN",
    GROOM: "新郎姓名",
    BRIDE: "新娘姓名",
    DATE: "2020-10-04 12:00:00",
    ADDR: "详细地址",
    PHONE: 12345678900
  }
}

const app=createApp(App)
app.component('svg-icon',SvgIcon)
app.use(store).use(router).use(animated).mount("#app");
