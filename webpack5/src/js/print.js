// import testHMRA from './testA';
// import testHMRB from './testB';

// console.log('print文件被加载了1');
// function print() {
// 	const content = '这是print内容1';
// 	console.log(content);
// 	testHMRA();
// 	testHMRB();
// 	// console.error('123');
// 	// 对testB模块做模块热更新处理;
// 	if (module.hot) {
// 		module.hot.accept('./testB', () => {
// 			testHMRB();
// 		});
// 	}
// }
// export default print;
var removeDuplicates = function(nums) {
	console.log(Array.isArray(nums));
	return [ ...new Set(nums) ];
};
console.log(removeDuplicates([ 1, 2, 4, 1 ]));
