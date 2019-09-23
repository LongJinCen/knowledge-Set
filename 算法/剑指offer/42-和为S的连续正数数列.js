// 输出所有和为S的连续正数序列。序列内按照从小至大的顺序，序列间按照开始数字从小到大的顺序
function FindContinuousSequence(sum) {
    if (sum <= 0) {
        return []
    }
    let res = []
    let L = R = 1,
        cur = 0
    while (L < sum && R < sum && L <= R) {
        while (cur < sum && L < sum && R < sum && L <= R) {
            cur += R
            R++
        }
        if (cur === sum) {
            let sigal = []
            for (let i = L; i < R; i++) {
                sigal.push(i)
            }
            res.push(sigal)
        }
        cur -= L
        L++
    }
    return res
}
console.log(FindContinuousSequence(100))