// 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分，并保证奇数和奇数，偶数和偶数之间的相对位置不变。

function reOrderArray(array){
    let oddArr = [], eventArr = []
    array.forEach(value => {
        value % 2 === 1 ? oddArr.push(value) : eventArr.push(value)
    });
    return oddArr.concat(eventArr)
}
