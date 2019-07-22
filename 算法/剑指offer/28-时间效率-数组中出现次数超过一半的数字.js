// 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。
// 由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。

function MoreThanHalfNum_Solution(numbers) {
    let len = numbers.length
    if(len === 0) return 0
    if(len === 1) return 1
    let middle = Math.floor(len / 2),
        middleValue = numbers[middle]
    let total = 0
    for (let i = 0; i < len; i++) {
        if(numbers[i] === middleValue) total++
    }
    if(total > middle) {
        return 2
    } else {
        return 0
    }
}