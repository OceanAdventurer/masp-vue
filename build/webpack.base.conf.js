'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

const cesiumSource = '../node_modules/cesium/Source' // cesium--配置

function resolve (dir) { // 获取绝对路径
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: { // webpack入口文件
    app: './src/main.js'
  },
  output: { // webpack输出路径和命名规则
    path: config.build.assetsRoot, // 输出的目标文件夹路径
    filename: '[name].js', // 输出bundle文件命名格式
    publicPath: process.env.NODE_ENV === 'production' // 生产模式或开发模式下html、js等文件内部引用的公共路径
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
    sourcePrefix: ' ' // cesium--配置
  },
  //cesium--配置----------------------------------------
  amd:{
    toUrlUndefined: true
  },
  resolve: { // 文件解析
    extensions: ['.js', '.vue', '.json'], // 自动解析确定的拓展名,使导入模块时不带拓展名
    // Webpack的resolve.modules配置模块库（即 node_modules）所在的位置，在 js 里出现 import 'vue' 这样不是相对、也不是绝对路径的写法时，会去 node_modules 目录下找。
    // 但是默认的配置，会采用向上递归搜索的方式去寻找，但通常项目目录里只有一个 node_modules，且是在项目根目录，为了减少搜索范围，可以直接写明 node_modules 的全路径；
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: { // 创建import或require的别名
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      'store': resolve('src/store'),
      'api': resolve('src/api'),
      'cesium': path.resolve(__dirname, cesiumSource) // cesium--配置
    }
  },
  module: { // 模块解析
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      /* { // 对所有.vue文件使用vue-loader进行编译
        test: /\.vue$/, // vue文件后缀
        loader: 'vue-loader', // 使用vue-loader处理
        options: vueLoaderConfig // options是对vue-loader做的额外选项配置
      }, */
/*       { // 对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5
        test: /\.js$/, // 1、如果项目源码中只有js文件，就不要写成/\.jsx?$/，以提升正则表达式的性能
        loader: 'babel-loader?cacheDirectory=true', // babel-loader支持缓存转换出的结果，通过cacheDirectory选项开启
        include: [resolve('src')] // 只对项目根目录下的src 目录中的文件采用 babel-loader
        // include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')] // 只对项目根目录下的src 目录中的文件采用 babel-loader
      }, */
      {
        test: /\.vue$/,
        use: ['happypack/loader?id=vue'],
      },
      { // 使用HappyPack多进程解析和处理文件
        test: /\.js$/,
        use: ['happypack/loader?id=babel'], // 将对.js 文件的处理转交给 id 为 babel 的HappyPack实例
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
        exclude: path.resolve(__dirname, 'node_modules') // 排除第三方插件
      },
      { // 对图片资源文件使用url-loader
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 图片后缀
        loader: 'url-loader', // 使用url-loader处理
        options: {
          limit: 10000, // 字节小于10000字节的时候将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 file-loader 处理；即小于10K的图片转成base64编码的dataURL字符串写到代码中
          name: utils.assetsPath('img/[name].[hash:7].[ext]') // 其他的图片转移到静态资源文件夹
        }
      },
      { // 对多媒体资源文件使用url-loader
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 媒体后缀
        loader: 'url-loader',
        options: {
          limit: 10000, // 小于10K的资源转成base64编码的dataURL字符串写到代码中
          name: utils.assetsPath('media/[name].[hash:7].[ext]') // 其他的资源转移到静态资源文件夹
        }
      },
      { // 对字体资源文件使用url-loader
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 字体后缀
        loader: 'url-loader',
        options: {
          limit: 10000, // 小于10K的资源转成base64编码的dataURL字符串写到代码中
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]') // 其他的资源转移到静态资源文件夹
        }
      }
    ],
    // cesium--配置
    // unknownContextRegExp: /^.\/.*$/
    unknownContextCritical: false
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
