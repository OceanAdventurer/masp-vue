'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const os = require('os')
const baseWebpackConfig = require('./webpack.base.conf')
const vueLoaderConfig = require('./vue-loader.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const CleanWebpackPlugin = require('clean-webpack-plugin') // 构建前清除已经编译的文件夹
// 使用HappyPack多进程解析和处理文件
const HappyPack = require('happypack')
// 构造出共享进程池，在进程池中包含cpus的进程
const HappyPackThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

// cesium--配置
const cesiumSource = 'node_modules/cesium/Source'
const cesiumWorkers = '../Build/Cesium/Workers'

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, { // 通过merge方法合并webpack.base.conf.js基础配置
  module: { // 样式文件的处理规则，对css/sass/scss等不同内容使用相应的styleLoaders;由utils配置出各种类型的预处理语言所需要使用的loader，例如sass需要使用sass-loader
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true }) // 通过传入一些配置来获取rules配置，此处传入了sourceMap: false,表示不生成sourceMap
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    disableHostCheck: true,
    clientLogLevel: 'warning', // 客户端日志级别
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']), // 清空dist目录
    new webpack.DefinePlugin({ // 编译时配置的全局变量
      'process.env': require('../config/dev.env') // 当前环境为开发环境
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    new webpack.NamedModulesPlugin(), // HMR在更新时在控制台显示正确的文件名。
    new webpack.NoEmitOnErrorsPlugin(), // 不触发错误,即编译后运行的包正常运行
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // 复制自定义的静态资源
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),

    // cesium 资源文件复制
    new CopyWebpackPlugin([ { from: path.join(cesiumSource, cesiumWorkers), to: config.dev.assetsSubDirectory + '/cesium/Workers' } ]),
    new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Assets'), to: config.dev.assetsSubDirectory + '/cesium/Assets' } ]),
    new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Widgets'), to: config.dev.assetsSubDirectory + '/cesium/Widgets' } ]),
    new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'ThirdParty/Workers'), to: config.dev.assetsSubDirectory + '/cesium/ThirdParty/Workers' } ]),
    new webpack.DefinePlugin({
        // cesium--配置
        CESIUM_BASE_URL: JSON.stringify('/DSAP/static/cesium/')
    }),

    new HappyPack({
      // 用唯一的标识符id，来代表当前的HappyPack是用来处理一类特定的文件
      id: 'vue',
      loaders: [
        {
          loader: 'vue-loader',
          options: vueLoaderConfig
        }
      ],
      threadPool: HappyPackThreadPool,
      verbose: true // 允许 HappyPack 输出日志
    }),
    new HappyPack({
      // 用唯一的标识符id，来代表当前的HappyPack是用来处理一类特定的文件
      id: 'babel',
      // 如何处理.js文件，用法和Loader配置中一样
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: HappyPackThreadPool,
      verbose: true // 允许 HappyPack 输出日志
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin //添加友好的错误提示
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
