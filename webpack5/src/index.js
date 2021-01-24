/**
 * -o 是输出的意思
 * 开发环境 npx webpack ./src/index.js -o ./build/build.js --mode=development
 * 生成环境 npx webpack ./src/index.js -o ./build/build.js --mode=production
 */
import './index.css';
import './index.less';
class indexs {
	constructor() {
		console.log(111);
	}
}
let i = new indexs();
