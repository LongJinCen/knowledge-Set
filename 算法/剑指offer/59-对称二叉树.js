// 请实现一个函数，用来判断一颗二叉树是不是对称的。
// 注意，如果一个二叉树同此二叉树的镜像是同样的，定义其为对称的。

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function isSymmetrical(pRoot) {
    // write code here
    function midseq(head) {
        if (head === null) {
            return '_#'
        }
        let left = midseq(head.left)
        let right = midseq(head.right)
        return left + '_' + head.val + right
    }
    let seqs = midseq(pRoot).split('_')
    let preSeqs = seqs.join('')
    let revSeqs = seqs.reverse().join('')
    return preSeqs === revSeqs
}

function isSymmetrical(pRoot) {
    // write code here
    if(!pRoot) return true
    function process(left, right) {
        if (left === null) {
            return right === null
        }
        if (right === null) {
            return false
        }
        if (left.val !== right.val) {
            return false
        }
        return process(left.left, right.right) && process(left.right, right.left)
    }
    return process(pRoot.left, pRoot.right)
}