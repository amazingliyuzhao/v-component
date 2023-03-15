/* eslint-disable */
const path = require('path');
const fs = require('fs');
// const { plugins } = require('./.think_config/plugins');
const mergeConfig = require('./config/index');

const publicPath = process.env.NODE_ENV === 'production' ? './' : '/';
const vueConfigPath = path.resolve(__dirname, 'vue.config.json');
const vueConfigCoverage = JSON.parse(fs.readFileSync(vueConfigPath));

// 不分站外还是站内  这个都是需要的
function getDevServerConfig() {
  const config = {
    compress: true,
    open: true,
  };
  //   const vueConfigPath = path.resolve(__dirname, 'vue.config.json');
  if (fs.existsSync(vueConfigPath)) {
    const vueConfig = JSON.parse(fs.readFileSync(vueConfigPath));
    const { proxy, apiPath } = vueConfig;
    if (proxy.enable) {
      if (typeof apiPath === 'string') {
        Object.assign(config, {
          proxy: {
            [apiPath]: {
              target: proxy.targetHost,
              changeOrigin: true,
            },
          },
        });
      } else {
        const proxyobj = {};
        for (let i = 0; i < apiPath.length; i += 1) {
          proxyobj[apiPath[i]] = {
            target: proxy.targetHost,
            changeOrigin: true,
          };
        }
        Object.assign(config, {
          proxy: proxyobj,
        });
      }
    } else {
      Object.assign(config, {
        before(app) {
          app.post(apiPath, (req, res) => {
            const mockPath = path.resolve(__dirname, './mock');
            const filePath = path.join(mockPath, `${req.path}.json`);
            if (!fs.existsSync(filePath)) {
              res.json({
                ec: 200,
                em: 'success',
                data: {},
              });
              return;
            }
            fs.readFile(filePath, 'utf8', (err, data) => {
              if (err) {
                console.log(`request error occured : ${req.path}`);
                throw err;
              }
              res.json(JSON.parse(data));
            });
          });
        },
      });
    }
  }
  return config;
}

let jsCodeCoverage = [];
const configCodeCoverage = +vueConfigCoverage.jsCodeCoverage; // 获取参数 - 是否进行二次打包
let jsCodeUrl =
  configCodeCoverage !== 2
    ? configCodeCoverage === 3
      ? 'build/prod/index.html'
      : 'build/index.html'
    : 'build/test/index.html';
const outputPathBuild =
  configCodeCoverage !== 2
    ? configCodeCoverage === 3
      ? 'build/prod'
      : 'build'
    : 'build/test'; // 判断
console.log('打包输出build路径：', outputPathBuild);
console.log('打包输出HTML路径：', jsCodeUrl);

// 合并
module.exports = mergeConfig({
  indexPath: path.resolve(__dirname, jsCodeUrl),
  publicPath,
  outputDir: outputPathBuild,
  assetsDir: 'static',
  crossorigin: 'anonymous',
  productionSourceMap: true,
  configureWebpack: {
    plugins: [],
    performance: {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      },
    },
    resolve: {
      modules: [
        'node_modules',
        'assets/images', // css在哪里能找到sprite图
      ],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@img': path.resolve(__dirname, 'src/assets/images'),
        '@c': path.resolve(__dirname, 'src/components'),
      },
      extensions: ['.js', '.vue', '.scss'],
    },
  },
  css: {
    modules: false,
    sourceMap: false,
    loaderOptions: {
      sass: {
        // 全局scss混入
        prependData: `
          @import "~@/styles/mixin.scss";
        `,
      },
    },
  },
  devServer: getDevServerConfig(),
  // swiper es兼容
  chainWebpack: (config) => {
    config.resolve.alias.set('swiper$', 'swiper/js/swiper.js');
    config.module
      .rule('sahder')
      .test(/\.(frag|vert|glsl)$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();
    // config.module
    //   .rule("svga")
    //   .test(/\.(svga)$/)
    //   .use("svga-loader")
    //   .loader("svga-loader")
    //   .end();
  },
});
