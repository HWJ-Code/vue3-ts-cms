// const path = require('path')
const ElementPlus = require('unplugin-element-plus/webpack')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  //1.配置方式一：根据CLI提供的选项来配置：
  // outputDir: './build',
  publicPath: './',
  //2.配置方式二：和webpack属性完全一致，最后会进行合并
  //1.对象 直接会被合并；
  //按需引入element-plus样式 npm install -D unplugin-vue-components unplugin-auto-import
  configureWebpack: {
    plugins: [
      ElementPlus(),

      AutoImport({
        resolvers: [
          // ElementPlusResolver()

          //解决v-loading报错找不到样式的问题 不去引入
          ElementPlusResolver({ importStyle: false })
        ]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    //配置路径别名
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components'
      }
    }
  }
  //2:函数 会接收一个config，可以通过config来修改配置；
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // }
  //3.配置方式三： 通过chainWebpack修改webpack的配置：
  //是一个函数，会接收一个基于  [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 的config对象，可以对配置进行修改；
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
}
