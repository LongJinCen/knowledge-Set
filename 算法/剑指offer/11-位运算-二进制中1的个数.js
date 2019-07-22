// 输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示

// 原码: 将一个数直接转换为二进制，正数的原码最高位为0，负数的最高位原码为1
// 反码、补码: 正数的反码和补码与原码相同，负数的反码是符号位不变，其他位取反，补码是在反码的基础上加一


function NumberOf1(n)
{
    // write code here
    var count = 0
    while(n!==0) {
        count++
        count = count & (count - 1)
    }
    return count
}

// 利用位移, 一次与
function NumberOf1(n){
    var count = 0,
        flag = 1
    while(flag) {
        if(flag & n) count++
        flag = flag << 1
    }
    return count
}