function Queue(size) {
    this.size = size
    this.queue = new Array(size)
    this.start = 0
    this.end = 0
    this.currentSize = 0
}

Queue.prototype = {
    push: function (value) {
        if(this.currentSize === this.size) {
            throw new Error('队列已满')
        }
        this.queue[this.end] = value
        this.end = this.end === this.size - 1 ? 0 : this.end + 1
        this.currentSize += 1
    },
    pop: function() {
        if(this.currentSize === 0) {
            throw new Error('队列已空')
        }
        let temp = this.start
        this.start = this.start === this.size - 1 ? 0 : this.start + 1
        this.currentSize -= 1
        return this.queue[temp]
    }
}