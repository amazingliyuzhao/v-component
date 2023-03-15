/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-shadow */
import { EventEmitter } from "fbemitter";
import { createDecorator } from "vue-class-component";
import throttleFn from "./throttle";

export enum GodType {
  FS1 = "windgod1",
  FS2 = "windgod2",
  HS1 = "firegod1",
  HS2 = "firegod2",
}

export enum EventNames {
  DEBRIPOP_POP = "debrisPop",
  RECOMMEND_POP = "recommendPop",
  RECOMMEND_POP_CLOSE = "recommendPopClose",
  SURE_ACCEPT_POP = "surAcceptPop",
  REFRESH_RANK = "refreshRank",
  LOCAL_RECOMMEND = "localRecommend",
  LOCAL_RECOMMEND_CLOSE = "localRecommendClose",
  OPEN_PANEL = "openPanel",
  BUY_DEBRIS = "buyDebris",
  BUY_DEBRIS_SUCCESS = "buyDebrisSuccess",
}
export const eventHub = new EventEmitter();

export const CONFIRMKEY = "werther-god-buy";

/**
 * 控制事件回调函数响应频率，在设置的时间区间内，响应一次
 *
 * @param handler
 * @param time - 单位ms
 * @param context
 * @param args
 * @returns 控制后的函数
 */
export function throttle(
  handler: (...args: any[]) => any,
  time: number = 64,
  context?: any,
  ...args: any[]
): (...args: any[]) => any {
  let timer: number | null = null;

  return () => {
    if (timer !== null) {
      return;
    }
    timer = window.setTimeout(() => {
      timer = null;
      handler.apply(context, args);
    }, time);
  };
}

// 注解模式throttle

// eslint-disable-next-line import/prefer-default-export
export function Throttle(duration: number) {
  return createDecorator((componentOptions, handler) => {
    if (!componentOptions.methods) {
      return;
    }
    const handlerfn = componentOptions.methods[handler];
    if (typeof handlerfn !== "function") {
      // eslint-disable-next-line consistent-return
      return console.warn(`${handler} is not fn`);
    }
    componentOptions.methods[handler] = throttleFn(handlerfn, duration);
  });
}

export const skillDayHandel = (time: number) => {
  const day = time / 60 / 60 / 24;
  return day > 999 ? "999+" : Math.floor(day);
};

export function timeHandel(time: number) {
  if (!time || time <= 0) {
    return "0小时";
  }
  const mTime = time / 60;
  if (mTime < 60) {
    return `0小时`;
  }
  if (mTime / 60 < 24) {
    return `${Math.floor(mTime / 60)}小时`;
  }
  const dayTime = mTime / 60 / 24;
  if (dayTime >= 1 && dayTime <= 999) {
    return `${Math.floor(mTime / 60 / 24)}天`;
  }
  return `999+天`;
}

export function lockTimeHandel(time: number) {
  const m = parseInt(String(time / 60), 10);
  if (m <= 0) {
    return "";
  }

  return `${m}分钟`;
}

// 设置LocalStorage
export function setLocalStorage(key: string, val: any) {
  const curTime = new Date().getTime();
  localStorage.setItem(
    key,
    JSON.stringify({
      data: val,
      time: curTime,
    })
  );
}

// 获取LocalStorage
export function getLocalStorage(key: string) {
  const cacheData = localStorage.getItem(key);
  if (cacheData) {
    return JSON.parse(cacheData);
  }
  return null;
}

export function isFirstSendGift() {
  return getLocalStorage(CONFIRMKEY) ? !getLocalStorage(CONFIRMKEY).data : true;
}

export function setFirstSendGift() {
  setLocalStorage(CONFIRMKEY, true);
}

export function fireNumHandel(fire: number) {
  return fire >= 10 * 10000;
}

export async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
