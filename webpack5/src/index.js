/**
 * -o 是输出的意思
 * 开发环境 npx webpack ./src/index.js -o ./build/build.js --mode=development
 * 生成环境 npx webpack ./src/index.js -o ./build/build.js --mode=production
 */

import './index.css';
import './index.less';
import './font.svg';

class Indexs {
	constructor() {
		console.log(111);
	}
}

console.log(222);
const i = new Indexs();
const a = 1;
const promiseFun = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('时间到了');
	}, 100);
});
promiseFun.then((res) => {
	console.log(res);
});
