// 地上有一个m行和n列的方格。一个机器人从坐标0,0的格子开始移动，每一次只能向左，右，上，下四个方向移动一格，
// 但是不能进入行坐标和列坐标的数位之和大于k的格子。 例如，当k为18时，机器人能够进入方格（35,37），因为3+5+3+7 = 18。
// 但是，它不能进入方格（35,38），因为3+5+3+8 = 19。请问该机器人能够达到多少个格子？

function movingCount(threshold, rows, cols) {
    // write code here
    let direction = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ]
    let book = [], res = 0
    for (let i = 0; i < rows; i++) {
        book[i] = new Array(cols).fill(true)
    }
    function dfs(x, y) {
        if (x < 0 || y < 0 || x >= rows || y >= cols) {
            return
        }
        if (!book[x][y]) {
            return
        }
        if (getEachNumber(x) + getEachNumber(y) > threshold) {
            return
        }
        res++
        for (let i = 0; i < direction.length; i++) {
            book[x][y] = false
            dfs(x + direction[i][0], y + direction[i][1])
        }
    }
    dfs(0, 0)
    return res
}

function getEachNumber(num) {
    let res = 0
    while ((num / 10).toFixed(1) > 0) {
        res += num % 10
        num = Math.floor(num / 10)
    }
    return res
}