// 1. 一个字符串中找到最长回文字符串
// 回文: 正着和反着一样
// （1）暴力解:为了解决奇数和偶数的情况,需要在每一个字符中间加一个特殊字符，11311->#1#1#3#1#1#,
// 然后以每一个字符为中心往两边扩展，结果中的最大值/2(包括特殊字符的值)就是最长回文
// 时间复杂度最差为 o(n^2)

// （2）manacher 算法: O(N)

// 2. 一个字符串，只能在末尾添加字符，求添加多少个字符。解决办法是先求必须包含包含最后一个字符的的回文字符串为多长，然后把前面不是的部分逆序添加到h
// 后面就可以了。例如：abc12321,包含最后一个位置的回文字符串长度为5，折abc逆序过来添加到后面就可以了 abc12321cba。用 manacher，一旦 右边界到达
// 最后一个字符就停下，这个时候可以得到相应的位置信息。


// 生成字符串，给每个字符之间加上 #, 为了解决偶和奇的问题
function manacherString(str) {
    const strArr = str.split('')
    const res = []
    const len = strArr.length * 2
    let index = 0
    for (let i = 0; i < len; i++) {
        res[i] = (i & 1) === 0 ? '#' : strArr[index++]
    }
    return res
}

// manacher算法: O(N), 因为是不断 r 往右走，2.1和2.2的情况都是 O(1)，所以走完为 O(N)
// 思路: 利用回文半径，让前面已求出的结果来加速后面的结果
// 三个概念:
//          回文半径 pArr[]: 每一个字符，以自身为中心往两边扩的最大半径
//          回文右边界 r: 表示目前经过的所有字符中，他们的最右边的边界
//          当前回文中心 c: 表示以前面的右边界的回文的中心
//四种情况:
// 1. 如果当前位置的 i，没有在 r 的范围内, 即 i > r，暴力往两边扩展
// 2. i <= r
//      1): manacher1.png: i 关于 c 的对称点 i' 的回文左边界在 c 的回文左边界之内，那么 i 的回文半径就为 i' 的回文半径 O(1)
//      2): manacher2.png: i 关于 c 的对称点 i' 的回文左边界在 c 的回文左边界之外，那么 i 的回文半径就为 i 的位置到 c 的右边界 O(1)
//      3): manacher3.png: i 关于 c 的对称点 i' 的回文左边界在和 c 的回文左边界相等，那么 i 能确定的回文就是到 c 的右边界，此时还需要在这个边界
//          之上继续进行扩展，为了确认是否还有多的可以形成回文的字符
function maxLcpsLength(str) {
    if (str === null || str.length === 0) {
        return 0
    }
    const strArr = manacherString(str)
    // 回文半径数组，代表每一个位置的字符形成的回文半径
    const pArr = []
    // c 代表回文中心，r 代表以 c 为回文中心的最右边的位置
    // 只有出现新的回文右边界大于 r 时，才更新这两个值
    let c = -1, r = -1, max = Number.MIN_SAFE_INTEGER
    for (let i = 0; i < strArr.length; i++) {
        pArr[i] = r > i ? Math.min(pArr[2 * c - i], r - i) : 1
        while (i + pArr[i] < strArr.length && i - pArr[i] > -1) {
            if (charArr[i + pArr[i]] === charArr[i - pArr[i]]) {
                pArr[i]++
            } else {
                break
            }
        }
        if (i + pArr[i] > r) {
            r = i + pArr[i]
            c = i
        }
        max = Math.max(max, pArr[i])
    }
    return max - 1
}