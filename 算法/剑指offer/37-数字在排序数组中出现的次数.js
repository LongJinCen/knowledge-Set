function GetNumberOfK(data, k) {
    let left = 0, right = data.length - 1, len = data.length - 1
    let middle = Math.floor((left + right) / 2)
    while (left < right) {
        if (k > data[middle]) {
            left = middle + 1
        } else if (k < data[middle]) {
            right = middle - 1
        } else {
            break
        }
        middle = Math.floor((left + right) / 2)
    }
    let res = 0, goLeft = middle, goRight = middle + 1
    while (goLeft >= 0 && data[goLeft] === k) {
        res++
        goLeft--
    }
    while (goRight <= len && data[goRight] === k) {
        res++
        goRight++
    }
    return res
}
console.log(GetNumberOfK([1, 2, 3, 4, 5, 5, 6], 5))