// 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。

// 暴力递归方法
function jumpFloor(number) {
    var totalWay = 0
    function jump(current, total) {
        if(current === total) {
            totalWay++
        }
        if(current > total) {
            return
        }
        jump(current + 1, total)
        jump(current + 2, total)
    }
    return jump(0, number)
}

// 用动态规划改造 暴力递归
function jumpFloor(number) {
    var dp = []
    function jump(current, total) {
        if(dp[current]) return dp[current]
        if (current === total) {
            return 1
        }
        if (current > total) {
            return 0
        }
        dp[current] = jump(current + 1, total) + jump(current + 2, total)
        return dp[current]
    }
    return jump(0, number)
}
console.log(jumpFloor(4))