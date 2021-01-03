const {merge}  = require("webpack-merge");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const common  = require("./webpack.common");
module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new UglifyJsPlugin({
            sourceMap: true
        })
    ]
})