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
			{
				test: /\.(jpg|png|gif)/,
				loader: 'file-loader',
				options: {
					limit: 8 * 1024
				}
			},
			{
				excludes: /.\(html|css|less)/,
				loader: 'file-loader',
				options: {
					name: '[hash:10].[ext]',
					outputPath: 'others'
				}
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
