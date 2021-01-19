const { validate } = require('schema-utils');
const schema = require('./copySchema.json');
const path = require('path');
const util = require('util');
const fs = require('fs');
const globby = require('globby'); //匹配文件列表用的包
const readFile = util.promisify(fs.readFile);
const webpack  = require("webpack");

const { RawSource} = webpack.sources
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
				console.log(from);
				const to = this.options.to ? this.options.to : '.';
				// 1：读取from中的资源

				// 将输入路径变成绝对路径
				// context就是webpack中配置的context   其实=process.cwd()
				const context = compiler.options.context;
				console.log(path.resolve(context, from));
				const absoluteFrom = path.isAbsolute(from) ? from : path.resolve(context, from);
				// globby的参数 1：要处理的文件夹的绝对路径 2：options
				// 处理时发现并不需要将from文件夹地址处理成绝对地址  只需要传from进去就ok了，、
				// 同时ignore 中想要忽略某些文件 需要 加入**/通配符  表示任何文件夹下的某个文件
				// 2：过滤ignore的文件
				const paths = await globby(from, { ignore });
				const files = await Promise.all(
					paths.map(async (absoultePath) => {
						const data = await readFile(absoultePath);
						// 取到文件基础路径也就是文件名
						const relativePath = path.basename(absoultePath)
						// 处理目标路径
						// to = .  时 filename为 index.css
						// to = css 时 filename为 css/index.css
						const filename = path.join(to, relativePath)
						return {
							// 文件数据
							data,
							// 文件名称
							filename
						}
					})
				);

				// 3：生产webpack格式的资源
				const assets = files.map((file) => {
					const source= new RawSource(file.data);
					return {
						source,
						filename:file.filename
					}
				})
				// 4：添加到compilation中，输出出去
				assets.forEach(x => {
					compilation.emitAsset(x.filename, x.source) 
				})
				// 调用cb 结束插件
				cb()
			});
		});
	}
}
module.exports = CopyPlugin;
