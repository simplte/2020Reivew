/**
 * -o 是输出的意思
 * 开发环境 npx webpack ./src/index.js -o ./build/build.js --mode=development
 * 生成环境 npx webpack ./src/index.js -o ./build/build.js --mode=production
 */

import './css/index.css';
import './css/index.less';
import './assets/font.svg';
import print from './js/print';

class Indexs {
	constructor() {
		console.log(111);
	}
}
print();
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

// 在入口文件中增加js模块热更新;
if (module.hot) {
	// 方法会监听print.js的文件变化，一旦发生变化，其他js文件默认不会重新打包构建
	// 回执行后面的回调函数
	module.hot.accept('./js/print', () => {
		print();
	});
}
