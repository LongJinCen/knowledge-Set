// 字符串匹配问题
// 【题目】 给定字符串str，其中绝对不含有字符'.'和'*'。再给定字符串exp， 其中可以含有'.'或'*'，'*'字符不能是exp的首字符，
// 并且任意两个 '*'字符不相邻。exp中的'.'代表任何一个字符，exp中的'*'表示'*' 的前一个字符可以有0个或者多个。请写一个函数，判断str是否能被 exp匹配。
// 【举例】
// str="abc"，exp="abc"，返回true。 str="abc"，exp="a.c"，exp中单个'.'可以代表任意字符，所以返回 true。
// str="abcd"，exp=".*"。exp中'*'的前一个字符是'.'，所以可表示任 意数量的'.'字符，当exp是"...."时与"abcd"匹配，返回true。 str=""，exp="..*"。
// exp中'*'的前一个字符是'.'，可表示任意数量 的'.'字符，但是".*"之前还有一个'.'字符，该字符不受'*'的影响， 所以str起码有一个字符才能被exp匹配。所以返回false。

// 题意可以理解为给定一个正则 exp 包含 . 和 *。看是否可以匹配 str

// 递归版本:
function match(str, exp) {
    function newMatch(i, j) {
        // 这里使用 exp 的 length 来判断结尾的原因是，''和'.*'这种情况会出现问题。
        if (j === exp.length) {
            return i === str.length
        }
        // exp 如果已经到结尾了 或则 下一个位置不是 *
        if (j === exp.length - 1 ||  exp[j + 1] !== '*') {
            return i !== str.length // 如果 j 上还有字符，而 i 没有字符了返回 false
                && (exp[j] == str[i] || exp[j] == '.')
                && newMatch(i + 1, j + 1) // 如果当前的匹配上了，那么匹配下一个位置
        }
        // 如果没有命中前面的，说明 下一个位置是 *
        // 如果首字符能配上
        while (i != str.length && (exp[j] == str[i] || exp[j] == '.')) {
            // 看后面能不能匹配上，如果能，那么直接返回 true
            if (newMatch(i, j + 2)) {
                return true
            }
            // 如果后面不能返回 true
            i++
        }
        // 如果首字符不能配上
        return newMatch(i, j + 2)
    }
}

// 动态规划版本: i 和 j 确定了，返回值就能确定, 二维表。
// 根据前面的递归版本，从每一个 process 子过程中可以发现，在 dp 表中，初始时刻
// 至少需要搞定倒数两列的数据，和倒数第一排的数据。然后可以填表，倒退到 i = 0, j = 0 的位置。
// 利用 basecase 填表，如果不够使用，那么回到题意中，将需要的没有填的数据填满

function isMatchDp(str, exp) {
    if (!str || !exp) {
        return false
    }
    let s = str.split('')
    let e = exp.split('')
    let dp = initDPMap(s, e)
    for (let i = s.length - 1; i > -1; i--) {
        for (let j = e.length - 2; j > -1; j--) {
            if (e[j + 1] != '*') {
                dp[i][j] = (s[i] == e[j] || e[j] == '.')
                    && dp[i + 1][j + 1]
            } else {
                let si = i
                while (si != s.length && (s[si] = e[j] || e[j] == '.')) {
                    if (dp[si][j + 2]) {
                        dp[i][j] = true
                        break
                    }
                    si++
                }
                if (dp[i][j] != true) {
                    dp[i][j] = dp[si][j + 2];
                }
            }
        }
    }
    return dp[0][0]
}

function initDPMap(s, e) {
    let slen = s.length,
        elen = e.length;
    let dp = []
    dp[slen][elen] = true
    for(let j = elen - 2; j > -1; j = j -2) {
        if (e[j] != '*' && e[j + 1] == '*') {
            dp[slen][j] = true
        } else {
            break
        }
    }
    if (slen > 0 && elen > 0) {
        if ((e[elen - 1] == '.' || s[slen - 1] == e[elen - 1])) {
            dp[slen - 1][elen - 1] = true
        }
    }
    return dp
}