/* eslint-disable */
/**
 * @param {String} url ,
 * @param {object} data ,
 * @param {object} options ,
 * @param {string} options.method,
 * @param {string} options.dataType  ,
 * @returns {promise}
 */

//@ts-ignore
interface ResObj<T> {
  static_host: string;
  ec: number;
  em: string;
  data: T;
}

function request<T>(
  url: string,
  data: any,
  options?: Record<string, any>
): Promise<T> {
  // console.log(url, data, options);
  return new Promise((resolve, reject) => {});
}

export default request;
