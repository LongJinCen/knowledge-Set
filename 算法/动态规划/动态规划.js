// 所有的动态规划都可以从暴力递归优化而来
// 将每一个子问题的解记录下来 可以避免重复计算
// 把暴力递归的过程, 抽象成了状态表达
// 并且存在化简状态表达，使其更加简洁的可能

// 所以写的动态规划的过程为，先想使用暴力递归怎么去尝试，然后在这个基础之上看怎么优化。


// 给你一个二维数组，二维数组中的每个数都是正数，要求从左上
// 角走到右下角，每一步只能向右或者向下。沿途经过的数字要累
// 加起来。返回最小的路径和。

// 思路：每一步可以走右边和下面，我们走两者当中较小的那一条路，并且如果到达了右边界那么只能往下走，
// 到达了下边界，只能往右走，在边界上没有优先级，只能朝一条路走


// 暴力递归方式
function walk(arr, i, j,) {
    if(i === arr.length - 1 && j === arr[0].length - 1) { // 到达最右下角
        return arr[i][j]
    }
    if(i === arr.length - 1) { // 到达下边界
        return arr[i][j] + walk(arr, i, j + 1)
    }
    if(j === arr[0].length - 1) { // 到达右边界
        return arr[i][j] + walk(arr, i + 1, j)
    }
    // 没有到边界
    let right = arr[i][j] + walk(arr, i, j + 1)
    let left = arr[i][j] + walk(arr, i + 1, j)
    return arr[i][j] + Math.max(right, left) // 选择最优解
}


// 动态规划优化暴力递归
// 前面的暴力递归存在一个很大的问题，就是回去重复的计算一个子问题，例如f(0, 0)需要f(0， 1)和f(1，0)的结果
// 然后f(0,1)需要f(0，2)和f(1，1)的结果，而f(1，0)需要f(1，1)和f(2，0)，可以看出暴力递归会重复即计算f(1，1)
// 的结果。所谓动态规划，就是能够使我们将计算过得值缓存起来，不需要重复计算的过程

// 对于有重复状态的，并且是无后效性，即对于同一个参数，返回值一定是固定的，一般都可以改为动态规划

// 所以上面的改造，可以使用一个二维表(dp)来存储计算过得值，然后再递归过程当中去更新它, 最后直接从dp表中拿想要的值
var dp = [[]]
dp[i][j] = 200
function walk(arr, i, j) {
    if(dp[i][j]) {
        return dp[i][j]
    }
    if(i === arr.length - 1 && j === arr[0].length - 1) { // 到达最右下角
        return dp[i][j]
    }
    if(i === arr.length - 1) { // 到达下边界
        dp[i][j] = arr[i][j] + walk(arr, i, j + 1)
        return dp[i][j]
    }
    if(j === arr[0].length - 1) { // 到达右边界
        dp[i][j] = arr[i][j] + walk(arr, i + 1, j)
        return dp[i][j]
    }
    // 没有到边界
    let right = arr[i][j] + walk(arr, i, j + 1)
    let left = arr[i][j] + walk(arr, i + 1, j)
    dp[i][j] = arr[i][j] + Math.max(right, left)
    return dp[i][j] // 选择最优解
}


//给你一个数组arr，和一个整数aim。如果可以任意选择arr中的 数字，能不能累加得到aim，返回true或者false
/**
 * 
 * @param {*} arr 
 * @param {*} curi 
 * @param {*} sum 
 * @param {*} aim 
 */
function sum(arr, curi, sum,  aim) {
    if(arr.length == curi) {
        return  sum === aim
    }
    return sum(arr, curi + 1, sum + arr[curi], aim) || sum(arr, curi + 1, sum, aim)
}

// 分析后效性: 对于前面的任意一个状态i 和 sum ,后面的值都是一样的结果，所以没有后效性，可以改为动态规划, 一个dp表，x是所有给出的和,表示aim不会超出这个范围，y是所有可能的i，对于任意一个
// crui 和 sum 都依赖于 curi + 1, sim + arr[curi] 和 curi + 1 和 arr[curi] 这两个格子