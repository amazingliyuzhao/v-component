import "./plugins/setPublicPath";

// import "babel-polyfill";
// import Es6Promise from "es6-promise";
import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
import store from "@/store";

import App from "./App.vue";
import router from "./router";
import "./app.scss";
import "swiper/css/swiper.css";

// require("es6-promise").polyfill();
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

// Es6Promise.polyfill();

Vue.config.productionTip = false;

Vue.prototype.$EventBus = new Vue();

try {
  // @ts-ignore
  window.LMP.errorUpConfig = {
    business: "2023-v-day",
    type: "gift",
  };
} catch (error) {
  console.log(error);
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
