// 给定一个数组 arr ,给定一个目标值 aim, 求改数组中和为 aim 的最长的数组长度
// 思路：从 m ~ n  的累加和为 k, 如果要求和为 aim 的数组，那么只需要求 m ~ n 之间和为 k - aim 的范围，如果结尾位置为 x，
// 那么从 x + 1 ~ n就是何为 aim 的数组

function maxLength(arr, aim) {
    if (!arr || arr.length === 0) return
    let newMap = new Map()
    // 给定一个初始值，以 -1 位置结尾的数组和为 0
    map.put(0, -1)
    let len = 0
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
        if (newMap.get(sum - k)) {
            len = Math.max(i - map.get(sum - k), len)
        }
        if (!newMap.get(sum)) {
            // 每次把当前位置的 sum 放入到newMap当中，并且只放最早出现的，如果有了就不再更新
            newMap.set(sum, i)
        }
    }
    return len
}

// 扩展：
// 1. 给定一个数组，求奇数和偶数个数相等的最长的子数组
// 思路：奇数变为 1, 偶数变为 -1, 求何为 0 的最长子数组
function maxLengthOddEvenArr(arr) {
    arr = arr.map(v => {
        return v % 2 === 1 ? -1 : 1
    })
    let map = new Map()
    map.set(0, -1)
    let maxLen = 0, sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
        if (map.get(sum - 0)) {
            maxLen = Math.max(maxLen, i - map.get(sum - 0))
        }
        if (!map.get(sum)) {
            map.set(sum, i)
        }
    }
    return maxLen
}
// 2. 一个数组中只有 0, 1, 2, 求一个数组中 1 和 2 长度相同的最长子数组长度为多少
// 思路：1 还是 1，2变 -1, 求何为 0 的最长子数组

// 3. 一个数组互相异或最终为 0为我们给定的数组。给定一个数组，求一种分割方法，使得分割出来的的所有数组中满足前面给定条件的数组最多。
// 思路：异或满足交换律，且 0 ^ n = n, n ^ n = 0。使用动态规划。
function maxLength(arr) {
    if (!arr || arr.length === 0) return
    let dp = []
    let newMap = new Map()
    // 给定一个初始值，以 -1 位置结尾的数组和为 0
    map.put(0, -1)
    let ans = 0 // 结果
    let xor = 0 // 当前的异或和
    for (let i = 0; i < arr.length; i++) {
        xor ^= arr[i]
        // 如果该异或值出现过
        if (newMap.get(xor)) {
            let pre = newMap.get(xor)
            //0 ~ i, 当前 i 的 xor 和 pre 的 xor 相等，所以 pre ~ i 这一段的异或和为 0。
            // 如果位置是 -1 ，那么当前的 dp[i] 为 1, 即从头开始的位置的开始到当前的 i 这一段
            // 如果不是 -1, 那么 从 pre ~ i 这一段可以划分为一段，因为他们的异或和为 0, 所以当前的 dp[i] = dp[pre] + 1
            dp[i] = pre === -1 ? 1 : (dp[pre] + 1)

        // 如果当前 i 位置的值没有出现过
        } else {
            // 如果没有出现过，而 xor 的和又为 0，那么当前的 dp[i] 为 1
            if (xor === 0) {
                dp[i] = 1
            } else {
            // 如果 xor 和不为 0，那么他的 dp[i] 和前面一个的 dp 值相等
                dp[i] =  dp[i - 1]
            }
        }
        if (i > 0) {
            //  去比较如果前面存在过相同的 xor 的情况和和不存在的情况两种，谁的值最大，取大的那个值
            dp[i] = Math.max(dp[i - 1], dp[i])
        }
        // 每一次都要更新当前的异或和，这里不是只存第一次的，而是存最后一次的，后面的会把前面相同的 xor 为key 的覆盖掉
        map.put(xor, i)
        // 记录最大的值
        ans = Math.max(ans, dp[i])
    }
    return ans
}