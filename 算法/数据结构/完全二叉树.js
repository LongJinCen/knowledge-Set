// 通过层遍历(使用队列): 满足下列情况的时候，则不是完全二叉树
//1. 有右孩子没有左孩子
//2. 当左右孩子不全的时候，除去上面的情况(即有左没右或者左右孩子都没有)，后面的节点必须全部是叶子节点

function completeBinaryTree(node) {
    if(node === null) return false
    let queue = [],leaf = false
    queue.push(node)
    while(queue.length) {
        let head = queue.shift()
        let left = head.left,
            right = head.right;
        if(leaf && (right || left) || left === null && right !== null) {
            return false
        }
        if(left) queue.push(left)
        if(right) queue.push(right)
        if(!left || !right){
            leaf = true
        } 
    }
}

// 求完全二叉树的节点个数，要求时间复杂度低于O(N)
// 理论依据: 一颗高度为 h 满二叉树的节点个数，它的节点个数是 2^h - 1个
// 求解方法：需要在最开始的时候求一次的该满二叉树的总高度 h，利用完全二叉树左边界高度的特点，对于每一个节点，进行如下判断
//  1. 求其节点的右孩子的左边的高度
//  2. 如果到了最后一层 h，表明该节点左边是满二叉树，利用公式2^当前节点下的树的高度 - 1 + 1（当前节点），得到当前左边的节点个数加上当前节点，然后去递归右节点
//  3. 如果没到最后一层，说明右边节点是一颗满二叉树，还是利用上面的公式求得右边的总节点个数，然后去递归左节点

/**
 * 
 * @param {node} head 该满二叉树的头节点
 */
function nodeNum(head) {
    if(head == null) {
        return 0
    }
    return bs(head, 1, mostLeftLevel(head, 1))
}

/**
 * 
 * @param {node} node 当前头节点
 * @param {number} level 当前头节点所在层级
 * @param {number} h 该满二叉树的总高度
 */
function bs(node, level, h) {
    if(level === h) { // 该节点已经到了最后一层，那么节点数就为 1
        return 1
    }
    if (mostLeftLevel(node.right, l + 1) === h) {
        return (1 << (h - level)) + bs(node.right, l + 1, h)
    } else {
        return (1 << (h - level - 1)) + bs(node.left, level + 1, h)
    }
}

/**
 * 
 * @param {node} node 
 * @param {number} level 当前接节点已经在的高度
 */
function mostLeftLevel(node, level) {
    while(node !== null) {
        level ++
        node = node.left
    }
    return level - 1
}