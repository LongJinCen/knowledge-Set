// 一个整型数组里除了两个数字之外，其他的数字都出现了两次。请写程序找出这两个只出现一次的数字。
function FindNumsAppearOnce(array) {
    let res = []
    let hash = {}
    for (let i = 0; i < array.length; i++) {
        if (!hash[array[i]]) {
            hash[array[i]] = 1
        } else {
            hash[array[i]] += 1
        }
    }
    for (const key in hash) {
        if (hash.hasOwnProperty(key)) {
            hash[key] === 1 && res.push(key)
        }
    }
    return res
}