const { plugins } = require('./plugins');
const { chainWebpack } = require('./loaders');
function mergeConfig(defalt) {
    if (defalt.chainWebpack) {
      defalt = Object.assign({},{ chainWebpack }, defalt)
    } else {
      defalt.chainWebpack = chainWebpack;
    }

    if (!defalt.configureWebpack) {
        Object.assign(defalt, { configureWebpack: { plugins } })
    } else if (!defalt.configureWebpack.plugins) {
        defalt.configureWebpack.plugins = plugins
    } else {
        defalt.configureWebpack.plugins.push(...plugins);
    }
    return defalt

}
module.exports = mergeConfig
