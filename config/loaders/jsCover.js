const jsCover = (config) => {
  config.module
    .rule('js')
    .use('babel-loader')
    .loader('babel-loader')
    .tap((options) => {
      return {
        plugins: [
          '@babel/plugin-syntax-dynamic-import',
          [
            'istanbul',
            {
              extension: ['.js', '.jsx', '.vue'],
            },
          ],
        ],
      };
    });
};
module.exports = jsCover;
