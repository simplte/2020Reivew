// 插件执行时会调用apply方法 complier
class Plugins1 {
    constructor() {}
    apply(complier) {
        complier.hooks.emit.tap('plugin1', (compilation) => {
            console.log('emit.tap 1')
        })
        complier.hooks.emit.tapAsync('plugin2', (compilation,cb) => {
            setTimeout(()=> {
                console.log('emit.tap tapAsync')
                cb(); // 执行完cb以后才会执行 之后的钩子函数 
            },1000)
        })
        complier.hooks.emit.tapPromise('plugin2', (compilation) => {
            return new Promise((resolve, reject) => {
                setTimeout(()=> {
                    console.log('emit.tap tapPromise')
                    resolve(); // 执行完resolve以后才会执行 之后的钩子函数 
                },1000)
            })
        })
        
        complier.hooks.afterEmit.tap('plugin3', (compilation) => {
            console.log('afterEmit.tap 3')
        })
        complier.hooks.done.tap('plugin4', (status) => {
            console.log('done.tap 4')
        })
       
    }
}

 module.exports = Plugins1;