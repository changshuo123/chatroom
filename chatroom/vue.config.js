module.exports = {
  configureWebpack: {

  },
  devServer: {
    proxy: {
      "^/": {
        target: "http://192.168.1.4",
        pathRewrite: {
          "^/": "",
        },
      },
      "^/log": {
        target: "https://api.netease.im/nimserver/user/create.action",
        pathRewrite: {
          "^/log": "",
        },
      },
    },
  },
  chainWebpack: (config) => {
    // const oneOfsMap = config.module.rule("scss").oneOfs.store;
    // oneOfsMap.forEach((item) => {
    //   item
    //     .use("sass-resources-loader")
    //     .loader("sass-resources-loader")
    //     .options({
    //       resources: [
    //         "./src/static/scss/common.scss",
    //         "./src/static/scss/_mixin.scss",
    //       ],
    //     })
    //     .end();
    // });
    // module.exports = {
    //   chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: ['./static/scss/common.scss', './src/static/scss/_mixin.scss']
        })
        .end()
    })
    // }
    // }
    // module.exports = {
    //   css: {
    //     loaderOptions: {
    //       sass: {
    //         data: `@import "@/static/scss/_mixin.scss";`
    //       }
    //     }
    //   }
    // };
  },
};
