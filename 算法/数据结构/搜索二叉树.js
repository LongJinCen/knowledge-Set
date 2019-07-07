// 一个节点的左子树都比他小，右子树比它大

// 如何判断：如果中序遍历是升序的，那么这棵树就是搜索二叉树
// 一般不含重复节点，因为一般重复节点是放到一个节点的信息里面，比如存重复了多少次

// 如何判断搜索二叉树代码: 修改自中序遍历非递归版本
function midOrderTraverse(node) {
    if(node === null) {
        return
    }
    let stack = [],
        maxValue = Number.MAX_VALUE
    while(stack.length || node !== null) {
        if(node !== null) {
            stack.push(node)
            node = node.left
        } else {
            node = stack.pop()
            if(node.value > maxValue) return false
            maxValue = node.value
            node = node.right
        }
    }
    return true
}