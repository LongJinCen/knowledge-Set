// 如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。
// 如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。我们使用Insert()方法读取数据流，
// 使用GetMedian()方法获取当前读取数据的中位数。

const minHeap = new MinHeap()
const maxHeap = new MaxHeap()
let number = 0

function Insert(num) {
    if (number % 2 === 0) {
        minHeap.offer(num)
        let min = minHeap.poll()
        maxHeap.offer(min)
    } else {
        maxHeap.offer(num)
        let max = maxHeap.poll()
        minHeap.offer(max)
    }
    number++
}
function GetMedian() {
    // write code here
    if (number % 2 === 0) {
        return +((minHeap.getRoot() + maxHeap.getRoot()) / 2).toFixed(1)
    } else {
        return maxHeap.getRoot()
    }
}

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