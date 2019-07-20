// 用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。

var stack1 = [], stack2 = []
function push(node) {
    if(stack2.length > 0) {
        for (let i = 0; i < stack2.length; i++) {
            stack1.push(stack2.pop())
        }
    }
    stack1.push(node)
}
function pop() {
    if(stack1.length > 0) {
        for (let i = 0; i < stack1.length; i++) {
            stack2.push(stack1.pop())
        }
    }
    return stack2.pop()
}