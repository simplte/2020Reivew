// compilation的使用
const fs = require("fs");
const util = require('util')
const path = require("path");
const webpack = require('webpack');

const { RawSource } = webpack.sources;


// 将fs.readFile 方法变成基于promise风格的异步方法
const readFile = util.promisify(fs.readFile)
// 插件执行时会调用apply方法 complier
class Plugins2 {
    constructor() {}
    apply(complier) {
        // 初始化compilation钩子
        complier.hooks.thisCompilation.tap('Plugin2', (compilation) => {
            // debugger;
            // console.log(compilation);
            // 往打包的数据中添加新的资源 异步串行处理
            compilation.hooks.additionalAssets.tapAsync('Plugin2',(cb) => {
                // const content = "hello plugin2";
                // compilation.assets 是webpack输出资源的方法
                // compilation.assets['a.txt'] = {
                //     size() {
                //         return content.size
                //     },
                //     source() {
                //         return content;
                //     }
                // }
                readFile(path.resolve(__dirname, 'b.txt')).then(res => {
                    console.log(res)
                    // RawSource 这个方法会将数据处理成上面 size 和 source对象的格式
                    compilation.assets['b.txt'] = new RawSource(res)
                    // 这种方法也可以输出资源 和上面的方法一样
                    compilation.emitAsset('c.txt', new RawSource(res))
                    cb()
                })  
            })
        })
         
       
    }
}

 module.exports = Plugins2;