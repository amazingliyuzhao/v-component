const path = require('path');
const fs = require('fs');
const SpritesmithPlugin = require('webpack-spritesmith');
// https://www.npmjs.com/package/imagemin-webpack-plugin 精灵图插件使用方法
const spritesmithTasks = []; //雪碧图的列表
const spritesPath = path.resolve(__dirname, '../../src/assets/sprites'); //雪碧图文件夹路径

var templateFunction = function (data) {
  // 生成sprites.scss文件时的格式
  var perSprite = data.sprites
    .map(function (sprite) {
      return `@mixin sprites-${sprite.name} {
      background-image: url(${data.sprites[0].image});
      background-size: ${data.spritesheet.width}px ${data.spritesheet.height}px;
      width: ${sprite.width}px;
      height: ${sprite.height}px; 
      background-position: ${sprite.offset_x}px ${sprite.offset_y}px;
    }`;
    })
    .join('\n');
  return perSprite;
};

fs.readdirSync(spritesPath).map((dirname) => {
  if (
    fs
      .statSync(path.resolve(__dirname, `../../src/assets/sprites/${dirname}`))
      .isDirectory()
  ) {
    spritesmithTasks.push(
      new SpritesmithPlugin({
        src: {
          //需要生成雪碧图的文件夹
          cwd: path.resolve(__dirname, `../../src/assets/sprites/${dirname}`),
          glob: '*.png',
        },
        target: {
          //生成的图片、CSS路径
          image: path.resolve(
            __dirname,
            `../../src/assets/images/${dirname}.sprites.png`
          ),
          css: [
            [
              path.resolve(__dirname, `../../src/styles/${dirname}.scss`),
              {
                format: 'function_based_template',
              },
            ],
          ],
        },
        // 自定义css处理模板
        customTemplates: {
          function_based_template: templateFunction,
        },
        apiOptions: {
          cssImageRef: `~${dirname}.sprites.png`, // 样式文件中调用雪碧图地址写法
        },
        spritesmithOptions: {
          algorithm: 'top-down', // 从上到下生成方向.
          padding: 2, // 每个小图标之间的间隙  px
        },
      })
    );
  }
});
module.exports = spritesmithTasks;
