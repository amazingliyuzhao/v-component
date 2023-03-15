/**
 * @description 打包开始前删除sourcemaps 文件夹
 */
const path = require("path");
const fs = require("fs");
function removeDir(dir) {
  let files = fs.readdirSync(dir);
  for (var i = 0; i < files.length; i++) {
    let newPath = path.join(dir, files[i]);
    let stat = fs.statSync(newPath);
    if (stat.isDirectory()) {
      //如果是文件夹就递归下去
      removeDir(newPath);
    } else {
      //删除文件
      fs.unlinkSync(newPath);
    }
  }
  fs.rmdirSync(dir); //如果文件夹是空的，就将自己删除掉
}

class sourceMaps {
  apply(compiler) {
    compiler.hooks.beforeRun.tap("RemoveSourcemaps", (compilation) => {
      const sourcePath = path.resolve(process.cwd(), "sourcemaps");
      if (fs.existsSync(sourcePath)) {
        removeDir(sourcePath);
      }
    });
  }
}

module.exports = new sourceMaps();
