//需要装 @babel/core  @babel/preset-env 两个插件来处理js

// 获取使用loader穿过来的  options
const { getOptions }  = require("loader-utils");
const { validate }  = require("schema-utils");
const babel = require("@babel/core");
const util  = require("util");
const babelSchema  = require("./babelSchema.json");


// babel.transform用来编译代码的方法
// 是一个普通的异步方法
// util.promisify 可以将普通的异步方法转换成基于promise的异步方法
const transform  = util.promisify(babel.transform);

module.exports = function(content, map, meta) {
    // 获取options
    const options = getOptions(this) || {};
    console.log('babelloader', options);
    // 校验options是否合法
    validate(babelSchema, options, {
        name: '提示：babelLoader'
    })

    const callback = this.async();

    // 使用babel编译代码
    transform(content, options).then(({code, map}) => {
        callback(null, code, map)
    }).catch((e) => callback(e))
}