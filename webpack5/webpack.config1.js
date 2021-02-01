const path = require('path');
const Htmlwebpackplugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
	entry: './src.index.js',
	output: {
		filename: 'js/index.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(css|less)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						// 解决css中引用图片路径找不到的问题
						options: {
							publicPath: '../'
						}
					},
					'css-loader',
					// 需要在根路径下添加postcss.config.js  配置css浏览器兼容
					// 添加.browserslistrc 文件配置需要兼容到的浏览器版本
					'postcss-loader',
					'less-loader'
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif)/,
				loader: 'url-loader',
				options: {
					// 10m以下的图片处理成base64以上单独处理成图片文件
					limit: 10 * 1024,
					name: '[hash:10].[ext]',
					outputPath: 'images',
					// 解决html中引入图片后的问题
					esModule: false
				}
			},

			{
				// 需要先进行语法检查，在做语法兼容性处理，否则都是报错
				// 需要在根路径下添加.eslintrc.js 进行语法检查的配置
				test: /\.js$/,
				exclude: /node_modules/,
				enforce: 'pre',
				loader: 'eslint-loader',
				options: {
					fix: true
				}
			},
			{
				// 需要在根路径下添加babel.config.js,进行js语法兼容处理
				test: /\.js/,
				loader: 'babel-loader'
			},
			{
				excludes: /\.(html|js|css|less|png|gif|jpg|jpeg)$/,
				loader: 'file-loader',
				options: {
					name: `[hash:10].[ext]`,
					// 指定输出的文件夹
					outputPath: 'assets'
				}
			},
			{
				test: /\.html$/,
				loader: 'html-withimg-loader'
			}
		]
	},
	plugins: [
		new Htmlwebpackplugin({
			template: './public/index.html',
			title: 'test',
			filename: 'index.html', // 输出模板文件的名字
			minify: {
				// 配置html压缩
				// 移除空格
				collapseWhitespace: true,
				// 移除注释
				removeComments: true
			}
		}),
		// 抽离css
		new MiniCssExtractPlugin({
			// 对输出css的名字进行配置
			filename: 'css/index.css'
		}),
		// 压缩css
		new OptimizeCssAssetsWebpackPlugin()
	],
	devServer: {
		port: '8080',
		open: true,
		compress: true,
		contentBase: path.resolve(__dirname, 'build'),
		hot: true
	}
};
