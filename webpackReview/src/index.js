import _ from 'lodash'
import './style.css';
import Icon from './wx.png';
import printMe from './print'
function component() {
    let el = document.createElement("div")
    let btn = document.createElement('button')
    el.innerHTML = _.join(['你好','webpack'],',')
    el.classList.add('test');
    var myIcon = new Image();
    myIcon.src = Icon;
    el.appendChild(myIcon);
    btn.innerHTML= "点击"
    btn.onclick = printMe
    el.appendChild(btn)
    return el;
}
document.body.appendChild(component())