Function.prototype.apply = function (context, arr) {
    if (typeof this !== 'function') {
        throw new TypeError('类型错误')
    }
    context = context ? context : window
    let result = null
    context.fn = this
    if (arr) {
        result = context.fn(...arr)
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}