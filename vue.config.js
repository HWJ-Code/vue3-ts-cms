// const path = require('path')

module.exports = {
  //1.配置方式一：根据CLI提供的选项来配置：
  // outputDir: './build',
  // publicPath: './'
  //2.配置方式二：和webpack属性完全一致，最后会进行合并
  //1.对象 直接会被合并；
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       components: '@/components'
  //     }
  //   }
  // }
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