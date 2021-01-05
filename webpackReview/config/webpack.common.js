const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin  = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: {
            import: './src/index.js',
            dependOn: 'shared',
        },
        other:{
            import: './src/other.js',
            dependOn: 'shared',
        } ,
        shared: 'lodash'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
					'css-loader',
					'less-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [ 'file-loader' ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["es2015"],
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack复习',
            filename: 'index.html', 
            template: './index.html'
        })
    ],
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, "../dist")
    },
    optimization: {
        runtimeChunk: 'single',
        moduleIds: 'deterministic', // 保证chunk的hash值一致
        splitChunks: {
            chunks: "async",
            cacheGroups: {
                commons: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendors',
                  chunks: 'all'
                }
              }
        }
    }
}
