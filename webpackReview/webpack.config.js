const path = require('path');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry:  {
        app:'./src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase:  path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit:  10
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    "file-loader"
                ]
            }
        ],
        
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: "[name].css",
        //     chunkFilename: "[id].css"
        //   }),
        new HtmlWebpackPlugin({
            title: '你好',
            filename: 'index.html', // 输出的文件名称 如果是多级目录会在 dist文件夹下生成对应的文件夹
            // template: './index.html' // 生成index.html的模板
        }),
        // 清除生成的dist
    ]
}