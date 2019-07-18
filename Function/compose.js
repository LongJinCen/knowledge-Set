// 组合函数

function compose() {
	var args = [].slice.call(argument,0)
	return function (x) { // 从右向左执行函数
		return args.reduceRight((result, cb) => {
			return cb(result)
		}, x)
	}
}
function a (x) { return x + 'a' }
function b (x) { return x + '!'}
function c (x) { return x.split('')}
var f = compose(a, b, c)
f('a')