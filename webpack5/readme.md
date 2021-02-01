# webpack 性能优化
# 开发性能优化 
* 优化打包构建速度
* source-map配置

```
 HMR 热模块替换
 作用：一个模块发生变化，只会重新打包这一个模块，而不是重新打包所有的模块
 样式文件：没有问题， style-loader MiniCssExtractPlugin.loader 内容部实现了
 js文件：默认不能使用hmr
    解决：
 html文件：默认不能使用hmr 
    解决：修改entry入口，将index.html文件加入到入口文件配置中,可以实现html文件修改页面更新，不过还不是热模块替换，修改html页面文件会刷新页面 （spa应用不用做html的hmr）
    
 ---------
 source-map: 源码和构建后代码的映射技术，如果构建后的代码出错了，可以通过映射追踪代码错误的地方
 [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
 source-map   外联  错误代码准确信息和源代码的错误位置
 inline-source-map 内联 错误代码准确信息和源代码的错误位置 
 hidden-source-map 外联  错误代码准确信息没有错误位置，不能追踪代码错误 隐藏源码的方式
 eval-source-map 内联 错误代码准确信息和源代码的错误位置
 nosources-source-map 外联  错误代码准确信息没有错误位置，不能追踪代码错误 隐藏源码的方式
 cheap-source-map 外联 错误代码准确信息准确到行， 
 cheap-module-source-map 外联 错误代码准确信息准确到哪个位置，

内联和外联的区别：1：外联会生成sourcemap文件，内联不会生成直接会输出在js文件中，            
                 2：内联的构建速度更快


开发环境：速度库快，调试更友好
    速度快： eval> inline> cheap>
        eval-cheap-souce-map
        eval-source-map
    调试更友好：
        source-map
        cheap-module-source-map
        cheap-source-map

    -->eval-source-map

生产环境： 源代码需不需要隐藏，调试要不要更友好
    源代码需要隐藏：
    nosources-source-map 全部隐藏
    hidden-source-map  只隐藏构建后的代码，会提示构建后代码错误信息
    更好的调试：
    source-map/ cheap-module-source-map
```
   
* 优化代码调试

# 生产环境性能优化
* 优化打包构建速度
* 优化代码运行速度