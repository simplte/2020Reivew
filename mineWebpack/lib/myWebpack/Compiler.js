const {getAst,getCode,getDeps}  = require("./parser");
class Compiler {
    constructor(options = {}) {
        this.options = options;
    }
    // 启动webpack打包
    run() {
        // 1.读取入口文件内容
        // 入口文件路径
        const filePath = this.options.entry;
        const ast = getAst(filePath);
        const deps = getDeps(ast,filePath);
        const code = getCode(ast)
        console.log(ast)
        console.log(deps)
        console.log(code)
    }
}

module.exports = Compiler;
/**
 * 总共三步：
 * 1：读取入口文件并且编译成ast抽象语法树
 * 2：通过traverse 解析入口文件的ast抽象语法树 得到依赖添加到deps
 * 3：编译代码，因为我们模块中写的语法浏览器不识别，所以通过babel/core 中的transformFromAst
 *     通过预设为@babel/preset-env 将我们模块中的代码编译成浏览器识别的代码
 */