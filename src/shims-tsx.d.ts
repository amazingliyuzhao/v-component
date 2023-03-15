import type { VNode } from 'vue';
import type Vue from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode;
    // tslint:disable no-empty-interface
    type ElementClass = Vue;
    type IntrinsicElements = Record<string, any>;
  }
}

declare module 'vue/types/vue' {
  // 来声明全局属性
  // eslint-disable-next-line no-shadow
  // interface Vue {
  //   $globalData: any;
  //   $toast: any;
  //   $confirm: any;
  //   $showGiftPanel: any;
  //   $sendGift: any;
  //   $gotoProfile: any;
  //   $EventBus: any;
  //   $testCom: any;
  //   $purchase: any;
  // }
}
