function Stack(size) {
    this.size = size
    this.stack = new Array(size)
    this.index = 0
}

Stack.prototype = {
    push: function (value) {
        if(this.index - 1 === this.size) {
            throw Error('栈已满')
        }
        this.stack[this.index] = value
        this.index += 1
    },
    pop: function () {
        if(this.index === 0) {
            throw Error('栈已空')
        }
        let temp = this.index
        this.index -= 1
        return this.stack[--temp]
    }
}