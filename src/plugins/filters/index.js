/** *
 *
 * @description 全局过滤器
 */
import base64 from 'hi-base64';

export default {
  base64Decode(val) {
    let name;
    try {
      name = base64.decode(val);
    } catch (e) {
      name = val;
    }
    return name;
  },
  numberFormat(val) {
    if (!val) return 0;
    if (val < 10000) {
      return val;
    }
    return `${parseFloat((val / 10000).toFixed(2))}万`;
  },

  fireFormat(a) {
    if (!a) return 0;
    if (a < 100000) {
      return a;
    }
    const lastName = a >= 10000 * 10000 ? '亿' : '万';
    const calNum = a >= 10000 * 10000 ? 10000 * 10000 : 10000;
    const strArr = String(a / calNum).split('.');
    let res = a / calNum;
    if (strArr.length > 1) {
      res = `${strArr[0]}.${strArr[1].slice(0, 2)}`;
    } else {
      res = `${strArr[0]}.00`;
    }
    return `${res}${lastName}`;
  },
};
