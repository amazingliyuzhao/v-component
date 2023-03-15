const htmlPlugin = (config) => {
 config.plugin('html').tap(args => {
  const [options] = args;
  args[0] = Object.assign({}, options, {
   minify: {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: {
     compress: true,
     warnings: false,
     ie8: false,
     output: {
      comments: false,
      beautify: false,
     },
     beautify: {
      beautify: false,
     }
    },
   }
  });
  return args;
 });
}

module.exports = htmlPlugin; 