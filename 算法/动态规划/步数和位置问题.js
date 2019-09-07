// 给定一个 N表示位置 1~ N、M 表示初始位置、P 表示可以走的步数、K 表示最终位置
// 求在初始位置走 P 步能走到 K 位置的方法都多少种

// 暴力递归法
function ways(N, M, P, K) {
    if (N < 1 || M < 1 || M > N || P < 0 || K < 1 || K > N) {
        return 0
    }
    if (P == 0) {
        return M === K ? 1 : 0
    }
    let res = 0
    if (M === 1) {
        res = ways(N, M + 1, P - 1, K)
    } else if (M == N) {
        res = ways(N, M - 1, P - 1, K)
    } else {
        res = ways(N, M + 1, P - 1, K) + ways(N, M - 1, P - 1, K)
    }
    return res
}

// 改为 动态规划
// 分析: 可变参数 M, P 且无后效性，即 M, P定了之后ways(N,M,P,K)始终返回同一个值
// 根据 basecase 填数据
// 根据代码分析数据依赖情况

function setpAndPositionDP(p, m, k, n) {
    if (p < 0 || m < 1 || m > n || k > n || k < 1) {
        return 0
    }
    let dp = [[]], flag = false
    for (let i = 1; i <= n; i++) {
        dp[0][i] = i === k ? 1 : 0
    }
    for (let i = 1; i <= p; i++) {
        if (flag) break
        if (!dp[i]) dp[i] = []
        for (let j = 1; j <= n; j++) {
            if (j === 1) {
                dp[i][j] = dp[i - 1][j + 1]
            } else if(j === n) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j + 1]
            }
            if (i === p && j === m) {
                flag = true
                break
            }
        }
    }
    return dp[p][m]
}