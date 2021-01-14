// 获取使用loader穿过来的  options
const { getOptions }  = require("loader-utils");
const { validate }  = require("schema-utils");
const schema  = require("./schema.json");
module.exports = function(content, map, meta) {
    // 获取options
    const options = getOptions(this);
    console.log('222', options);
    // 校验options是否合法
    validate(schema, options, {
        name: 'loader-options'
    })
    return content;
}