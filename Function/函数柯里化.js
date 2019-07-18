function FixedParamsCurry(fn) {
    var _args = Array.prototype.slice.call(arguments, 1)
    return function () {
        var newArgs = _args.concat(Array.prototype.slice.call(arguments, 0))
        return fn.apply(this, newArgs)
    }
}
function add(a, b, c, d) {
    return a + b + c + d
}
function Curry(fn, length) {
    var argLength = length || fn.length
    return function () {
        if (arguments.length < argLength) {
            var combined = [fn].concat([].slice.call(arguments, 0))
            return Curry(FixedParamsCurry.apply(this, combined), argLength - arguments.length)
        } else {
            return fn.apply(this, arguments)
        }
    }
}
var newAdd = Curry(add)
var result1 = newAdd(1)(2)(3)(4)
var result2 = newAdd(2,2)(2,3)
var newAdd1 = newAdd(1); var result3 = newAdd1(2,3,4)
--------------------- 
作者：EDB 
来源：CSDN 
原文：https://blog.csdn.net/Her_smile/article/details/89642954 
版权声明：本文为博主原创文章，转载请附上博文链接！