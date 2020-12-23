import _ from 'lodash'
import './style.css';
import Icon from './wx.png';
import printMe from './print'
function component() {
    let el = document.createElement("div")
    let btn = document.createElement('button')
    el.innerHTML = _.join(['你好','webpack1'],',')
    el.classList.add('test');
    var myIcon = new Image();
    myIcon.src = Icon;
    el.appendChild(myIcon);
    btn.innerHTML= "点击"
    btn.onclick = printMe
    el.appendChild(btn)
    return el;
}
// 依赖模块发生改变了以后执行,如果print模块发生更新了 则会执行
if(module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('热更新了1');
        printMe()
    })
}
document.body.appendChild(component())