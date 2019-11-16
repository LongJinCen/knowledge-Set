function binarySearch(arr, aim) {
    let left = 0,
        right = arr.length - 1,
        middle = Math.floor((left + right) / 2)
    while (left <= right) {
        if (arr[middle] < aim) {
            left = middle + 1
        } else if (arr[middle] > aim) {
            right = middle - 1
        } else {
            return middle
        }
        middle = Math.floor((left + right) / 2)
    }
}