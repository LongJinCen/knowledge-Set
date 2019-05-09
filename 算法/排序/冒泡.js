// 时间复杂度为O(N^2) 可以做到稳定

/**
 * 
 * @param {*} arr 
 * 循环length次，每次都和后面比较交换，每一趟比较的序列的长度都会减一
 */

function bubbleSort(arr) {
    var temp = undefined,
        arr = arr.concat([])
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}