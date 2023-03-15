/** *
 *
 * @description 组件注册，方法，属性绑定
 */
import Vue from "vue";
import utils from "./utils/index";
import filters from "./filters/index";

const protos = { ...utils };

// 方法
Object.keys(protos).forEach((key) => {
  Vue.prototype[`$${key}`] = protos[key];
});

// filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
