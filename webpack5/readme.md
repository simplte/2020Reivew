# webpack 性能优化
# 开发性能优化 
* 优化打包构建速度

```
 HMR 热模块替换
 作用：一个模块发生变化，只会重新打包这一个模块，而不是重新打包所有的模块
 样式文件：没有问题， style-loader MiniCssExtractPlugin.loader 内容部实现了
 js文件：默认不能使用hmr
    解决：
 html文件：默认不能使用hmr 
    解决：修改entry入口，将index.html文件加入到入口文件配置中,可以实现html文件修改页面更新，不过还不是热模块替换，修改html页面文件会刷新页面 （spa应用不用做html的hmr）
 
```
   
* 优化代码调试

# 生产环境性能优化
* 优化打包构建速度
* 优化代码运行速度