'use strict'
require('./check-versions')() // 检查NodeJS和npm的版本

process.env.NODE_ENV = 'production' // 设置当前环境为production

const ora = require('ora') // 终端显示的转轮loading
const rm = require('rimraf') // node环境下rm -rf的命令库
const path = require('path') // 文件路径处理库
const chalk = require('chalk') // 终端显示带颜色的文字
const webpack = require('webpack')
const config = require('../config') // 获取基本配置
const webpackConfig = require('./webpack.prod.conf') // 生产环境下的webpack配置
// 在终端显示ora库的loading效果
const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => { // 删除已编译文件
  if (err) throw err
  webpack(webpackConfig, (err, stats) => { // 在删除完成的回调函数中开始编译
    spinner.stop() // 停止loading
    if (err) throw err
    process.stdout.write(stats.toString({ // 在编译完成的回调函数中,在终端输出编译的文件
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build. 如果您使用的是ts-loader，将其设置为true将会在构建过程中显示打印错误。
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
