// 每一个节点当中，都有一个 parent 节点， 要求给定一个节点，找出它的前驱节点和后继节点


//后继节点的寻找
// 方式一: 通过 parent 指针找到根节点，再来一个中序遍历，得到一个序列，然后用这个序列来查找 时间复杂度比较高不推荐

// 方式二：分析各种情况，合到一起
// 情况一：如果有右孩子，那么后继节点是该右孩子的最左边的节点
// 情况二：如果没有右孩子，那么寻找的方式就是不断往上寻找，直到当前节点为parent节点的左子树，这时parent就为后继节点

function getSuccedNode (node) {
    if(node === null) return null
    if(node.right) {
        return getLeftNode(node.right)
    } else {
        let parent = node.parent
        while(parent !== null && parent.left !== node) {
            node = parent
            parent = node.parent
        }
        return parent
    }
}

function getLeftNode(node) {
    if(node.left === null) return node
    while(node.left) {
        node = node.left
    }
    return node
}

//前驱节点的寻找
// 方式一: 通过 parent 指针找到根节点，再来一个中序遍历，得到一个序列，然后用这个序列来查找 时间复杂度比较高不推荐

// 方式二：分析各种情况，合到一起
// 情况一：如果有左孩子，那么后继节点是该左孩子的最右边的节点
// 情况二：如果没有左孩子，那么寻找的方式就是不断往上寻找，直到当前节点为parent节点的右子树，这时parent就为前驱节点
function getPrecursorNode (node) {
    if(node === null) return null
    if(node.left) {
        return getLeftNode(node.left)
    } else {
        let parent = node.parent
        while(parent !== null && parent.right !== node) {
            node = parent
            parent = node.parent
        }
        return parent
    }
}

function getRightNode(node) {
    if(node.right === null) return node
    while(node.right) {
        node = node.right
    }
    return node
}