// 我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？
// 斐波拉数列的解法: fn = f(n - 1） + f(n - 2)

var dp = []
function rectCover(n)
{
    // write code here
    if(dp[n]) return dp[n]
    if (n <= 2) {
        return n
    }
    dp[n] = rectCover(n - 1) + rectCover(n - 2)
    return dp[n]
}
