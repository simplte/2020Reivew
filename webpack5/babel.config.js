module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				// 按需加载垫片
				useBuiltIns: 'usage',
				// 指定corejs的版本
				corejs: {
					version: 3
				},
				// 具体兼容到哪个环境浏览器版本
				targets: {
					ie: '8'
				}
			}
		]
	]
};
