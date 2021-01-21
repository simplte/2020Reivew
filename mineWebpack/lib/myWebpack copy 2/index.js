// webpack入口文件
const Compiler  = require("./Compiler");
function myWebpack(config) {
    return new Compiler(config)
}

module.exports = myWebpack;
