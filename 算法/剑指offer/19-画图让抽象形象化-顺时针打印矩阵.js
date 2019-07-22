// 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字，
// 例如，如果输入如下4 X 4矩阵： 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 则依次打印出数字1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.

function printMatrix(matrix) {
    let result = []
    let leftTopX = 0, leftTopY = 0;
    let rightBottomX = matrix.length - 1, rightBottomY = matrix[0].length - 1
    while(leftTopX <= rightBottomX && leftTopY <= rightBottomY) {
        printAround(matrix, result, leftTopX, leftTopY, rightBottomX, rightBottomY)
        leftTopX++
        leftTopY++
        rightBottomX--
        rightBottomY--
    }
    return result
}

function printAround(matrix, result, x1, y1, x2, y2) {
    if(x1 === x2){
        for (let i = y1; i <= y2; i++) {
            result.push(matrix[x1][i])
        }
        return
    }
    if(y1 === y2) {
        for (let i = x1; i <= x2; i++) {
            result.push(matrix[i][y1])
        }
        return
    }
    let i = x1, j = y1
    while(j <= y2) {
        result.push(matrix[i][j])
        j++
    }
    j--
    i++
    while(i <= x2) {
        result.push(matrix[i][j])
        i++
    }
    i--
    j--
    while(j >= y1) {
        result.push(matrix[i][j])
        j--
    }
    j++
    i--
    while(i > x1) {
        result.push(matrix[i][j])
        i--
    }
}