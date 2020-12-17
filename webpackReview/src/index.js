import _ from 'lodash'
import './style.css';
function component() {
    let el = document.createElement("div")
    el.innerHTML = _.join(['你好','webpack'],',')
    return el;
}
document.body.appendChild(component())