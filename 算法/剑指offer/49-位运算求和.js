function Add(num1, num2) {
    // write code here

    let sum = num1;
    while (num2 != 0) {
        //a与b无进位相加
        sum = num1 ^ num2;
        num2 = (num1 & num2) << 1;
        num1 = sum;
    }
    return sum
}