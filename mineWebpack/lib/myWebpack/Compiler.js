const { getAst, getCode, getDeps }  = require("./parser");
const fs  = require("fs");
const path  = require("path");
class Compiler {
    constructor(options = {}) {
        // webpack配置文件内容
        this.options = options;
        // 所有依赖的容器
        this.modules = []
    }
    // 启动webpack打包
    run() {
        // 1.读取入口文件内容
        // 入口文件路径
        const filePath = this.options.entry;
        // 第一次处理入口文件的信息
        const fileInfo = this.build(filePath);
        this.modules.push(fileInfo);

        // 收集依赖  modules 中前几个对象依赖会很多，最后会越来越少直到没有
        this.modules.forEach((fileInfo) => {
            /* {
                './add.js': 'G:\\项目\\mine\\2020年复习\\mineWebpack\\src\\add.js',
                './count.js': 'G:\\项目\\mine\\2020年复习\\mineWebpack\\src\\count.js'
            } */
            // 取出当前文件的依赖
            const deps = fileInfo.deps;
            // 遍历
            for(let relativePath in deps) {
                // 依赖文件的绝对路径
                const absolutePath = deps[relativePath];
                // 对依赖文件进行处理
                const fileInfo = this.build(absolutePath);
                // 将处理的结果添加到modules中，后面遍历就会遍历处理他了
                this.modules.push(fileInfo);
            }
        })

        // console.log(this.modules)

        // 将依赖整理成更好的依赖关系图
        // {
        //     'index.js': {
        //         code: '...',
        //         deps: {'add.js', 'count.js'}
        //     },
        //     'add.js': {
        //         code: '...',
        //         deps: {}
        //     }
        // }
        const depsGraph = this.modules.reduce((graph, module) => {
            return {
                ...graph, // 将上次处理好的对象返回，进行重新整合，对象中的key每一次处理增加一次
                [module.filePath]: {
                    code: module.code,
                    deps: module.deps
                }
            }

        }, {})
        // console.log(depsGraph)
        this.generate(depsGraph);
    }
    // 开始构建
    build(filePath) {
         // 将入口文件解析成ast抽象语法树
         const ast = getAst(filePath);
         // 根据入口文件的ast抽象语法树收集相关模块依赖
         const deps = getDeps(ast, filePath);
         // 解析各个模块代码编译成es5的语法
         const code = getCode(ast)
         return {
             filePath,
            //  当前文件的所有依赖
             deps,
            //  当前文件解析后的代码
             code
         }
    }

    // 生成输出资源
    // 入口文件index.js的code
    /*
    "use strict";\n' +
      '\n' +
      'var _add = _interopRequireDefault(require("./add.js"));\n' +
      '\n' +
      'var _count = _interopRequireDefault(require("./count.js"));\n' +
      '\n' +
      'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
      '\n' +
      'console.log((0, _add["default"])(1, 2));\n' +
      'console.log((0, _count["default"])(3, 1));
    */
    generate(depsGraph) {
        const bundle = `
            (function(depsGraph){
                function require(module) {
                    function localRequire(relativePath) {
                        return require(depsGraph[module].deps[relativePath])
                    }
                    // 定义暴露对象
                    var exports = {};
                    (function(require, exports, code) {
                        eval(code);
                    })(localRequire, exports, depsGraph[moudel].code)

                    return exports;
                }
                require(${this.options.entry})
            })(${JSON.stringify(depsGraph)})
        `
        console.log(bundle);
        const filePath = path.resolve(this.options.output.path, this.options.output.filename);
        fs.writeFileSync(filePath, bundle, 'utf-8')
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