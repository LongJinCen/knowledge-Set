// 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组,求出这个数组中的逆序对的总数P。
// 并将P对1000000007取模的结果输出。 即输出P%1000000007
function InversePairs(data) {
  function mergeSort(data, left, right) {
    if (left >= right) return 0
    let middle = Math.floor((left + right) / 2)
    let L = mergeSort(data, left, middle)
    let R = mergeSort(data, middle + 1, right)
    return L + R + outSort(data, left, right)
  }
  function outSort(data, left, right) {
    let middle = Math.floor((left + right) / 2)
    let res = [], T = 0
    let i = middle, j = right
    while (i >= left && j >= middle + 1) {
      if (data[i] > data[j]) {
        T = T + (j - (middle + 1)) + 1
        res.push(data[i--])
      } else {
        res.push(data[j--])
      }
    }
    while (i >= left) {
      res.push(data[i--])
    }
    while (j >= middle + 1) {
      res.push(data[j--])
    }
    for (let k = left, t = res.length - 1; k <= right; k++) {
      data[k] = res[t--]
    }
    return T
  }
  return mergeSort(data, 0, data.length - 1)
}