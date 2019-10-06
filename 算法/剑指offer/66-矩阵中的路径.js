// 请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一个格子开始，
// 每一步可以在矩阵中向左，向右，向上，向下移动一个格子。如果一条路径经过了矩阵中的某一个格子，则该路径不能再进入该格子。
// 例如 a b c e s f c s a d e e 矩阵中包含一条字符串"bcced"的路径，但是矩阵中不包含"abcb"路径，
// 因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入该格子。

function hasPath(matrix, rows, cols, path) {
    // write code here
    let matrixArr = [], t = 0
    while (t < rows) {
        matrixArr[t] = []
        let start = t * cols
        for (let i = start; i < start + cols; i++) {
            matrixArr[t].push(matrix[i])
        }
        t++
    }
    let book = []
    for (let i = 0; i < rows; i++) {
        book[i] = new Array(cols).fill(true)
    }
    let flag = false
    let direction = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ]
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (flag) {
                break
            }
            flag = dfs(i, j, 0, path, '')
        }
    }
    function dfs(x, y, step, path, str) {
        if (x < 0 || y < 0 || x >= rows || y >= cols) {
            return step - 1 === path.length - 1
        }
        if (!book[x][y]) {
            return false
        }
        if (matrixArr[x][y] === path[step] && step === path.length - 1) {
            return true
        }
        if (matrixArr[x][y] !== path[step]) {
            return false
        }
        let res = false
        for (let i = 0; i < direction.length; i++) {
            book[x][y] = false
            res = res || dfs(x + direction[i][0], y + direction[i][1], step + 1, path, str + matrixArr[x][y])
            book[x][y] = true
        }
        return res
    }
    return flag
}