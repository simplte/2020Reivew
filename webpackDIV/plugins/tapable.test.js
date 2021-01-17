 const {SyncHook, SyncBailHook, AsyncParallelHook,AsyncSeriesHook}  = require("tapable");

 class Lesson {
     constructor() {
        //  初始化hooks
        this.hooks = {
            // 同步钩子

            // 接收一个数组形参
            // go: new SyncHook(["address","dd"]),
            // 这种SyncBailHook hooks如果遇到 返回值则不继续往下执行
            go: new SyncBailHook(['address']),

            // 异步钩子
            // AsyncParallelHook 异步并行执行的 
            leave: new AsyncParallelHook(['name','age']),
            // AsyncSeriesHook : 异步穿行执行
            // leave: new AsyncSeriesHook(['name','age']),

        }
     }
     //  往hooks容器中注册一些事件/添加回调函数
     tap() {
        //  同步钩子触发
        this.hooks.go.tap('bqc' , (address, count) => {
            console.log('bqc', address,count);
            return 111;
        })
        this.hooks.go.tap('wq', (address,count)=> {
            console.log('wq',address,count)
        })


        // 触发异步钩子可以使用tap，不过没有回调方法参数，回调方法会在当前钩子方法执行后立即执行
        
        // this.hooks.leave.tap('qc', (name,age,cb) => {
        //     console.log('qc', name, age)
        // })
        //  使用tapAsync触发异步容器钩子中的方法 ，有回调方法, 并且是调用后才会执行的
        // this.hooks.leave.tapAsync('qq', (name,age,cb) => {
        //     setTimeout(()=> {
        //         console.log('qq', name ,age )
        //         cb && cb("tapAsync")
        //     },1000)
        // })
        // 必须返回一个promise实例，调用reslove会执行回调方法，不过验证下来不能传参
        this.hooks.leave.tapPromise('qq', (name,age) => {
            return new Promise((resolve) => {
                setTimeout(()=> {
                    console.log('qq', name ,age )
                    resolve('tapPromise')
                },1000)
            })
        })
     }
     start() {
        //  同步触发钩子
        //  this.hooks.go.call('荷韵新村',1);


        //  异步钩子触发
        this.hooks.leave.callAsync('卜前程', "26" ,(tapPromise) => {
            // 异步回调函数是在当前leave钩子容器中所有的钩子函数执行完了以后执行的
            console.log("有了属于我们自己的一套房子", tapPromise)
        })
     }
 }

 const l = new Lesson();
 l.tap();
 l.start()