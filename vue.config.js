const production = process.env.NODE_ENV === "production";
module.exports = {
  configureWebpack: (config) => {
    if (production)
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
  },
  productionSourceMap: false,
  chainWebpack(config) {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: './src/style/self.scss'  //相对路径
        })
        .end()
    })
  }
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