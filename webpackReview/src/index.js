import _ from 'lodash'
import Icon from './wx.png';
import printMe from './print'
import {cube} from './math'
import './style.less';


function component() {
    var el = document.createElement("div")
    var btn = document.createElement('button')
    el.innerHTML = _.join(['你好','webpack1'],',')
    el.classList.add('test');
    var myIcon = new Image();
    myIcon.src = Icon;
    el.appendChild(myIcon);
    btn.innerHTML= "点击"
    btn.onclick = printMe
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
