
function reverseWord(srt) {
    var newStr = str.replace(/\b\w+\b/g, (match) => {
        return match.split('').reverse().join('')
    })
    return newStr
}
