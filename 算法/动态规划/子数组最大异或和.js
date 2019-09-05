// 给定一个数组，求子数组的最大异或和。
// 一个数组的异或和为，数组中所有的数异或起来的结果。

//方法一: 暴力法O(n^3)：使用 dp 优化O(N^2)。a ^b = c  => a ^ c = b => b = a ^ c


//方法二： 思路：前缀树的应用
// 利用每一个数的二进制，形成前缀树

function maxXorSubarray(arr) {
    if (!arr || arr.length == 0) {
        return 0
    }
    let max = Number.MIN_SAFE_INTEGER
    let eor = 0
    let numTrie = Numtrie()
    numTrie.add(0)
    for (let i = 0; i < arr.length; i++) {
        eor ^= arr[i]
        max = Math.max(max, numTrie.maxXor(eor))
        numTrie.add(eor)
    }
    return max
}

function Node() {
    this.nexts = []
}
function NumTire() {
    let head = new Node()
    // 添加一个数
    function add(num) {
        let cur = head
        for (let move = 31; move >= 0; move--) {
            let path = ((num >> move) & 1) // 从高到低获得每一位
            // 生成前缀树，如果有路就继续往下走，如果没有就新建一个node
            cur.nexts[path] = cur.nexts[path] ? new Node() : cur.nexts[path]
        }
    }
    // 获取最大异或值，num 为 0 ~ i 的异或结果
    function maxXor(num) {
        let cur = head
        let res = 0
        for (let move = 31; move >= 0; move--) {
            let path = ((num >> move) & 1) // 从高到低获得每一位
            // 如果是符号位，那么选着一样的值这样能得到 0， 为正数，否者取反，始终得到 1.best为期待要走的路
            let best = move === 31 ? path : (path ^ 1)
            // 如果有可以走的路，那么就走，否者就取反。这里 best 更新为实际要走的路
            best = cur.nexts[best] ? best : (best ^ 1)
            // 当得到了某一位的值的时候，需要设置到 res 中。
            res |= (path ^ best) << move
        }
        return res
    }
}