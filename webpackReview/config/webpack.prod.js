const { merge } = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(common, {
	// devtool: 'source-map',
	mode: 'production',
	plugins: [
		new UglifyJsPlugin({
			sourceMap: true
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	]
});
