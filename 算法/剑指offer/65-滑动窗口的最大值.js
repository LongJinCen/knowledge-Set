// 给定一个数组和滑动窗口的大小，找出所有滑动窗口里数值的最大值。
// 例如，如果输入数组{2,3,4,2,6,2,5,1}及滑动窗口的大小3，那么一共存在6个滑动窗口，他们的最大值分别为{4,4,6,6,6,5}；
// 针对数组{2,3,4,2,6,2,5,1}的滑动窗口有以下6个： {[2,3,4],2,6,2,5,1}， {2,[3,4,2],6,2,5,1}， {2,3,[4,2,6],2,5,1}， 
// {2,3,4,[2,6,2],5,1}， {2,3,4,2,[6,2,5],1}， {2,3,4,2,6,[2,5,1]}。

function maxInWindows(num, size) {
    // write code here
    if (num.length < size || size < 1) {
        return
    }
    let queue = [],
        L = 0,
        R = -1,
        res = []
    for (let i = 0; i < num.length; i++) {
        while (R >= L && num[i] >= num[queue[R]]) {
            R--
        }
        queue[++R] = i
        if (i - size === queue[L]) {
            L++
        }
        if (i - size + 1 >= 0) {
            res.push(num[queue[L]])
        }
    }
    return res
}