/**
 * 
 * @param {原数组} arr 
 * @param {给定的值} num 
 * 给定一个值，要求数组左边的值全部小于 num ，数组右边的值全部大于 num ,中间的值全部等于 num
 * 定义三个区域
 */

// 时间复杂度为O(N) 做不到稳定
function partition(arr, num) {
    let less = -1,
        more = arr.length,
        cur = 0;
    while(cur < more) {
        if(arr[cur] < num) {
            swap(arr, ++less, cur++)
        } else if(arr[cur] > num) {
            swap(arr, --more, cur)
        } else {
            cur++
        }
    }
}

function swap(arr, index1, index2) {
    let temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
}

var arr = [423,5435, 45, 666, 1, 10, 10, 10, 5, 5, 0, -1]
partition(arr, 10)
console.log(arr)