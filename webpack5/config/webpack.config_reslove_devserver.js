const path = require('path');
const { resolve } = require('webpack');
const Htmlwebpackplugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
console.log(process.env.NODE_ENV);
module.exports = {
	mode: 'development',
	entry: [ './src/index.js', './public/index.html' ],
	output: {
		// 区分环境打包时，使用这种方式区分缓存hash值
		// 如果是production环境，hash缓存方式还是contenthash会爆错误
		// Cannot use [chunkhash] or [contenthash] for chunk in 'js/index.[contenthash:10].js' (use [hash] instead)
		// 所以在development环境下 使用hash 方式的缓存  minicssplugin也是一样
		// filename: this.mode === 'production' ? 'js/[name].[contenthash:10].js' : 'js/[name].[hash:10].js',
		filename: 'js/index.[hash:10].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			// eslint语法检查
			//  cnpm i eslint eslint-loader eslint-config-airbnb-base eslint-plugin-import -D
			// 当前配置的具体内容在 .eslintrc.js 中
			// {
			// 	test: /\.js$/,
			// 	exclude: /node_modules/,
			// 	enforce: 'pre', // 同一个匹配规则下优先执行的loader配置
			// 	loader: 'eslint-loader',
			// 	options: {
			// 		// 自动修复
			// 		fix: true
			// 	}
			// },
			{
				// 以下loader只会执行一个
				// 不能有两个配置同时处理一个类型的文件
				oneOf: [
					{
						test: /\.(css|less)$/,
						use: [
							// 创建style标签，将样式加入
							// 'style-loader',
							// 这个loader取代style-loader 作用：提取js中的css成单独的文件
							{
								loader: MiniCssExtractPlugin.loader,
								options: {
									publicPath: '../'
								}
							},
							'css-loader',
							'postcss-loader',
							'less-loader'
							// css兼容性处理： postcss-loader postcss-preset-env
							// 使用loader的默认配置 直接写 "postcss-loader",
							// 需要根目录添加两个文件 .browserslistrc 用于做浏览器兼容问题
							// postcss.config.js
						]
					},

					// babel处理语法兼容性问题
					// 1:通过以下配置以后还需要在 根路径下新建babel-config.js 完成基础的js兼容
					// 2:按需处理js高级语法（promise等）兼容问题 使用core-js
					// cnpm i babel-loader @babel/preset-env @babel/core -D
					// 这里我们把需要的配置写在了babel.config.js 中
					{
						test: /\.js$/,
						exclude: /node_modules/,
						loader: 'babel-loader',
						options: {
							// js babel 构建缓存
							// 第二次构建时会读取之前的缓存
							cacheDirectory: true
						}
					},

					// 处理图片资源
					{
						test: /\.(jpg|png|jpeg)/,
						loader: 'url-loader',
						options: {
							limit: 1 * 1024,
							name: '[hash:10].[ext]',
							outputPath: 'images',
							esModule: false
						}
					},
					// 处理其他资源
					{
						exclude: /\.(html|css|less|png|jpg|jpeg|js)/,
						loader: 'file-loader',
						options: {
							name: `[hash:10].[ext]`,
							// 指定输出的文件夹
							outputPath: 'media'
						}
					},
					{
						test: /\.html$/,
						loader: 'html-withimg-loader'
					}
				]
			}
		]
	},
	plugins: [
		// new CleanWebpackPlugin(),
		new Htmlwebpackplugin({
			title: '你好',
			filename: 'index.html', // 输出的文件名称 如果是多级目录会在 dist文件夹下生成对应的文件夹
			template: './public/index.html', // 生成index.html的模板
			minify: {
				// 配置html压缩
				// 移除空格
				collapseWhitespace: true,
				// 移除注释
				removeComments: true
			}
		}),
		new MiniCssExtractPlugin({
			// 对输出的css文件重命名
			// filename: this.mode === 'production' ? 'css/index.[contenthash:10].css' : 'css/index.[hash:10].css'
			filename: 'css/index.[hash:10].css'
		}),
		// css压缩插件
		new OptimizeCssAssetsWebpackPlugin()
	],
	// 在内存中编译打包，不会有输出，
	// 启动命令为npx webpack-dev-server
	devServer: {
		contentBase: path.resolve(__dirname, 'build'),
		// 启动gzip压缩
		compress: true,
		port: 3000,
		// open: true,
		hot: true, // 模块热更新
		// 监听contentbase下的文件，如果发生变化会reload重载
		watchContentBase: true,
		watchOptions: {
			// 忽略监视哪些文件
			ignored: /node_modules/
		},
		// 域名
		host: 'localhost',
		// 不要显示启动服务器日志信息
		clientLogLevel: 'none',
		// 除了一些基本的启动信息以为，其他内容不显示
		quiet: true,
		// 如果出错了不全屏提示
		overlay: false,
		// 解决开发环境的跨域问题
		proxy: {
			// 因为浏览器和代理服务器（devSever）是没有跨域问题的，需要请求的服务器和代理服务器之间也是没有跨域问题的
			// 浏览器请求会通过代理服务器中转请求，从而解决跨域问题
			// 当devserver服务器接收到 /api/xxx 的请求，就会吧请求转发到另一个服务器（3000）
			'/api': {
				target: '代理的服务器域名',
				// 发送请求时，请求路径重写，将 /api/xxx --> /xxx (去掉/api)
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
	devtool: 'nosources-source-map',
	resolve: {
		alias: {
			$css: path.resolve(__dirname, 'src/css')
		},
		// 配置省略路径的后缀名
		extensions: [ '.js', '.json', '.css', '.jsx' ],
		// 告诉webpack解析模块去找哪个目录
		modules: [ path.resolve(__dirname, 'node_modules'), 'node_modules' ]
	}
	// externals: {
	// 	jquery: 'jQuery',
	// 	lodash: '_'
	// }
};
