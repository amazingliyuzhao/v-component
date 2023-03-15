import base64 from 'hi-base64';
import { FIRST_PAY_KEY } from '@/constant';
// 从链接获取参数（路由后的参数获取不到）
export function getUrlParams(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i"); // 定义正则表达式
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// 数字处理
export function numberHandle(num) {
    let score = num;
    if (num > 99999) {
        score = `${parseFloat((num / 10000).toFixed(1))}万`;
    }
    return score;
}

// 指定某个任务在主线程最早可得的空闲时间执行，也就是尽可能早得执行；
export function idleRun(func, context = null) {
    const cb = func.bind(context);
    if (window.requestIdleCallBack) {
        window.requestIdleCallBack(cb);
    } else {
        setTimeout(cb, 0);
    }
}

// 设置LocalStorage
export function setLocalStorage(key, val) {
    const curTime = new Date().getTime();
    localStorage.setItem(key, JSON.stringify({ data: val, time: curTime }));
}

// 获取LocalStorage
export function getLocalStorage(key) {
    const cacheData = localStorage.getItem(key);
    if (cacheData) {
        return JSON.parse(cacheData);
    }
    return null;
}

// 获取Cookie
export function getCookie(name) {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    const arr = document.cookie.match(reg);
    if (arr) {
        return unescape(arr[2]);
    }
    return null;
}

// 防抖
export function debounce() {
    let timer;
    return (fn, timeout = 10) => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            fn();
        }, timeout);
    };
}

// 节流
export function throttle() {
    let prevTime;
    return (fn, gapTime) => {
        const currentTime = Date.now();
        if (!prevTime || Date.now() - prevTime > gapTime) {
            fn();
            prevTime = currentTime;
        }
    };
}

// 判断是否为对象
/**
 * @param {any} obj,
 */
export function isObject(obj) {
    if (typeof obj === 'object') {
        if (!obj) {
            return false;
        }
        if (Object.prototype.toString.call(obj).slice(8, -1) === 'Object') {
            return true;
        }
        return false;
    }
    return false;
}

// 休眠
export async function sleep(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

// 开发环境检测
export function envCheck() {
    const { location: {
        hostname
    } } = window;
    const reg = new RegExp('test-');
    let envText = reg.test(hostname) ? 'test-' : '';
    return envText;
}

// 消费提示缓存
export function isFirstSendGift() {
    return !getLocalStorage(FIRST_PAY_KEY)?.data;
}
export function setFirstSendGift() {
    setLocalStorage(FIRST_PAY_KEY, 1);
}

// 头像error
export function imgError(e) {
    e.target.src = '';
}
// name decode
export function base64Decode(val) {
    let name;
    try {
        name = base64.decode(val);
    } catch (e) {
        name = val;
    }
    return name;
}

export function timeFormatter(v, format) {
    const second = v % 60;
    let secondStr;
    if (second < 10) {
        secondStr = `0${second}`;
    } else {
        secondStr = second;
    }

    const minute = Math.floor(v / 60) % 60;
    let minuteStr;
    if (minute < 10) {
        minuteStr = `0${minute}`;
    } else {
        minuteStr = minute;
    }


    if (format && format.startsWith("hh")) {
        const hour = Math.floor(v / 3600) % 24;
        let hourStr;
        if (hour < 10) {
            hourStr = `0${hour}`;
        } else {
            hourStr = hour;
        }
        return `${hourStr}:${minuteStr}:${secondStr}`;
    }
    else {
        return `${minuteStr}:${secondStr}`;
    }
}
