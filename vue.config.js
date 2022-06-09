const isProd = process.env.NODE_ENV == "production";
const timestamp = new Date().getTime(); // 获取当前时间戳

module.exports = {
  publicPath: "/",
  devServer: { disableHostCheck: true },
  lintOnSave: true,
  productionSourceMap: false,

  chainWebpack(config) {
    config.module.rule("scss").oneOfs.store.forEach((item) => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          resources: [isProd ? "src/style/self_prod.scss" : "src/style/self_dev.scss"],
        })
        .end();
    });
  },
  css: isProd
    ? {
        extract: {
          filename: `css/[name].[chunkhash].${timestamp}.css`, // 打包时css文件配置
          chunkFilename: `css/[name].[chunkhash].${timestamp}.css`,
        },
      }
    : {}, // 生产环境时给css文件添加时间戳，避免浏览器使用旧版css文件

  configureWebpack: (config) => {
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    // 开启分离打包js文件
    config.optimization = {
      runtimeChunk: "single", // 'single': 会生成一个唯一单独的runtime.js文件，就是manifest。
      splitChunks: {
        // 主要就是根据不同的策略来分割打包出来的bundle。
        chunks: "all", // 同时分割同步和异步代码，推荐。
        maxInitialRequests: Infinity, // 一个入口最大的并行请求数（字面意思，一般不建议改。）
        minSize: 20000, // 按需加载时候最大的并行请求数
        cacheGroups: {
          // 缓存策略，默认设置了分割node_modules和公用模块。
          vendor: {
            test: /[\\/]node_modules[\\/]/, // 匹配规则
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]; // 重写文件名称
              return `npm.${packageName.replace("@", "")}`;
            },
          },
        },
      },
    };
    if (isProd) {
      Object.assign(config, {
        output: {
          // 生产环境时给js文件添加时间戳，避免浏览器使用旧版js文件
          ...config.output,
          filename: `js/[name].[chunkhash].${timestamp}.js`, // 打包时js文件配置
          chunkFilename: `js/[name].[chunkhash].${timestamp}.js`,
        },
      });
    }
  },
};
