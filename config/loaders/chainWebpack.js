const path = require('path');
const fs = require('fs');

const vueConfigPath = path.resolve(process.cwd(), 'vue.config.json');
const vueConfigCoverage = JSON.parse(fs.readFileSync(vueConfigPath));
const configCodeCoverage = +vueConfigCoverage.jsCodeCoverage; // 获取参数 - 是否接入代码覆盖率
let jsCover
if (configCodeCoverage === 2) {
    jsCover = require('./jsCover');
}

const htmlPlugin = require('./htmlPlugin');
const bidLoader = require('./bidLoader');

const chainWebpack = config => {
    if (configCodeCoverage === 2) {
        jsCover(config);
    }
    htmlPlugin(config);
    bidLoader(config);
}
module.exports = chainWebpack;
