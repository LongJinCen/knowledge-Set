// 小Q得到一个神奇的数列: 1, 12, 123,...12345678910,1234567891011...。

// 并且小Q对于能否被3整除这个性质很感兴趣。

// 小Q现在希望你能帮他计算一下从数列的第l个到第r个(包含端点)有多少个数可以被3整除。

// 输入包括两个整数l和r(1 <= l <= r <= 1e9), 表示要求解的区间两端。

// 输出一个整数, 表示区间内能被3整除的数字个数。

const line = readline()
const lines = line.split(' ')
const l = +lines[0]
const r = +lines[1]
let res = 0
let cur = (((l * (1 + l)) / 2) | 0)  - l
for (let i = l; i <= r; i++) {
    cur += i
    if (i >= l) {
        res += cur % 3 === 0 ? 1 : 0
    }
}
print(res)