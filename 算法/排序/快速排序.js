/**
 * 
 * @param {*} arr 
 * @param {*} left 
 * @param {*} right 
 * 
 * 找基准数，是左边全部小于它，右边全部大于他，每次右指针先动，然后左边指针动
 */
function quickSort(arr, left, right) {
    var i, j, flag, temp 
    if (left > right) {
        return
    }
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
            temp = arr[j]
            arr[j] = arr[i]
            arr[i] = temp
        }
    }
    arr[left] = arr[i]
    arr[i] = flag
    quickSort(arr, left, i - 1)
    quickSort(arr, i + 1, right)
}