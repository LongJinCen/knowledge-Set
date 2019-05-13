// 平衡二叉树: 对于树中的任何一个节点，它的左子树和右子树的高度差不超过一

// 方法：递归遍历判断每一个节点是否为二叉平衡树，给上级返回的数据结构包含 两个部分：当前节点是否是平衡的，当前左右子树高度最大的加一

function banlaceBinaryTree(node) {
    if(node === null) {
        return {
            h: 0,
            isBanlace: true
        }
    }
    let left = banlaceBinaryTree(node.left)
    if(!left.isBanlace) {
        return {
            h: 0,
            isBanlace: false
        }
    }
    let right = banlaceBinaryTree(node.right)
    if(!right.isBanlace) {
        return {
            h: 0,
            isBanlace: false
        }
    }
    if(Math.abs(left.h - right.h) > 1) {
        return {
            h: 0,
            isBanlace: false
        }
    }
    return {
        h: Math.max(left.h, right.h) + 1,
        isBanlace: true
    }
}