// 输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，如果有多对数字的和等于S，输出两个数的乘积最小的
function FindNumbersWithSum(array, sum) {
  if (array.length <= 1) {
    return []
  }
  let L = 0,
    R = array.length - 1,
    cur = array[L] + array[R],
    res = [],
    minMul = Number.MAX_SAFE_INTEGER
  while (L < R) {
    if (cur < sum) {
      cur -= array[L++]
      cur += array[L]
    } else if (cur === sum) {
      if (array[L] * array[R] < minMul) {
        minMul = array[L] * array[R]
        res = [array[L], array[R]]
      }
      cur -= array[R--]
      cur += array[R]
    } else {
      cur -= array[R--]
      cur += array[R]
    }
  }
  return res
}