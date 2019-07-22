// 输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba。

// 去重: 当不在第一个位置且头部和后面的值相等时，不进行交换
function Permutation(str) {
    if(!str) return ''
    let result = []
    function Permutation1(str, start, end) {
        if (start >= end) {
            result.push(str)
            return
        }
        for (let i = start; i <= end; i++) {
            if(i !== start && str[start] === str[i]) continue
            let newStr = swap(str, start, i)
            Permutation1(newStr, start + 1, end)
        }
    }
    Permutation1(str, 0, str.length - 1)
    return result
}
function swap (str, i, j) {
    str = str.split('')
    let temp = str[i]
    str[i] = str[j]
    str[j] = temp
    return str.join('')
}
const result = Permutation('aa')
console.log(result)