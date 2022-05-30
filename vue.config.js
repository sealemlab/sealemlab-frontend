const production = process.env.NODE_ENV === "production";
module.exports = {
  configureWebpack: (config) => {
    // if (production){
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      // chunk.js被分别打成小体积的依赖包
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        }
      }
    // }
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