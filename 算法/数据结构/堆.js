function MinHeap() {
    this.heap = []
}

MinHeap.prototype.offer = function (num) {
    const heap = this.heap
    heap.push(num)
    let index = heap.length - 1,
        parent = Math.floor((index - 1) / 2),
        parentValue,
        curValue
    while (parent >= 0) {
        curValue = heap[index]
        parentValue = heap[parent]
        if (parentValue > curValue) {
            swap(heap, index, parent)
        } else {
            break
        }
        index = parent
        parent = Math.floor((parent - 1) / 2)
    }
}
MinHeap.prototype.getHeap = function () {
    return this.heap
}
MinHeap.prototype.poll = function () {
    const heap = this.heap
    swap(heap, 0, heap.length - 1)
    let pollValue = heap.pop()
    let curIndex = 0,
        size = heap.length - 1,
        leftIndex = curIndex * 2 + 1,
        rightIndex = curIndex * 2 + 2,
        realIndex
    while (leftIndex <= size) {
        realIndex = rightIndex <= size ? heap[leftIndex] < heap[rightIndex] ? leftIndex : rightIndex : leftIndex
        if (heap[curIndex] > heap[realIndex]) {
            swap(heap, curIndex, realIndex)
        } else {
            break
        }
        curIndex = realIndex
        leftIndex = curIndex * 2 + 1
        rightIndex = curIndex * 2 + 2
    }
    return pollValue
}
MinHeap.prototype.getRoot = function () {
    return this.heap[0]
}

function MaxHeap() {
    this.heap = []
}

MaxHeap.prototype.offer = function (num) {
    const heap = this.heap
    heap.push(num)
    let index = heap.length - 1,
        parent = Math.floor((index - 1) / 2),
        parentValue,
        curValue
    while (parent >= 0) {
        curValue = heap[index]
        parentValue = heap[parent]
        if (parentValue < curValue) {
            swap(heap, index, parent)
        } else {
            break
        }
        index = parent
        parent = Math.floor((parent - 1) / 2)
    }
}
MaxHeap.prototype.getHeap = function () {
    return this.heap
}
MaxHeap.prototype.poll = function () {
    const heap = this.heap
    swap(heap, 0, heap.length - 1)
    let pollValue = heap.pop()
    let curIndex = 0,
        size = heap.length - 1,
        leftIndex = curIndex * 2 + 1,
        rightIndex = curIndex * 2 + 2,
        realIndex
    while (leftIndex <= size) {
        realIndex = rightIndex <= size ? heap[leftIndex] > heap[rightIndex] ? leftIndex : rightIndex : leftIndex
        if (heap[curIndex] < heap[realIndex]) {
            swap(heap, curIndex, realIndex)
        } else {
            break
        }
        curIndex = realIndex
        leftIndex = curIndex * 2 + 1
        rightIndex = curIndex * 2 + 2
    }
    return pollValue
}

MaxHeap.prototype.getRoot = function () {
    return this.heap[0]
}

function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}