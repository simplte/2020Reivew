import _ from 'lodash'
import './style.css';
import Icon from './wx.png';
function component() {
    let el = document.createElement("div")
    el.innerHTML = _.join(['你好','webpack'],',')
    el.classList.add('test');
    var myIcon = new Image();
    myIcon.src = Icon;
    el.appendChild(myIcon);
    return el;
}
document.body.appendChild(component())