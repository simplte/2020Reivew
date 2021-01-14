module.exports = function(content, map, meta) {
    console.log(content);
    // 同步loader
    // 第一个参数是错误信息提示，第二个参数是处理后的内容，第三个和第四是可选参数基本上不传
    // this.callback(null, content, map, meta)
// -------------------------------------------------------
    // 异步loader 更推荐使用
    const callback = this.async();  // 会等待后面异步执行完调用callback才会执行
    setTimeout(() => {
        callback(null, content)
    },4000)
}