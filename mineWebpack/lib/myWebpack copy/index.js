const fs  = require("fs");
const path  = require("path");
const babelParser  = require("@babel/parser");
const babelTraverse  = require("@babel/traverse").default;
const { transformFromAst }  = require("@babel/core");
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
        // 2.将其解析成ast抽象语法树,产生对应的模块依赖
        const ast = babelParser.parse(file, {
            sourceType: 'module' // 解析文件模块方式 es module
        })
        // 获取到文件文件夹路径
        const dirname = path.dirname(filePath);
        // 定义存储依赖的容器
        const deps = {}
        // 3.收集依赖
        babelTraverse(ast, {
            // 内部遍历ast抽象语法树 中的 program.body 判断里面语句类型
            // 如果type:ImportDeclaration 就会触发当前函数
            ImportDeclaration(code) {
                // console.log(code)
                // 收集其实就是 node字段下source下的value的值 一个路径 可以打断点去看
                // 文件的相对路径获取
                const relativePath = code.node.source.value;
                // 生成基于入口文件的绝对路径
                const absolutePath = path.resolve(dirname, relativePath);
                // 添加依赖
                deps[relativePath] = absolutePath;
            }
        })

        // 编译代码：es6代码处理 
        // transformFromAst接受两个参数 一个是需要变异的ast语法树 一个是预设配置
        const { code } = transformFromAst(ast, null,{
            presets: ['@babel/preset-env']
        })
        // 编译后的代码
        console.log(code)
    }
}

module.exports = myWebpack;
/**
 * 总共三步：
 * 1：读取入口文件并且编译成ast抽象语法树
 * 2：通过traverse 解析入口文件的ast抽象语法树 得到依赖添加到deps
 * 3：编译代码，因为我们模块中写的语法浏览器不识别，所以通过babel/core 中的transformFromAst
 *     通过预设为@babel/preset-env 将我们模块中的代码编译成浏览器识别的代码
 */