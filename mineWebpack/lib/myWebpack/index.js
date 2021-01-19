const fs  = require("fs");
const babelParser  = require("@babel/parser");
function myWebpack(config) {

    return new Compiler(config)
}

class Compiler {
    constructor(options = {}) {
        this.options = options;
    }
    // 启动webpack打包
    run() {
        // 1.读取入口文件内容
        // 入口文件路径
        const filePath = this.options.entry;
        const file = fs.readFileSync(filePath, 'utf-8');
        // 2.将其解析成ast抽象语法树
        const ast = babelParser.parse(file, {
            sourceType: 'module' // 解析文件模块方式 es module
        })
        debugger
    }
}

module.exports = myWebpack;