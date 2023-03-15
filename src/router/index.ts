import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      keepAlive: true, // 不需要缓存
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
