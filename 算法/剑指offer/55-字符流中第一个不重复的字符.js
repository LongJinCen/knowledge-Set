// 请实现一个函数用来找出字符流中第一个只出现一次的字符。例如，当从字符流中只读出前两个字符"go"时，
// 第一个只出现一次的字符是"g"。当从该字符流中读出前六个字符“google"时，第一个只出现一次的字符是"l"。

let memory
//Init module if you need
function Init() {
    // write code here
    memory = {}
}
//Insert one char from stringstream
function Insert(ch) {
    // write code here
    if (!memory[ch]) {
        memory[ch] = {
            T: 1,
            word: ch
        }
    } else {
        memory[ch].T = memory[ch].T + 1
    }
}
//return the first appearence once char in current stringstream
function FirstAppearingOnce() {
    // write code here
    let minIndex = Number.MAX_SAFE_INTEGER,
        target = null
    for (const key in memory) {
        if (memory.hasOwnProperty(key)) {
            target = minIndex > memory[key].T ? memory[key] : target
            minIndex = target.T
        }
    }
    return minIndex === 1 ? target.word : '#'
}