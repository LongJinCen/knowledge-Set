Function.prototype.bind = function (othis) {
    if(!typeof this === 'function') {
        throw new TypeError('Function.prototype.bind - what trying to be bound is not callable')
    }
    var args = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fBound = function () {
            return fToBind.apply(
                this instanceof fBound ? this : othis,
                args.concat(Array.prototype.slice.call(arguments))
            )
        }
    
    if(this.prototype) {
        fBound.prototype = Object.create(this.prototype)
    }
    return fBound
}

function bind(context) {
    const slice = Array.prototype.slice
    const args = slice.call(arguments, 1)
    const fn = this
    if(typeof fn !== 'function') {
        throw new Error('类型错误')
    }
    function middlefn() {
        const args1 = slice.call(arguments, 0)
        const totalArgs = [...args, ...args1]
        if(this instanceof middlefn) {
            return fn.apply(this, totalArgs)
        } else {
            return fn.apply(context, totalArgs)
        }
    }
    if(this.prototype) {
        middlefn.prototype = Object.create(this.prototype)
    }
    return middlefn
}