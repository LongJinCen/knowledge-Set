// LL今天心情特别好,因为他去买了一副扑克牌,发现里面居然有2个大王,2个小王(一副牌原本是54张^_^)...他随机从中抽出了5张牌,
// 想测测自己的手气,看看能不能抽到顺子,如果抽到的话,他决定去买体育彩票,嘿嘿！！“红心A,
// 黑桃3,小王,大王,方片5”,“Oh My God!”不是顺子.....LL不高兴了,他想了想,决定大\小 王可以看成任何数字,
// 并且A看作1,J为11,Q为12,K为13。上面的5张牌就可以变成“1,2,3,4,5”(大小王分别看作2和4),“So Lucky!”。
// LL决定去买体育彩票啦。 现在,要求你使用这幅牌模拟上面的过程,然后告诉我们LL的运气如何， 如果牌能组成顺子就输出true，
// 否则就输出false。为了方便起见,你可以认为大小王是0。

function IsContinuous(numbers) {
    if (numbers.length <= 0) {
        return false
    }
    const mapObj = {
        'A': 1,
        'J': 11,
        'Q': 12,
        'K': 13,
    }
    let numStr = [],
        king = []
    for (let i = 0; i < numbers.length; i++) {
        if (+numbers[i] === 0) {
            king.push(+numbers[i])
            continue
        }
        let num = mapObj[numbers[i]] ? +mapObj[numbers[i]] : +numbers[i]
        let numStrLen = numStr.length,
            k = numStrLen - 1
        if (numStrLen === 0) {
            numStr.push(num)
        } else {
            while (num < numStr[k] && k >= 0) {
                numStr[k + 1] = numStr[k]
                k--
            }
            numStr[k + 1] = num
        }
    }
    let kingLen = king.length,
        flag = true
    for (let i = 0; i < numStr.length - 1; i++) {
        if (numStr[i] + 1 === numStr[i + 1]) {
            continue
        }
        if (numStr[i] === numStr[i + 1]) {
            flag = false
            break
        }
        let diff = numStr[i + 1] - numStr[i]
        if (diff >= 2 && kingLen >= diff - 1) {
            kingLen = kingLen - (diff - 1)
        } else {
            flag = false
            break
        }
    }
    return flag
}