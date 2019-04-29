/**
 * 
 * @param {*} arr 
 * 将问题化解为1元钱需要几个硬币，2元钱需要几个硬币，以此类推，每个的结论都依赖前面的结论
 * 将问题化解为小问题，并且每一步解决的是同一个问题
 */

// function moneyCount(arr = [1, 3, 5]) {
//     var sum = 11,
//         dp = []
//     for (let i = 0; i <= sum; i++) {
//         dp[i] = i
//     }
//     for (var i = 1; i <= sum; i++) {
//         for (var j = 0; j <= arr.length; j++) {
//             if (i >= arr[j] && dp[i - arr[j]] + 1 <= dp[i]) {
//                 dp[i] = dp[i - arr[j]] + 1
//             }
//         }
//     }
// }

// dp动态规划问题，硬币问题
// 假设有 1 元，3 元，5 元的硬币若干（无限），现在需要凑出 11 元，问如何组合才能使硬币的数量最少？

// 将给定的字符串按照以下要求处理后输出
// 1. 不能包含连续超过三个字母的，应该变为两个  如heloooo -> heloo
// 2. helloo -> hello  hellooaa -> helloaa(从到右); 前面的意思是，不能有连续的超过两个字母的出现，应该将连续的两个当中的后者变为一个字母

// 有n个人参加比赛，比赛结束后每个人得到一个分数，现在所有人排成一圈(第一个和第N个排成一排)
// 要求: 1. 如果某个人的分数比左右的都高，那么奖品的数量也要比左右的人多
// 2. 每个人至少得到一个奖品
// 问最少需要混呗多少个奖品

// 给定n表示有几段绳子，以及a[i]地i根绳子的长度。绳子可以裁剪，
// 我们给定一个M,表示我们需要的等长的绳子数量，求我们可以将n裁剪成M段的时候，M段绳子的最大长度

// var str = 'hellooooffffvvvvv'
// // 第一步将所有超过三个的字母变成两个
// var middleStr = str.replace(/([a-zA-Z])\1\1*/g, function (match) {
//     return match[0] + match[1]
// })
// // 第二步处理连续的情况
// var resultStr = middleStr.replace(/([a-zA-Z])\1([a-zA-Z])\2/g, function (match, a, b) {
//     return a + a + b
// })

// console.log(resultStr)

