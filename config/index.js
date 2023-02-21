'use strict'
// 此配置文件是用来定义开发环境和生产环境中所需要的参数
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

// path是node.js的路径模块，用来处理路径统一的问题
const path = require('path')

module.exports = {
  dev: {
    // 编译文件的输出目录
    assetsSubDirectory: 'static',

    // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsPublicPath: '/csap/',
    // assetsPublicPath: '/',

    // dev服务器使用http-proxy-middleware进行代理,定义代理规则
    proxyTable: {  // 到请求/users现在会被代理到请求http://172.20.42.144:8080/csap/users
      '/**': {
        // target: 'http://10.18.21.122:8081/', // 代理接口的域名   http://localhost:8081/ | http://172.20.42.143:8080/ | http://172.20.42.144:8080/
        // target: 'http://10.62.103.242:8080/', // 后台詹龙飞服务器
        // target: 'http://localhost:8080/', // 本地启动后台服务
        target:'http://172.168.20.141:8080/', // 测试环境
        secure: false,      // 如果是https接口，需要配置这个参数, 默认情况下，不接受运行在HTTPS上，且使用了无效证书的后端服务器
        changeOrigin: false,     // 如果接口跨域，需要进行这个参数配置
        pathRewrite: { // 如果你不想始终传递/api，则需要重写路径
          // '^/csap': ''
        }
      }
    },

    // 开发服务器地址
    host: 'localhost', // can be overwritten by process.env.HOST

    // 开发服务器端口号
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined

    // 服务启动后，是否自动打开浏览器 devServer.open
    autoOpenBrowser: false,

    // 当出现编译器错误或警告时，在浏览器中显示全屏叠加。默认情况下禁用。 devServer.overlay
    errorOverlay: true,

    // 是否显示错误通知 配合 friendly-errors-webpack-plugin
    notifyOnErrors: true,
    
    // 使用文件系统(file system)获取文件改动的通知devServer.watchOptions
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    // 在控制台显示编译时的错误和警告
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    // 在浏览器中显示eslint错误信息
    showEslintErrorsInOverlay: true,

    /**
     * Source Maps
     */
    // 增强调试 可能的推荐值：eval, eval-source-map(推荐), cheap-eval-source-map, cheap-module-eval-source-map
    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map ',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // develop 下不生成 sourceMap
    cssSourceMap: false
  },
  // 此属性是build也是生产环境编译下的一些配置
  build: {
    // 此属性是相对路径的拼接，假如当前目录是config，那么下面配置的index属性的属性值就是dist/index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // 此属性定义的是静态资源的根目录，即dist目录
    assetsRoot: path.resolve(__dirname, '../dist'),

    // 此属性定义的是静态资源根目录的子目录static，也就是dist目录下面的static目录
    assetsSubDirectory: 'static',

    // 此属性定义的是静态资源的公开路径，也就是真正的引用路径。值修改成‘./’ 不用启动服务器直接访问
    assetsPublicPath: '/csap/',
    // assetsPublicPath: '/',

    // 此属性定义是否在生产环境生成souremap，sourcemap是用来debug编译文件的，通过映射到编译前文件来实现
    productionSourceMap: true, // false不开启调试，不会生成map调试文件

    // https://webpack.js.org/configuration/devtool/#production
    // devtool: 'source-map',
    devtool: 'cheap-module-source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // 此属性是否在生产环境中压缩代码，如果压缩必须先安装compression-webpack-plugin
    productionGzip: false,

    // 需要使用 gzip 压缩的文件扩展名
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 此属性用来开启编译完成后是否显示资源报告，可以通过设置为true和false来开启或者关闭
    // 这个值process.env.npm_config_report表示定义的一个npm_config-report环境变量，可以自行设置
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
