'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // extract-text-webpack-plugin可以提取bundle中的特定文本，将提取后的文本单独存放到另外的文件;这里用来提取css样式
const packageConfig = require('../package.json')

// 资源文件的存放路径
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

// 用来返回针对各类型的样式文件的处理方式
exports.cssLoaders = function (options) { 
  options = options || {}

  const cssLoader = { // 定义css-loader
    loader: 'css-loader',
    options: { // options是loader的选项配置 
      sourceMap: options.sourceMap // 根据参数是否生成sourceMap文件
    }
  }

  const postcssLoader = { // 定义postcss-loader，给不同浏览器的样式加上前缀
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin 生成各种loader配置，并且配置了extract-text-pulgin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) { // 如果参数loader存在
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, { // 将loaderOptions和sourceMap组成一个对象
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified 在指定选项时提取css
    // (which is the case during production build) 生产过程就是这样做的
    if (options.extract) { // 如果传入的options存在extract且为true
      return ExtractTextPlugin.extract({ // ExtractTextPlugin分离js中引入的css文件
        use: loaders, // 处理的loader
        fallback: 'vue-style-loader' // 没有被提取分离时使用的loader
      })
    } else { // 无需提取样式则简单使用vue-style-loader配合各种样式loader去处理<style>里面的样式
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return { // 返回css类型对应的loader组成的对象 generateLoaders()来生成loader
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue) // 生成处理单独的.css、.sass、.scss等样式文件的规则
exports.styleLoaders = function (options) {
  const output = [] // 定义返回的数组，数组中保存的是针对各类型的样式文件的处理方式
  const loaders = exports.cssLoaders(options) // 调用cssLoaders方法返回各类型的样式对象(css: loader)

  for (const extension in loaders) { // 循环遍历loaders
    const loader = loaders[extension] // 根据遍历获得的key(extension)来得到value(loader)
    output.push({
      test: new RegExp('\\.' + extension + '$'), // 处理的文件类型
      use: loader // 用loader来处理，loader来自loaders[extension]
    })
  }
  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
