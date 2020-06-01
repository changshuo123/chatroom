module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        "^/api": {
          target: "http://bb.shoujiduoduo.com/baby/bb.php",
          pathRewrite: {
            "^/api": "",
          },
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
