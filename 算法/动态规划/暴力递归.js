// 把问题转化为规模缩小了的同类问题的子问题(不是想到如何去解决一个问题，而是想到如何去尝试，这是递归能力的关键)
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
// 打印 n 层汉诺塔从最左边移动到最右边的全过程，有三根杆子，并且每一步的杆子中都必须是小的在上面，大的在下面

// 解析: 假如有N 个在左边(from杆)，那么当前需要做的就是将N-1的移到中间的那根杆子（help杆）上去，然后再将剩下的一个移到最右边的那个杆子（to杆）上去就可以了
// 然后下一步就是将 help 杆上的 n - 1个移到 to 杆上面去就可以了。 这是一个basecase

/**
 *
 * @param {*} N 表示当前是1~N的问题，注意是当前，而且全都停留在 from 这个杆子上
 * @param {*} from 起始杆子
 * @param {*} to 目的杆子
 * @param {*} help 多余的一根辅助杆子
 * process(10, '1', '3', '2')
 */
function process(N, from, to, help) {
    if(N === 1) {
        console.log("move 1 from " + from + "to" + to)
    } else {
        process(N - 1, from, help, to)
        console.log("move " + N + " from " + from + " to " + to)
        process(N - 1, help, to, from)
    }
}


// 打印一个字符串所有的子序列

// 分析: 当前位置，每一步都有两个决策，要当前位置，和不要当前位置，要的话就连起来，不要的话就位空

/**
 *
 * @param {*} str 数组
 * @param {*} i 当前位置
 * @param {*} result 当前的结果
 */
function printAllSub(str, i, result) {
    if(i === str.length) {
        console.log(result)
        return
    }
    printAllSub(str, i + 1, result) // 不要当前的字符
    printAllSub(str, i + 1, result + str[i]) // 要当前的字符
}

// 打印一个字符串的全部排列，要求不要出现重复的排列
function arrangement(str, step) {
    if (step === str.length - 1) {
        console.log(str.join(''))
        return
    }
    let temp
    arrangement(str, step + 1) // 为了避免 i 移动后都要重新走不交换的这一步，所以只需要走一步就可以了，拿出来，而不是放到 for 循环中
    for (let i = step + 1; i < str.length; i++) {
        if (str[i] === str[step]) continue
        temp = str[step]
        str[step] = str[i]
        str[i] = temp
        arrangement(str, step + 1)
        temp = str[step]
        str[step] = str[i]
        str[i] = temp
    }
}

// 母牛每年生一只母牛，新出生的母牛成长三年后也能每年生一只 母牛，假设不会死。求N年后，母牛的数量。
// 思路: 前四年的牛的数量分别问 1 2 3 4, 因为这个时候只有第一只牛在生，从第五年开始，每一年的牛的数量等于去年的牛的数量 + 三年前的牛的数量(即三年前的牛都可以分别生一只)
// 表达式: f(n) = f(n - 1) + f(n - 3) 在n > 4的情况下
function cow(n) {
    if (n <= 4) return n
    let res = [0, 1, 2, 3, 4]
    return cow(n - 1) + cow(n - 3)
}


