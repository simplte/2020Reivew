const {merge}  = require("webpack-merge");
const common  = require("./webpack.common");
const path = require("path");
 const webpack  = require("webpack");
module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        hot: true,
		port: 9000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})