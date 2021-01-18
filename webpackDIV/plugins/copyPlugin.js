const { validate } = require('schema-utils');
const schema = require('./copySchema.json');
const path = require('path');
const util = require('util');
const fs = require('fs');
const globby = require('globby'); //匹配文件列表用的包

class CopyPlugin {
	constructor(options = {}) {
		validate(schema, options, {
			name: 'copywebpackplugin'
		});
		this.options = options;
	}
	apply(compiler) {
		// 初始化compilation
		compiler.hooks.thisCompilation.tap('copywebpackplugin', (compilation) => {
			compilation.hooks.additionalAssets.tapAsync('copywebpackplugin', async (cb) => {
				// 将from中的资源复制到to中，输出出去
                const { from, ignore } = this.options;
                console.log(from)
				const to = this.options.to ? this.options.to : '.';
				// 1：读取from中的资源

				// 将输入路径变成绝对路径
				// context就是webpack中配置的context   其实=process.cwd()
                const context = compiler.options.context;
                console.log(path.resolve(context, from))
				const absoluteFrom = path.isAbsolute(from) ? from : path.resolve(context, from);
				// globby的参数 1：要处理的文件夹的绝对路径 2：options
				const paths = await globby(absoluteFrom, { ignore });
				console.log(paths);
				// 2：过滤ignore的文件
				// 3：生产webpack格式的资源
				// 4：添加到compilation中，输出出去
			});
		});
	}
}
module.exports = CopyPlugin;
