const path = require('path');
const htmlwebpackplugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'js/build.js',
		path: path.resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				test: /\.(css|less)$/,
				use: [
					// 创建style标签，将样式加入
					// 'style-loader',
					// 这个loader取代style-loader 作用：提取js中的css成单独的文件
					MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader',
					// css兼容性处理： postcss-loader postcss-preset-env
					// 使用loader的默认配置 直接写 "postcss-loader",
					// 需要根目录添加两个文件 .browserslistrc 用于做浏览器兼容问题
					// postcss.config.js
					'postcss-loader'
				]
			},
			{
				exclude: /\.(html|less|js|css)$/,
				loader: 'file-loader',
				options: {
					name: `[hash:10].[ext]`,
					// 指定输出的文件夹
					outputPath: 'media'
				}
			}
		]
	},
	plugins: [
		new htmlwebpackplugin({
			title: '你好',
			filename: 'index.html', // 输出的文件名称 如果是多级目录会在 dist文件夹下生成对应的文件夹
			template: './public/index.html' // 生成index.html的模板
		}),
		new MiniCssExtractPlugin({
			// 对输出的css文件重命名
			filename: 'css/index.css'
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
		open: true
	}
};
