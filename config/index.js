// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
	// 构建产品时使用的配置
	pro: {
		// webpack的编译环境
		env: require('./prod.env'),
		
		// 编译输入的index.html文件
		index: path.resolve(__dirname, '../uums-web-build/uums.html'),
		// webpack输出的目标文件夹路径
		assetsRoot: path.resolve(__dirname, '../uums-web-build'),
		
		// webpack编译输出的二级文件夹
		assetsSubDirectory: 'static',
		// webpack编译输出的发布路径
		assetsPublicPath: './',
		// 使用SourceMap
		productionSourceMap: false,
		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: false,
		// gzip模式下需要压缩的文件的扩展名
		productionGzipExtensions: ['js', 'css'],
		// Run the build command with an extra argument to
		// View the bundle analyzer report after build finishes:
		// `npm run build --report`
		// Set to `true` or `false` to always turn it on or off
		bundleAnalyzerReport: process.env.npm_config_report
	},
	// 构建产品时使用的配置
	build: {
		// webpack的编译环境
		env: require('./test.env'),
		
		// 编译输入的index.html文件
		index: path.resolve(__dirname, '../uums-web-build/uums.html'),
		// webpack输出的目标文件夹路径
		assetsRoot: path.resolve(__dirname, '../uums-web-build'),
		
		// webpack编译输出的二级文件夹
		assetsSubDirectory: 'static',
		// webpack编译输出的发布路径
		assetsPublicPath: './',
		// 使用SourceMap
		productionSourceMap: false,
		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: false,
		// gzip模式下需要压缩的文件的扩展名
		productionGzipExtensions: ['js', 'css'],
		// Run the build command with an extra argument to
		// View the bundle analyzer report after build finishes:
		// `npm run build --report`
		// Set to `true` or `false` to always turn it on or off
		bundleAnalyzerReport: process.env.npm_config_report
	},
	
	// 开发过程中使用的配置
	dev: {
		env: require('./dev.env'),
		// dev-server监听的端口
		port: 8002,
		// 启动dev-server之后自动打开浏览器
		autoOpenBrowser: true,
		// webpack编译输出的二级文件夹
		assetsSubDirectory: 'static',
		// webpack编译输出的发布路径
		assetsPublicPath: '/',
		// 请求代理表，在这里可以配置特定的请求代理到对应的API接口
		proxyTable: {
			"/api": {
				target: "http://gateway.com",
				changeOrigin: true,
			},
//			"/personal": {
//				target: "http://172.16.16.45:8088",
//				changeOrigin: true,
//			},

		},
		context: [ //代理路径
			
		],
		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		cssSourceMap: false
	}
}