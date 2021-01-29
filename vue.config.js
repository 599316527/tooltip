module.exports = {
    css: {
      extract: false,
      loaderOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    transpileDependencies: [
      'veui',
      'vue-awesome',
      'resize-detector'
    ],
    chainWebpack: config => {
      config.module
        .rule('veui')
        .test(/\.vue$/)
        .pre()
        .use('veui-loader')
        .loader('veui-loader')
        .tap(() => {
          return {
            modules: [
              {
                package: 'veui-theme-dls',
                fileName: '{module}.less'
              },
              {
                package: 'veui-theme-dls',
                fileName: '{module}.js',
                transform: false
              }
            ]
          }
        })
    }
  }