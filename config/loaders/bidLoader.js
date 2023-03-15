/**
 *
 * @description 项目构建打包添加bid配置
 */
let bid = 0;
try {
  bid = require('../../.fes/fep/config.json').bid;
} catch (e) {
  console.log('未找到bid文件，请执行fep create bid命令');
}

const hashType = process.env.NODE_ENV === 'production' ? 'chunkhash' : 'hash';

module.exports = (config) => {
  config.module
    .rule('images')
    .test(/\.(jpg|png|gif)$/)
    .use('url-loader')
    .loader('url-loader')
    .options({
      // 使文件大小小于此limit值(单位为byte)的文件转换为base64格式
      limit: 4096,
      // 将图片打包到static/img文件夹下, 不配置则打包到static文件夹下
      outputPath: 'static/img',
      // 配置打包后图片文件名
      name: `[name].[hash:8].[ext]?_bid=${bid}`,
    })
    .end();

  config.output
    .filename(`static/js/[name].[${hashType}].js?_bid=${bid}`)
    .chunkFilename(`static/js/[name].[${hashType}].js?_bid=${bid}`)
    .end();

  if (['prod', 'production'].includes(process.env.NODE_ENV)) {
    config.plugin('extract-css').tap((options) => {
      options[0].filename = `static/css/[name].[contenthash].css?_bid=${bid}`;
      options[0].chunkFilename = `static/css/[name].[contenthash].css?_bid=${bid}`;
      return options;
    });
  }
};
