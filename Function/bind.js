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