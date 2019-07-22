// 一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

function jumpFloorII(number) {
    var dp = new Array(number + 2).fill(-1)
    function jump(current, total) {
        if(dp[current] >= 0) return dp[current]
        if (current === total) {
            return 1
        }
        if (current > total) {
            return 0
        }
        if(dp[current] < 0) {
            dp[current] = 0
        }
        for (let i = 1; i <= number; i++) {
            dp[current] += jump(current + i, total)
        }
        return dp[current]
    }
    return jump(0, number)
}