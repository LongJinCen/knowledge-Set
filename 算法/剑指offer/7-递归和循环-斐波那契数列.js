// 大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0）。n<=39

var dp = []
function Fibonacci(n) {
    if (dp[n]) return dp[n]
    if (n === 0) {
        return 0
    }
    if (n === 1) {
        return 1
    }
    dp[n] = Fibonacci(n - 1) + Fibonacci(n - 2)
    return dp[n]
}
console.log(Fibonacci(39))