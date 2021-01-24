# Webpack 执行流程

```
1：初始化 Compiler ： new Webpack(config) 得到 Compiler对象
2：开始编译：调用Compiler 对象 run 方法 开始执行编译
3：确定入口： 根据配置中的 entry 找出所有的入口文件
4：编译模块：从入口文件出发，调用所有配置的loader 对模块进行编译， 再找出该模块依赖的模块，递归直到所有模块被加载进来
5：完成模块编译：在经过第4步 使用loader编译完所有模块后，得到了每个模块被编译后的最终内容以及他们之间的依赖关系
6：输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk ，再把每个Chunk 转换成一个单独的文件加入到输出列表。（注意：这步是可以修改输出内容的最后机会）
7：输出完成：在确定好输出内容后，根据确定输出的路径和文件名，把文件内容写入到文件系统中
```

## compiler方法三步走

```
/**
 * 三步走：
 * 1：根据webpack.config中配置的入口文件地址，获取入口文件信息
 *      （入口文件信息为：1：通过 @babel/traverse 获取到的入口文件的依赖，2：通过@babel/core 和 @babel/preset-env 编译的入口文件的代码）
 * 
 * 2：根据入口文件信息收集依赖生成 依赖关系图谱 modules 进一步已优化关系图谱数据结构得到 depsGraph
 * 
 * 3：根据生成的关系图谱depsGraph 生成最终打包的资源
 *     以入口文件开始，定义generate方法中的build方法 
 *     build目的是为了让  使用@babel/core 和 @babel/preset-env的生成的code代码正常执行   所以build方法是根据生成code的代码如何执行来编写的
 *     保证最终所有的依赖模块都能正常加载执行
 *      
 * 4：输出最后生成的bundle，通过fs模块生成对应的文件
 */
```

### 用到的插件

```
1：@babel/parser 将js文件编译成ast抽象语法树
2：@babel/traverse 内部遍历ast抽象语法树 中的 program.body 判断里面语句类型
3：transformFromAst 将ast抽象语法树进行编译
4：@babel/preset-env 编译js代码为es5的代码
```