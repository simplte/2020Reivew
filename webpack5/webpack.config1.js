const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'js/index.js',
		path: path.resolve(__dirname, 'dist')
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(less|css)$/,
				use: [
					// 'style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader',
					'postcss-loader'
				]
			},
			// 使用url-loader处理图片
			{
				test: /\.(jpg|png|gif)/,
				loader: 'url-loader',
				options: {
					limit: 1 * 1024,
					name: '[hash:10].[ext]',
					outputPath: 'images'
				}
			},
			{
				excludes: /.\(html|css|less|png|jpg|jpeg)/,
				loader: 'file-loader',
				options: {
					name: '[hash:10].[ext]',
					outputPath: 'others'
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			title: 'test',
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[hash:10].[ext]'
		}),
		new OptimizeCssAssetsWebpackPlugin()
	],
	devserver: {
		port: 8080,
		contentBase: path.resolve(__dirname, './src/index.js'),
		compress: true,
		open: true
	}
};
