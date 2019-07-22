// 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
//例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

// 思路: 通过先序遍历，将中序划分为两部分，左子树和右子树，然后再根据左子树和右子树的节点数目，去划分先序遍历的左右子树的遍历顺序，再分别递归左右子树
function reConstructBinaryTree(pre, vin) {
    console.log(pre, vin)
    if(pre.length === 0) {
        return null
    }
    if (pre.length === 1) {
        return {
            val: pre[0],
            left: null,
            right: null
        }
    }
    let root = pre[0]
    let rootIndexVin = vin.indexOf(root)
    let vinLeftSequence = vin.slice(0, rootIndexVin),
        vinRightSequence = vin.slice(rootIndexVin + 1, vin.length)
    pre.shift()
    let preLeftSequence = pre.slice(0, vinLeftSequence.length),
        preRightSequence = pre.slice(vinLeftSequence.length, pre.length)
    let left = reConstructBinaryTree(preLeftSequence, vinLeftSequence)
    let right = reConstructBinaryTree(preRightSequence, vinRightSequence)
    return {
        val: root,
        left: left,
        right: right
    }
}
var result = reConstructBinaryTree([1,2,4,7,3,5,6,8], [4,7,2,1,5,3,8,6])