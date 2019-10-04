const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",

  productionSourceMap: false, //去除build版本的map
  devServer: {
    // publicPath: "/", // 和 publicPath 保持一致,
    port: 9529,
    proxy: "http://localhost:3002"
    // {

    // "/api": {
    //   target: "http://localhost:3000", //设置你调用的接口域名和端口号 别忘了加http
    //   changeOrigin: true,
    //   ws: true
    //   // pathRewrite: {
    //   //   "^/api": "" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
    //   // }
    // }
    // }
  },
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === "production") {
  //     config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
  //   }
  // }
  configureWebpack: config => {
    config.devtool = "source-map";
    if (isProduction) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8
        })
      );
    } else {
    }
  },
  chainWebpack: config => {
    // config.module
    //   .rule("eslint")
    //   .use("eslint-loader")
    //   .loader("eslint-loader")
    //   .tap(options => {
    //     options.fix = true;
    //     return options;
    //   });
    config.plugins.delete("prefetch"); //关闭预拉取插件
  }
};
