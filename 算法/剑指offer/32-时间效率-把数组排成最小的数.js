// 输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。例如输入数组{3，32，321}，则打印出这三个数字能排成的最小数字为321323。

function PrintMinNumber(numbers) {
    if(numbers.length === 0) return ""
    let minValue = Number.MAX_SAFE_INTEGER
    function minStr(str, numbers, start, end) {
        if (start >= end) {
            str = str + numbers[start]
            let strToNumber = +str
            minValue = minValue < strToNumber ? minValue : strToNumber
        }
        for (let i = start + 1; i <= end; i++) {
            let newNubmers = [...numbers]
            if (newNubmers[start] === newNubmers[i]) {
                continue
            }
            let value1 = newNubmers[start] + '' + newNubmers[i],
                value2 = newNubmers[i] + '' + newNubmers[start]
            if (+value1 > +value2) {
                let temp = newNubmers[start]
                newNubmers[start] = newNubmers[i]
                newNubmers[i] = temp
            }
            minStr(str + newNubmers[start], newNubmers, start + 1, end)
        }
    }
    minStr('', numbers, 0, numbers.length - 1)
    return minValue
}
