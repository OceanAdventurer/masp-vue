'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({ // 处理.vue文件中的样式
    sourceMap: sourceMapEnabled, // 是否打开source-map
    extract: isProduction // 是否提取样式到单独的文件
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: { // 默认下列标签/特性的组合会被转换，且这些组合时可以使用 transformAssetUrls 选项进行配置的。
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
