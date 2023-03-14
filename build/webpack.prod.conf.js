'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const vueLoaderConfig = require('./vue-loader.conf')
const os = require('os')
// 将单个文件或者整个目录复制到构建目录中
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 简化创建HTML文件来为你的webpack包提供服务
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 提取样式插件
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// webpack提供的UglifyJS插件由于采用单线程压缩，速度很慢,webpack-parallel-uglify-plugin插件可以并行运行UglifyJS插件，这可以有效减少构建时间。
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
// 构建前清除已经编译的文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 使用HappyPack多进程解析和处理文件
const HappyPack  = require('happypack')
// 构造出共享进程池，在进程池中包含cpu的进程
const HappyPackThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const env = require('../config/prod.env')

// cesium--配置
const cesiumSource = 'node_modules/cesium/Source'
const cesiumWorkers = '../Build/Cesium/Workers'

const webpackConfig = merge(baseWebpackConfig, { // 通过merge方法合并webpack.base.conf.js基础配置
  module: { // module的处理,主要是针对css的处理
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: { // 输出文件
    path: config.build.assetsRoot, // 输出文件目录
    filename: utils.assetsPath('js/[name].[chunkhash].js'), // 输出文件名字
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js') // 非入口文件的文件名，而又需要被打包出来的文件命名配置,如按需加载的模块
  },
  externals: {
    'vue': 'Vue',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter',
    'echarts': 'echarts',
    'axios': 'axios',
    'element-ui': 'ELEMENT',
    'moment': 'moment'
  },
  plugins: [
    // 当vendor模块没有改变时，保持模块id稳定
    new webpack.HashedModuleIdsPlugin(),
    // webpack 3.x 提供了一个新的功能： scope hoisting(作用域提升)。只需在配置文件中添加一个新的插件，就可以让 Webpack 打包出来的代码文件更小、运行的更快。只针对es6的模块化有效
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 分离公共js到vendor中;此插件用于建立一个独立文件(又称作 chunk)的功能，这个文件包括多个入口 chunk 的公共模块。通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存到缓存中供后续使用。这个带来速度上的提升，因为浏览器会迅速将公共的代码从缓存中取出来，而不是每次访问一个新页面时，再去加载一个更大的文件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // node_modules中的任何必需模块都被提取给vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    /**
     * 上面虽然已经分离了第三方库,每次修改编译都会改变vendor的hash值，导致浏览器缓存失效。
     * 原因是vendor包含了webpack在打包过程中会产生一些运行时代码，运行时代码中实际上保存了打包后的文件名。
     * 当修改业务代码时,业务代码的js文件的hash值必然会改变。一旦改变必然会导致vendor变化。vendor变化会导致其hash值变化。
     * 下面主要是将运行时代码提取到单独的manifest文件中，防止其影响vendor.js
     */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    // 异步下载公共的模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({ // 配置全局环境为生产环境
      'process.env': env
    }),
    new CleanWebpackPlugin(['dist']), // 清空dist目录
    new ParallelUglifyPlugin({ // js文件压缩插件
      cacheDir: '.cache/',
      uglifyJS: {
        output: {
          beautify: false,
          comments: false
        },
        warnings: false,
        compress: {
          drop_debugger: true,
          drop_console: true,
          pure_funcs: ['console.log'] // 移除代码中的console.log
        }
      }
    }),
    // extract css into its own file 将css提取到它自己的文件中
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks. 将以下选项设置为“false”将不会从代码块中提取CSS。
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack. 它们的CSS将会在被webpack加载的时候，用样式加载器动态地插入。
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110 它现在被设置为“true”，因为我们看到sourcemaps也被包含在代码包中，当它是“false”时，增加文件大小
      allChunks: true,
    }),
    // 压缩提取的css
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // 生成html的插件,引入css文件和js文件
    new HtmlWebpackPlugin({
      filename: config.build.index, // 生成的html的文件名
      template: 'production.html', // 依据的模板,新建的production.html带有cdn资源
      inject: true, // 注入的js文件将会被放在body标签中,当值为'head'时，将被放在head标签中
      minify: { // 压缩配置
        removeComments: true, // 删除html中的注释代码
        collapseWhitespace: true, // 删除html中的空白符
        removeAttributeQuotes: true // 删除html元素中属性的引号
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency' // 按dependency的顺序引入
    }),
    // 复制静态资源,将static文件内的内容复制到指定文件夹
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*'] // 忽视.*文件
      }
    ]),

    // cesium 资源文件复制
    new CopyWebpackPlugin([ { from: path.join(cesiumSource, cesiumWorkers), to: config.build.assetsSubDirectory + '/cesium/Workers' } ]),
    new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Assets'), to: config.build.assetsSubDirectory + '/cesium/Assets' } ]),
    new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Widgets'), to: config.build.assetsSubDirectory + '/cesium/Widgets' } ]),
    new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'ThirdParty/Workers'), to: config.build.assetsSubDirectory + '/cesium/ThirdParty/Workers' } ]),
    new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('./static/cesium/')
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
    }),
    new HappyPack({
      // 用唯一的标识符id，来代表当前的HappyPack是用来处理一类特定的文件
      id: 'babel',
      // 如何处理.js文件，用法和Loader配置中一样
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: HappyPackThreadPool,
    })
  ]
})

if (config.build.productionGzip) { // 配置文件开启了gzip压缩
  const CompressionWebpackPlugin = require('compression-webpack-plugin') // 引入压缩文件的组件,该插件会对生成的文件进行压缩，生成一个.gz文件

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]', // 目标文件名
      algorithm: 'gzip', // 使用gzip压缩
      test: new RegExp( // 满足正则表达式的文件会被压缩
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240, // 资源文件大于10240B=10kB时会被压缩
      minRatio: 0.8 // 最小压缩比达到0.8时才会被压缩
    })
  )
}

// 如果启动了report，则通过插件给出webpack构建打包后的产品文件分析报告;用交互式可缩放树形图显示webpack输出文件的大小。
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
