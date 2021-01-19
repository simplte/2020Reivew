const myWebpack  = require("../lib/myWebpack");
const config  = require("../config/webpack.config.js");
const compiler = myWebpack(config);

// 开始打包
compiler.run();