const path = require('path');
const htmlwebpackplugin = require('html-webpack-plugin');
module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'build.js',
		path: path.resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				test: /\.(css|less)$/,
				use: [ 'style-loader', 'css-loader', 'less-loader' ]
			}
		]
	},
	plugins: [
		new htmlwebpackplugin({
			title: '你好',
			filename: 'index.html', // 输出的文件名称 如果是多级目录会在 dist文件夹下生成对应的文件夹
			template: './public/index.html' // 生成index.html的模板
		})
	]
};
