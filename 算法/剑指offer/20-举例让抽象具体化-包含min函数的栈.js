// 定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））。

var arr = [];
function push(node) {
    arr.push(node);
}
function pop() {
    arr.pop();
}
function top() {
    return arr[arr.length - 1];
}
function min() {
    return Math.min.apply(Math, arr);
}
