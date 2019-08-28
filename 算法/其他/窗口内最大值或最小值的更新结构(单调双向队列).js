// 窗口: 一个 L 指针，一个 R 指针,从头到尾都只能往右走，L 往右表示窗口减少一个数，R 往右表示窗口增加一个数

// 为了得到窗口内的最大值，为了避免每次都要遍历一遍，需要一个设计 双端队列 的结构(窗口内最大值的更新结构)

// 双端队列的结构: 每一个位置，记录一个下标
// 向双端队列里面加数（以头部为最大值为栗子）: 保证队列里面的值为降序，移动 R, 从尾部添加数，如果大于等于当前尾部的值，那么弹出当前尾部的值，如果小于当前的值，那么放到当前值的后面
// 从双端队列里面减数: 移动 L。

/**
 * 时间复杂度：O(N)
 * @param {Array} arr
 * @param {Number} w 窗口大小
 */
// 窗口问题 1
function getMaxWindow(arr, w) {
    if (!arr || w < 1 || arr.length < w) {
        return null
    }
    // queueMax 为双端队列
    const queueMax = [],
        // 结果数组
            res = []
    let L = 0, R = -1
    for (let i = 0; i < arr.length; i++) {
        // 往双端队列里面加数的过程,降序。如果大的话，R 就一直减
        while (R >= L && arr[i] >= arr[queueMax[R]]) {
            R--
        }
        // 如果是为空了，那么就放到 L 的位置，如果不是空，那么放到 R 位置的下一个位置
        queueMax[++R] = i
        // 如果窗口大小超过了 w ，那么左边需要缩小，L++
        if (i - w === queueMax[L]) {
            L++
        }
        // 当 i 大于等于 w 的时候，窗口是否满，都记录当前的最大值
        if (i >= w - 1) {
            res.push(arr[queueMax[L]])
        }
    }
    return res
}

// 窗口问题 2
// 结论：对于一个数组，当子数组(L 到 R)不满足最大值减去最小值小于等于 num 的时候，如果扩大数组(R 变大）得到的子数组仍然不满足条件。如果缩小数组(L 变大)，那么得到的子数组
// 一定满足条件。即在 L 到 R 范围之内的子数组一定满足条件，之外的一定不满足条件。因为扩大，那么只会增加 Max 的值，或变小 Min 的值，或都保持不变，那么它们都不满足条件。
// 缩小的话，最大值最小值，要么保持不变，要么 Max 变小，Min 变大。它们都满足条件。

/**
 * 思路为定义两个双端队列，分别维护窗口内最大值，窗口内最小值。
 * 时间复杂度为 O(N)
 * @param {Array} arr
 * @param {Number} num
 */

function getNum(arr, num) {
    if (!arr || arr.length < 1) {
        return 0
    }
    const qMin = [], qMax = []
    let L = 0, R = 0, res = 0
    let LMin = 0, RMin = -1
    let LMax = 0, RMax = -1
    while (L < arr.length) {
        // 扩充 R 直到不能扩充
        while (R < arr.length) {
            // 维护窗口内最小值的双端队列结构
            while (LMin >= RMin && arr[R] <= arr[qMin[RMin]]) {
                RMin--
            }
            qMin[++RMin] = R
            // 维护窗口内最大值的双端队列结构
            while (LMax >= RMax && arr[R] >= arr[qMax[RMax]]) {
                RMax--
            }
            qMax[++RMax] = R
            // 如果不满足条件，则跳出
            if (arr[qMax[LMax]] - arr[qMin[LMin]] > num) {
                break
            }
            R++
        }
        // 检查下标是否过期
        if (qMin[LMin] <= L) {
            LMin++
        }
        if (qMax[RMax] <= L) {
            RMax++
        }
        res += R - L // 一次性获得完
        L++ // 下标移到下一个位置
    }
    return res
}