// 把只包含质因子2、3和5的数称作丑数（Ugly Number）。例如6、8都是丑数，但14不是，因为它包含质因子7。 习惯上我们把1当做是第一个丑数。求按从小到大的顺序的第N个丑数。

// 首先除2，直到不能整除为止，然后除5到不能整除为止，然后除3直到不能整除为止。最终判断剩余的数字是否为1，如果是1则为丑数，否则不是丑数。

function GetUglyNumber_Solution(index) {
    if(index <= 0) return 0
    let result = [1]
    let t1 = t2 = t3 = 0
    for (let i = 1; i < index; i++) {
        let value1 = result[t1] * 2,
            value2 = result[t2] * 3,
            value3 = result[t3] * 5
        result[i] = Math.min(value1, value2, value3)
        if(value1 === result[i]) t1++
        if(value2 === result[i]) t2++
        if(value3 === result[i]) t3++
    }
    return result[index - 1]
}


function GetUglyNumber_Solution(index) {
    if (index <= 0) return []
    let dp = [], total = 0, result
    for (let i = 1; ; i++) {
        if (judge(i)) {
            dp[i] = true
            total++
        } else {
            dp[i] = false
        }
        if (total === index) {
            result = i
            break
        }
    }
    function judge(index) {
        while (index % 2 === 0) {
            if(dp[index] !== undefined) return dp[index]
            index = index / 2
        }
        while (index % 3 === 0) {
            if(dp[index] !== undefined) return dp[index]
            index = index / 3
        }
        while (index % 5 === 0) {
            if(dp[index] !== undefined) return dp[index]
            index = index / 5
        }
        if (index === 1) return true

        return false
    }
    return result
}