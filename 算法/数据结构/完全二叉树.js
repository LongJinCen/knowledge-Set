// 通过层遍历(使用队列): 满足下列情况的时候，则部位完全二叉树
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
