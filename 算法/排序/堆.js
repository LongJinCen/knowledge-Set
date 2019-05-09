// 建立堆 时间复杂度为 O(N) 做不到稳定

/**
 * 堆分为大根堆和小根堆，排序的思路是从将形成后的堆的头部和尾部交换，然后大小减一，不断重复前面交换的过程，知道堆的大小为1
 */
/**
 * 从尾部插入节点
 * @param {*} arr 原数组
 * @param {*} index 待插入的节点
 */
function heapInsert(arr, index) {
    if(index === 0) return
    while(arr[index] > arr[Math.floor((index - 1) / 2)]) {
        swap(arr, index, Math.floor((index - 1) / 2))
        index = Math.floor((index - 1) / 2)
        if(index === 0) break
    }
}

/**
 * 从顶部往下沉
 * @param {*} arr 原数组
 * @param {*} index 顶部的位置
 * @param {*} headSize 目前已经形成的堆的大小
 */
function heapify(arr, index, headSize) {
    let left = index * 2 + 1
    while(left < headSize) {
        let largest = (left + 1 < headSize) && (arr[left] < arr[left + 1]) ? left + 1 : left
        largest = arr[index] > arr[largest] ? index : largest
        if(largest === index) break
        swap(arr, index, largest)
        index = largest
        left = largest * 2 + 1
    }
}

function swap(arr, index1, index2) {
    let temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
}

function heapSort(arr) {
    for (let index = 0; index < arr.length; index++) {
        heapInsert(arr, index)
    }
    let headSize = arr.length
    swap(arr, 0, --headSize)
    while(headSize > 0) {
        heapify(arr, 0, headSize)
        swap(arr, 0, --headSize)
    }
}

var arr = [6, 5, 4, 2, 1].reverse()
heapSort(arr)
console.log(arr)