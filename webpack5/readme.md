# webpack 性能优化

# 开发性能优化

-   优化打包构建速度
-   source-map 配置

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

-   优化代码调试

# 生产环境性能优化

-   优化打包构建速度
-   优化代码运行速度

### 缓存优化

```
 1:babel缓存
    第二次打包构建速度更快
 2:文件资源缓存，给打包的文件名添加hash值，解决打包文件更新后浏览器继续使用缓存文件导致页面不是最新的问题
    让代码上线运行缓存更好使用
    三种hash值的作用：
    hash： 每次打包构建时都会改版hash值，js和css都会通用一个hash值
    问题:浏览器会重新请求所有的数据，这样浏览器缓存就失效了
    chunkhash：根据chunk生成hash值，如果打包文件来源于同一个chunk那么hash值也一样
    问题：js和css的hash值还是一样的，例如虽然只修改了js文件重新编译js和css的hash值也是一样都会发生变化
    contenthash：根据文件内容生成的hash值，不同的文件hash值一定不同

```

#### treeshaking 
> 去除无用代码
```
实现treeshaking的条件：
1：必须 使用es6模块化
2：webpack打包环境为 production
作用：减少代码打包体积

在package.json中需要配置
sideEffects: false  所有代码都没有副作用 都可以进行treeshaking 
可能会导致的问题：会把css /  @babel/polyfill垫片代码 都干掉
因此需要将不需要shaking的类型文件添加到配置中
sideEffects： ["*.less", "*.css"]


在webpack-dev-server 命令时，会出现以下报错
Cannot use [chunkhash] or [contenthash] for chunk in 'js/index.[contenthash:10].js' (use [hash] instead)
原因是webpack-dev-server下不能将js和css文件的hash缓存模式设置为contenthash或者是chunkhash，只能设置为hash模式
解决办法：按照打包环境区分打包配置 
production环境下一般需要contenthash这种缓存模式 解决单个文件修改所有 文件都不走缓存的问题，提高页面访问速度
development环境下：一般是本地开发使用，基本上都是通过webpack-dev-server启动本地服务读取内存打包的文件，所以将js(output=>filename)/css(minicssextractplugins=> filename)的缓存模式改为hash模式
```

#### 代码分隔            
```
1:在webpack.config.js中添加optimization属性
使用该属性下的splitChunk属性，该属性是一个对象
{
    minSize: 2000, 表示模块最小为2kb时开启压缩
    chunks: all , 同时分隔同步和异步代码
    automaticNameDelimiter:'_',//名称分隔符，默认是~
    CacheGroups: { // 对 需要单独打包的第三方库进行处理
         jquery: { // 将jquery抽出来
            name:'jquery',
            chunks: 'all',
            test: /jquery\.js/,
            enforce: true
         }

    }
}

使用过程中遇到问题：
1：因为配置了eslint语法检查的自动修复 ，所以打包过程中会出现报错，暂时想的解决办法是 区分环境打包，
development：做eslint语法检查修复，不做代码分隔
producton：不做eslint语法检查修复，做代码分隔
2：因为刚开始的打包模式production 所以打包出来的js做了代码压缩，js的名称不是配置的名称，改为development模式后打包出来的js名字就是配置的名字

2：多文件入口时，会把相同引用的第三方（node_modules）的库单独处理打包
```

### 多进程打包
```
1:使用thread-loader 进行多进程打包
2：适合大型项目，js代码较多时使用，小型项目不建议使用
3：使用方法和普通的loader想同，在module->rules->匹配js文件，使用方式如下
{
	test: /\.js$/,
	exclude: /node_modules/,
	enforce: 'pre', // 同一个匹配规则下优先执行的loader配置
	use: [
		{
			// 开启多进程打包
			// 进程启动时间大概为600ms，进程通信时间消耗，
			// 适合大项目打包时使用
			loader: 'thread-loader',
			options: {
				workers: 2
			}
		},
		<!-- 其他loader -->
		{
			
		},
		{
			loader: 'eslint-loader',
			options: {
				// 自动修复
				fix: true
			}
		}
	]
},
```