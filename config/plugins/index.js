const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const spriteplugin = require('./sprites');
const removeHtmlBidPlugin = require('./removeHtmlBid');
const removeSourceMap = require('./removeSourceMap');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const plugins = [removeHtmlBidPlugin];
plugins.push();
plugins.push(removeSourceMap);

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.SourceMapDevToolPlugin({
      filename: '../sourcemaps/[file].map', // 修改生成 sourcemap 文件的路径
      append: false, // 不在文件末尾添加 sourcemapUrl
      columns: true,
      module: true,
    })
  );
}

// 是否启用插件取配置
const vueConfigPath = path.resolve(__dirname, '../../vue.config.json');
if (fs.existsSync(vueConfigPath)) {
  const vueConfig = JSON.parse(fs.readFileSync(vueConfigPath));
  if (
    process.env.NODE_ENV === 'production' &&
    vueConfig.BundleAnalyzer.enable
  ) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: path.resolve(__dirname, 'report.html'),
      })
    );
  }
  if (!(process.env.NODE_ENV === 'production')) {
    if (vueConfig.sprite.enable) {
      plugins.push(...spriteplugin);
    }
  }
} else {
  // 默认启用插件
  plugins.push(...spriteplugin);
}
module.exports = {
  plugins,
};
