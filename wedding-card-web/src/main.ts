import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/utils/tcbEnv";

import "@/icons";
import SvgIcon from "@/components/SvgIcon/index.vue";

import "@/styles/index.scss";
const animated = require("animate.css");

const app = createApp(App);
app.component("svg-icon", SvgIcon);
app.use(store).use(router).use(animated).mount("#app");
