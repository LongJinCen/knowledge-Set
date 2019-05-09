/**
 * 
 * @param {原数组} arr 
 * @param {左边界} left 
 * @param {右边界} right 
 * 将数组分成两部分，左边的排好序，右边的排好序，每次都通过定义两个指针的外排形式，将左右两边排好序的数组进行合并，并将合并后的有序数组覆盖到原数组的指定位置
 */

 // 时间复杂度根据 master 公式得到 O(NlongN) 可以做到稳定
function merge(arr, left, right) {
    if(left === right) return
    let middle = Math.floor((left + right) / 2)
    merge(arr, left, middle)
    merge(arr, middle + 1, right)
    outerSort(arr, left, right)
}

function outerSort(arr, left, right) {
    let middle = Math.floor((left + right) / 2)
    let l = left,
        r = middle + 1,
        newArr = [];
    while(l <= middle && r <= right) {
        if(arr[l] >= arr[r]) {
            newArr.push(arr[r++])
        } else {
            newArr.push(arr[l++])
        }
    }
    while(r <= right) {
        newArr.push(arr[r++])
    }
    while(l <= middle) {
        newArr.push(arr[l++])
    }
    for(let i = left, j = 0; i <= right; i++, j++) {
        arr[i] = newArr[j]
    }
}

var arr = [1, 5, 3, 10, 3, 5, 3, 2]
merge(arr, 0, arr.length - 1)


// 归并排序的应用：小和问题和逆序对问题

// 小和问题: 在一个数组中，每一个数左边比当前数小的和相互加起来
function mergeSort(arr, l, r) {
    if(l === r) return
    let middle = (l + (r - l) >> 1)
    return mergeSort(arr, l, middle) +
            mergeSort(arr, middle + 1, r) +
            merge(arr, l, r)
}

function merge(arr, l, r) {
    let middle = (l + (r - l) >> 1)
    let p1 = l,
        p2 = middle + 1,
        newArr = [],
        result = 0;
    while(p1 <= middle && p2 <= r) {
        if(arr[p1] >= arr[p2]) {
            newArr.push(arr[p2++])
        } else {
            newArr.push(arr[p1])
            result += arr[p1] * (r - p2 + 1)
            p1++
        }
    }
    while(p1 <= middle) {
        newArr.push(arr[p1++])
    }
    while(p2 <= r) {
        newArr.push(arr[p2++])
    }
    for(let i = l, j =0; i <= r; i ++, j++) {
        arr[i] = newArr[j]
    }
    return result
}