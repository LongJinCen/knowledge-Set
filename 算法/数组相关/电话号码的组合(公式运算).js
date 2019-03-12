/**
 * 给出包含键盘上数字2-9的字符串，返回它们能表示的字母组合
 * 思路: 两个两个的组合形成一个新的组合，再将新的组合与下一个进行组合
 */

function letterCombinations(str) {

    var mapKeyToLetter = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']

    var codeArr = str.split('').map(value => mapKeyToLetter[+value - 2])

    function combine(codeArr) {
        var result = []
        for (let i = 0; i < codeArr[0].length; i++) {
            for (let j = 0; j < codeArr[1].length; j++) {
                result.push(codeArr[0][i] + codeArr[1][j])
            }
        }
        codeArr.splice(0, 2, result)
        if (codeArr.length > 1) {
            combine(codeArr)
        } else {
            return
        }
    }
    combine(codeArr)
    return codeArr[0]
}