const fs  = require("fs");
const path  = require("path");
const babelParser  = require("@babel/parser");
const babelTraverse  = require("@babel/traverse").default;
const { transformFromAst }  = require("@babel/core");
const parser = {
    // 1：读取入口文件并且编译成ast抽象语法树
	getAst(filePath) {
		const file = fs.readFileSync(filePath, 'utf-8');
		// 2.将其解析成ast抽象语法树,产生对应的模块依赖
		const ast = babelParser.parse(file, {
			sourceType: 'module' // 解析文件模块方式 es module
		});
		return ast;
    },
    //  2：通过traverse 解析入口文件的ast抽象语法树 得到依赖添加到deps
	getDeps(ast, filePath) {
		// 获取到文件文件夹路径
		const dirname = path.dirname(filePath);
		// 定义存储依赖的容器
		const deps = {};
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
		});
		return deps;
    },
    // 3.编译代码
	getCode(ast) {
		const { code } = transformFromAst(ast, null, {
			presets: [ '@babel/preset-env' ]
		});
		return code;
	}
};
module.exports = parser;
