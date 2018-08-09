require('./check-versions')()

var config = require('../config')

process.env.NODE_ENV = "development"


var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
// 一个express中间件，用于将http请求代理到其他服务器
// 例：localhost:8080/api/xxx  -->  localhost:3000/api/xxx
// 这里使用该插件可以将前端开发中涉及到的请求代理到API服务器上，方便与服务器对接
var proxyMiddleware = require('http-proxy-middleware')
// 根据 Node 环境来引入相应的 webpack 配置
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')
// dev-server 监听的端口，默认为config.dev.port设置的端口，即8080
// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// 用于判断是否要自动打开浏览器
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// 定义 HTTP 代理表，代理到 API 服务器
var proxyTable = config.dev.proxyTable

var app = express()
// 根据webpack配置文件创建Compiler对象
var compiler = webpack(webpackConfig)
// webpack-dev-middleware使用compiler对象来对相应的文件进行编译和绑定
// 编译绑定后将得到的产物存放在内存中而没有写进磁盘
// 将这个中间件交给express使用之后即可访问这些编译后的产品文件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
// webpack-hot-middleware，用于实现热重载功能的中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// 当html-webpack-plugin提交之后通过热重载中间件发布重载动作使得页面重载
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// 将 proxyTable 中的代理请求配置挂在到express服务器上
   Object.keys(proxyTable).forEach(function (context) {
     var options = proxyTable[context]
// 格式化options，例如将'www.example.com'变成{ target: 'www.example.com' }
     if (typeof options === 'string') {
       options = { target: options }
     }
     app.use(proxyMiddleware(options.filter || context, options))
   })

var context = config.dev.context

switch(process.env.NODE_ENV){
    case 'local': var proxypath = 'http://192.168.8.116'; break;
    case 'online': var proxypath = 'http://192.168.8.116'; break;
}
var options = {
    target: proxypath,
    changeOrigin: true,
}
if (context.length) {
    app.use(proxyMiddleware(context, options))
}
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)


// 静态资源的路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
// webpack开发中间件合法（valid）之后输出提示语到控制台，表明服务器已启动
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})
//启动express服务器并监听相应的端口（8080）
var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
