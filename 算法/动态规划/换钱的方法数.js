// 换钱的方法数
// 【题目】 给定数组arr，arr中所有的值都为正数且不重复。每个值代表 一种面值的货币，每种面值的货币可以使用任意张，
// 再给定一 个整数aim代表要找的钱数，求换钱有多少种方法。
// 【举例】
// arr=[5,10,25,1]，aim=0。 组成0元的方法有1种，就是所有面值的货币都不用。所以返回1。 arr=[5,10,25,1]，aim=15。
// 组成15元的方法有6种，分别为3张5元、1张10元+1张5元、1张 10元+5张1元、10张1元+1张5元、2张5元+5张1元和15张1元。所 以返回6。
// arr=[3,5]，aim=2。
// 任何方法都无法组成2元。所以返回0。

// 暴力递归改成动态规划

// 暴力递归法
function process(arr, index, aim) {
    let res = 0
    if (index === arr.length) {
        res = aim === 0 ? 1 : 0
    } else {
        for (let zhang = 0; zhang < arr[index] * zhang <= aim; zhang++) {
            res += process(arr, index + 1, aim - arr[index] * zhang)
        }
    }
    return res
}

// 改造为 dp
// 1) 记忆化搜索，即加一个全局缓存, 也可以称为动态规划
let dp = {}
function process(arr, index, aim) {
    let res = 0
    if (index === arr.length) {
        res = aim === 0 ? 1 : 0
    } else {
        for (let zhang = 0; zhang < arr[index] * zhang <= aim; zhang++) {
            let key = aim - arr[index] * zhang + ''
            let temp = 0
            if (dp[key]) {
                temp = dp[key]
            } else {
                temp = process(arr, index + 1, aim - arr[index] * zhang)
                dp[key] = temp
            }
            res += temp
        }
    }
    return res
}

// 2)画表 index 和 aim 作为二维表的坐标;
// 先分析结果需要得到的结果在表格中的位置
// 然后根据 basecase 填表
// 分析位置依赖
// 如果更具 位置依赖， basecase填表的数据不够，那么回到题目中根据题意填剩下需要的表格。
// 在推出表之后。可以进一步优化，优化寻找过程。对于每一个位置，如果都需要寻找相同的累加，那么可以优化。
function coins4(arr, aim) {
    if (!arr || arr.length == 0 || aim < 0) {
        return 0
    }
    let dp = []
    for(let i = 0; i < arr.length; i++) {
        if (!dp[i]) dp[i] = []
        dp[i][0] = 1
    }
    for(let j = 1; arr[0] * j <= aim; j++) {
        dp[0][arr[0] * j] = 1
    }
    for (let i = 1; i < arr.length; i++) {
        for(let j = 1; j <= aim; j++) {
            dp[i][j] = dp[i - 1][j]
            dp[i][j] += j - arr[i] >= 0 ? dp[i][j - arr[i]] : 0
        }
    }
    return dp[arr.length - 1][aim]
}