/**
 * @description 打包完成后清除html内的bid后缀
 */

class RemoveHtmlBid {
  apply(compiler) {
    compiler.hooks.emit.tap('RemoveHtmlBid', (compilation) => {
      let source = compilation.assets['index.html'].source();
      source = source.replace(/\?_bid=\d+/gi, '');
      // source = source.replace(/<link(?:.*?)href=[\"\'](.+?)[\"\'](?!<)(?:.*)\>(?:[\n\r\s]*?)(?:>)*/g, "")

      compilation.assets['index.html'] = {
        source: () => source,
        size: () => source.length,
      };
    });
  }
}

module.exports = new RemoveHtmlBid();
