const path  = require("path");
const Plugin1  = require("./plugins/Plugin1");
module.exports = {
    // mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                // loader: path.resolve(__dirname, 'loaders', 'loader1')
                // use: [
                //     'loader1',
                //     {
                //         loader: 'loader-options',
                //         options: {
                //             name:'bqc',// 这样校验就不会出错
                //             // name: false // 这样就会报错
                //             age: 14 // 因为设置了可追加属性additionalProperties为true所以加个age属性是没问题的
                //         }
                //     }
                // ],
                loader: 'babelLoader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ]
                }
            }
        ]
    },
    // loader的解析规则  默认是node_modules  这里加上自己开发的loader目录
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders')
        ]
    },
    plugins: [
        new Plugin1()
    ]
}