import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

import "@/styles/index.scss";
import "@/icons";

axios
  .get("./config.json")
  .then((result) => {
    store.dispatch("setConfig", result.data);
    new Vue({
      el: "#app",
      store,
      router,
      render: (h) => h(App),
    });
  })
  .catch((error) => {
    console.log("get config error..." + error);
  });

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "我们结婚啦";
  next();
});
