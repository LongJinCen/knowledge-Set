Function.prototype.call = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('类型错误')
    }
    const args = Array.prototype.slice.call(arguments, 1)
    context = context ? context : window
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}