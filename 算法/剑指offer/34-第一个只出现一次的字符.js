// 在一个字符串(0<=字符串长度<=10000，全部由字母组成)中找到第一个只出现一次的字符,并返回它的位置, 如果没有则返回 -1（需要区分大小写）.
function FirstNotRepeatingChar(str) {
    if (str.length <= 0) return -1
    let memory = {

    }
    let res = -1
    for (let i = 0; i < str.length; i++) {
        if (!memory[str[i]]) {
            memory[str[i]] = 1
        } else {
            memory[str[i]] += 1
        }
    }
    for (let j = 0; j < str.length; j++) {
        if (memory[str[j]] === 1) {
            res = j
            break
        }
    }
    return res
}