function FixedParamsCurry(fn) {
    // 拿到传进来的需要记住的参数
    var _args = Array.prototype.slice.call(arguments, 1)
    // 返回一个新的 fn, 下次调用的时候
    return function () {
        var newArgs = _args.concat(Array.prototype.slice.call(arguments, 0))
        return fn.apply(this, newArgs)
    }
}

/**
 * 
 * @param {function} fn 第一次调用 Curry 返回的 function 的时候，如果参数的长度比 fn 需要的长度大或者相等，
 * 那么直接走 else，所以调用的 fn 就是我们定义的那个 fn，否者调用的是经过 FixedParamsCurry 包装过的 fn。
 * @param {*} length 表示还需要多少个参数才能达到原始 fn 需要的参数的长度。
 */
function Curry(fn, length) {
    var argLength = length || fn.length
    return function () {
        if (arguments.length < argLength) {
            var combined = [fn].concat([].slice.call(arguments, 0)) // 将新穿进来的参数存储到 fn 中
            // 如果参数不够，那么返回一个函数，并且将 fn 包装， Curry 的 length 更新
            return Curry(FixedParamsCurry.apply(this, combined), argLength - arguments.length)
        } else {
            return fn.apply(this, arguments)
        }
    }
}

function add(a, b, c, d) {
    return a + b + c + d
}

var newAdd = Curry(add)
var result1 = newAdd(1)(2)(3)(4)
var result2 = newAdd(2,2)(2,3)
var newAdd1 = newAdd(1);
var result3 = newAdd1(2,3,4)