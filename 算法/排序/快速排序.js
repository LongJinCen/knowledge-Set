/**
 * 
 * @param {*} arr 
 * @param {*} left 
 * @param {*} right 
 * 经典快拍，最差情况为O(n^2),应使用随机快排
 * 找基准数，是左边全部小于它，右边全部大于他，每次右指针先动，然后左边指针动
 */

// 时间复杂度根据 master 公式为 N(longN)
function quickSort(arr, left, right) {
    let i, j, flag
    if (left > right) {
        return
    }
    let radom = left + Math.floor(Math.random() * (right - left + 1))
    swap(arr, left, radom)
    flag = arr[left]
    i = left
    j = right
    while(i != j) {
        while(arr[j] >= flag && i < j) {
            j--
        }

        while(arr[i] <= flag && i < j) {
            i++
        }

        if (i < j) {
            swap(arr, i, j)
        }
    }
    arr[left] = arr[i]
    arr[i] = flag
    quickSort(arr, left, i - 1)
    quickSort(arr, i + 1, right)
}

function swap(arr, index1, index2) {
    let temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
}
var arr = [423,5435, 45, 666, 1, 10, 10, 10, 5, 5, 0, -1]

quickSort(arr, 0, arr.length - 1)
console.log(arr)

// 使用 荷兰国旗问题来改进经典快排, 排序时中间相等的序列不需要再分，同时加入随机标志位

function quickSort(arr, left, right) {
    if(left > right) return
    let result = partition(arr, left, right)
    quickSort(arr, left, result.right)
    quickSort(arr, result.left, right)
}

function partition(arr, l, r) {
    let less = l - 1,
        more = r + 1,
        cur = l;
    let radom = l + Math.floor(Math.random() * (r - l + 1))
    swap(arr, r, radom)
    let flag = arr[r];
    while(cur < more) {
        if(arr[cur] < flag) {
            swap(arr, ++less, cur++)
        } else if(arr[cur] > flag) {
            swap(arr, cur, --more)
        } else {
            cur++
        }
    }
    return {
        right: less,
        left: more
    }
}

function swap(arr, index1, index2) {
    let temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
}
