// 把问题转化为规模缩小了的同类问题的子问题
// 有明确的不需要继续进行递归的条件 (base case)
// 有当得到了子问题结果之后的决策过程
// 不记录每一个子问题的解


// 求 n! 

function factorial(n) {
    if(n === 1) {
        return 1
    }
    return n * factorial(n - 1)
}

// 汉诺塔问题
// 打印 n 层汉诺塔从左边移动到右边的全过程
