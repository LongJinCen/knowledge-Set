// 给定一个数组 arr, 全是正数；一个整数 aim，求累加和等于 aim 的最长子数组。
// 要求额外空间复杂度 O(1), 时间复杂度O(N)

// 思路：定义两个指正 L、R，当L ~ R中的累加和小于等于 aim 的时候R++，当等于时，记录相关的数据
// 当窗口类累加和大于 aim 的时候 L++
// 这里可以使用双指针的原因是，全部是正数，R 往右 sum 一定增加， L 往右 sum 一定减小。

function getMaxLength(arr, aim) {
    if (!arr || arr.length === 0 || aim <= 0) {
        return 0
    }
    let L = 0,
        R = 0,
        sum = arr[0],
        len = 0
    while (R < arr.length) {
        if (sum == aim) {
            len = Math.max(len, R - L + 1)
            sum -= arr[L++]
        } else if (sum < aim) {
            R++;
            if (R === arr.length) break
            sum += arr[R]
        } else {
            sum -= arr[L++]
        }
    }
    return len
}

/**
 * 例 2
 * 给定一个数组 arr, 值可正，可负，可0；一个整数 aim，求累加和小于等于 aim 的最长子数组，时间复杂度O(N)
 * 思路：定义两个数组，min_sum 表示每一个位置的最小累加和，min_sum_index 表示每一个位置的最小累加和累加到的下标位置。
 * 从后往前遍历，对于每一个位置，只需要决定是否需要使用下一个位置的最小累加和以及不使用后面的部分(dp)，然后得到前面两个数组的信息。
 *
 * 然后从头遍历 min_sum, 定义一个 L， 一个 R, 每一个位置表示当前位置的最小累加和。并有对应的累加到的 index 在 min_sum_index 中。
 * 如果当前位置的最小累加和小于 aim ，那么更具其对应的累加和到达的位置的下一个位置的最小累加和，再累加起来，看是否大于 aim ,依次往下，知道大于 aim。
 * 每遍历一次，就会得到一个以该位置的开头的最长子数组，累加和小于等于 aim。
 * 当一个位置遍历完了之后，sum - L 位置的值，然后 L++, 知道 前面说到的下一个位置的最小累加和能够加进来为止。
 * 思想：去除不是最优的解。
 */

function maxLengthAwesom(arr, aim) {
    if (!arr || arr.length < 1) {
        return 0
    }
    let minSum = []
    let minIndex = []
    minSum[arr.length - 1] = arr[arr.length - 1]
    minIndex[arr.length - 1] = arr.length - 1
    for(let i = arr.length - 2; i >= 0; i--) {
        if (minSum[i + 1] < 0) {
            minSum[i] = minSum[i + 1] + arr[i]
            minIndex[i] = minIndex[i + 1]
        } else {
            minSum[i] = arr[i]
            minIndex[i] = i
        }
    }
    let maxLen = 0, L = 0, R = 0, sum = 0
    for (let L = 0; L < arr.length; L++) {
        while (sum + minSum[R] <= aim && R < arr.length) {
            sum += minSum[R]
            R = minIndex[R] + 1
        }
        sum = sum - R > L ? arr[L] : 0
        maxLen = Math.max(maxLen, R - L)
        R = Math.max(R, L + 1)
    }
    return maxLen
}