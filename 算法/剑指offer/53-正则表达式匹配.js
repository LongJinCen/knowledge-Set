// 请实现一个函数用来匹配包括'.'和'*'的正则表达式。模式中的字符'.'表示任意一个字符，
// 而'*'表示它前面的字符可以出现任意次（包含0次）。 在本题中，匹配是指字符串的所有字符匹配整个模式。
// 例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但是与"aa.a"和"ab*a"均不匹配

//s, pattern都是字符串
function match(s, pattern) {
    // write code here
    function process(s, pattern, sIdx, pIdx) {
        if (pIdx === pattern.length) {
            return sIdx === s.length
        }
        // 下一个不是 * 号
        if (
            pattern[pIdx + 1] !== '*' || pIdx === pattern.length - 1
        ) {
            return sIdx < s.length
                && (pattern[pIdx] === s[sIdx] || pattern[pIdx] === '.')
                && process(s, pattern, sIdx + 1, pIdx + 1)
        }
        // 下一个是 * 号
        while (sIdx < s.length && (s[sIdx] === pattern[pIdx] || pattern[pIdx] === '.')) {
            if (process(s, pattern, sIdx, pIdx + 2)) {
                return true
            }
            sIdx++
        }
        return process(s, pattern, sIdx, pIdx + 2)
    }
    return process(s, pattern, 0, 0)
}