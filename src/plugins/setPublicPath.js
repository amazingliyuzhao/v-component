/** *
 *
 * @description 判断域名环境，更改离线资源源域名
 *  */

function getPublicPath() {
  const {
    location: { hostname, pathname },
  } = window;
  // eslint-disable-next-line no-useless-escape
  let path = pathname.replace(/([^\.\/\\]+)\.([a-z]+)$/i, "");
  if (path.indexOf("grey/") !== -1) {
    // 灰度发布域名处理
    path = path.replace("grey/", "");
  }

  return "/";
}

const publicPath = getPublicPath();

// eslint-disable-next-line no-undef
__webpack_public_path__ = publicPath;
