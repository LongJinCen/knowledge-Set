// 输入n个整数，找出其中最小的K个数。例如输入4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4,。

function GetLeastNumbers_Solution(input, k) {
    if(k <= 0 || input.length === 0 || k > input.length) return []
    let result = []
    for (let i = 0; i < input.length - 1; i++) {
        if(result.length >= k) break
        let minIndex = i
        for (let j = i + 1; j < input.length; j++) {
            if(input[j] < input[minIndex]) {
                minIndex = j
            }
        }
        let temp = input[minIndex]
        input[minIndex] = input[i]
        input[i] = temp
        result.push(temp)
    }
    if(k === input.length){
        return input
    }
    return result
}