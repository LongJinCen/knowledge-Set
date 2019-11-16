let input = []
while (line = readline()) {
    var lines = line.split(' ');
    input.push(lines)
}
let ability = input[input.length - 1]
let jobMoney = input.slice(1, input.length - 1)
let res = []

jobMoney.sort((a, b) => {
    if (+a[0] > +b[0]) {
        return 1
    } else if (+a[0] < +b[0]) {
        return -1
    } else {
        return 0
    }
})
ability.sort((a, b) => {
    if (+a > +b) {
        return 1
    } else if (+a < +b) {
        return - 1
    } else {
        return 0
    }
})
let max = Number.MIN_SAFE_INTEGER
jobMoney.map(cur => {
    cur[1] = +cur[1] > max ? +cur[1] : max
    max = cur[1]
})
for (let i = 0, index = 0; i < jobMoney.length && index < ability.length;) {
    if (+jobMoney[i][0] <= +ability[index]) {
        res[index] = +jobMoney[i][1]
        i++
    } else {
        index++
        i--
    }
}
print(res)