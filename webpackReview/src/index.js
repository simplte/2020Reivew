import _ from 'lodash'



function component() {
    var el = document.createElement("div")
    var btn = document.createElement('button')
    var br = document.createElement('br');
    el.innerHTML = _.join(['你好','webpack1'],',')
    el.classList.add('test');
    var myIcon = new Image();
    myIcon.src = Icon;
    el.appendChild(myIcon);
    el.appendChild(br);
    btn.innerHTML= "点击"
    btn.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
     var print = module.default;

     print();
   });
    el.appendChild(btn)

    console.log(`当前的计算值：${cube(4)}`)
    return el;
}
// 依赖模块发生改变了以后执行,如果print模块发生更新了 则会执行
if(module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('热更新了1');
        printMe()
    })
}
const bqc = 1;
document.body.appendChild(component())
export default bqc;
