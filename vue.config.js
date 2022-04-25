module.exports = {
  configureWebpack: (config) => {
    if (production)
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
  },
  productionSourceMap: false,
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://124.221.101.198:6645',
  //       pathRewrite: {
  //         '^/api': ''
  //       },
  //       ws: true,
  //       changeOrigin: true
  //     }
  //   }
  // }
}