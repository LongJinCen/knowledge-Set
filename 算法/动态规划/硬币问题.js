/**
 * 
 * @param {*} arr 
 * 将问题化解为1元钱需要几个硬币，2元钱需要几个硬币，以此类推，每个的结论都依赖前面的结论
 * 将问题化解为小问题，并且每一步解决的是同一个问题
 */

function moneyCount(arr = [1, 3, 5]) {
    var sum = 11,
        dp = []
    for (let i = 0; i <= sum; i++) {
        dp[i] = i
    }
    for (var i = 1; i <= sum; i++) {
        for (var j = 0; j <= arr.length; j++) {
            if (i >= arr[j] && dp[i - arr[j]] + 1 <= dp[i]) {
                dp[i] = dp[i - arr[j]] + 1
            }
        }
    }
}