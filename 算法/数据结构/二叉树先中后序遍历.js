// 先中后三种遍历方式的递归实现 一个节点会来三次

// 先序遍历：先在当前节点打印，在打印该节点的所有的左子树，再打印当前节点的右子树
function preOrderTraverse(node) {
    if(node === null) {
        return
    }
    console.log(node.value)
    preOrderTraverse(node.left)
    preOrderTraverse(node.right)
}

// 中序遍历: 先访问当前节点的所有的左子树，再在当前节点打印，再访问当前节点的所有右子树
function midOrderTraverse(node) {
    if(node === null) {
        return
    }
    preOrderTraverse(node.left)
    console.log(node.value)
    preOrderTraverse(node.right)
}

// 后续遍历: 先访问当前节点的所有的左子树，再访问当前节点的所有右子树，再在当前节点打印
function backOrderTraverse(node) {
    if(node === null) {
        return
    }
    preOrderTraverse(node.left)
    preOrderTraverse(node.right)
    console.log(node.value)
}

// 非递归的实现方式，使用栈来实现(递归就是一种栈)

// 先序: 遵循先压右再压左
function preOrderTraverse(node) {
    if(node === null) return
    let stack = []
    stack.push(node)
    while(stack.length) {
        node = stack.pop()
        console.log(node.value)
        if(node.right) {
            stack.push(node.right)
        }
        if(node.left) {
            stack.push(node.left)
        }
    }
}

// 中序: 先一直压左孩子，直到为空，这个时候取出节点，打印，将当前节点赋值为右孩子
function midOrderTraverse(node) {
    if(node === null) {
        return
    }
    let stack = []
    while(stack.length || node !== null) {
        if(node !== null) {
            stack.push(node)
            node = node.left
        } else {
            node = stack.pop()
            console.log(node.value)
            node = node.right
        }
    }
}

// 后序: 用一个栈来存储后序的结果，每次先压右边，再压左边
function backOrderTraverse(node) {
    if(node === null) return
    let stack1 = [], stack2 = []
    stack1.push(node)
    while(stack1.length) {
        node = stack1.pop()
        stack2.push(node.value)
        if(node.left) {
            stack1.push(node.left)
        }
        if(node.right) {
            stack1.push(node.right)
        }
    }
    while(stack2.length) {
        console.log(stack2.pop().value)
    }
}