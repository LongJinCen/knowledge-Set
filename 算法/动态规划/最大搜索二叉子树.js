// 树形 dp， 需要分析所有的可能性。

// 给定一颗二叉树，求它的最大的一颗子树，且为搜索二叉树
// 思路：以每一个节点为头，求它的最大搜索二叉树
// 三种情况：1) 以当前节点为头结点的整棵树是搜索二叉树
//         2) 搜索二叉树在当前节点的左孩子中
//         3) 搜索二叉树在当前节点的右孩子中

// 对于每一个节点，递归的时候需要搜集一些信息:
//  1): 左树上最大搜索二叉子树的大小（情况1）
//  2): 右树上最大搜索二叉子树的大小（情况2）

//  3): 左树上的最大搜索二叉子树的头部（情况3）
//  4): 右树上的最大搜索二叉子树的头部
//  5): 左树上的最大值
//  6): 右树上的最小值

function BiggestSubBSInTree(head) {
    function Node(value) {
        this.value = value
        this.left = null
        this.right = null
    }
    function RetureType(size, head, min, max) {
        this.size = size
        this.head = head
        this.min = min
        this.max = max
    }
    function process(head) {
        if (!head) {
            return new RetureType(0, null, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
        }
        let leftSubTresInfo = process(head.left)
        let rightSubTresInfo = process(head.right)
        // 可能性3
        let includeItSelf = 0
        if (leftSubTresInfo.head === head.left
            && rightSubTresInfo.head === head.left
            && leftSubTresInfo.max < head.value
            && rightSubTresInfo.min > head.value) {
            includeItSelf = leftSubTresInfo.size + rightSubTresInfo.size + 1
        }
        // 可能性1、2
        let p1 = leftSubTresInfo.size
        let p2 = rightSubTresInfo.size
        let maxSize = Math.max(Math.max(p1, p2), includeItSelf)

        let maxHead = p1 > p2 ? leftSubTresInfo.head : rightSubTresInfo.head
        if (maxSize === includeItSelf) {
            maxHead = head
        }
        return new RetureType(
            maxSize,
            maxHead,
            Math.min(Math.min(leftSubTresInfo.min, rightSubTresInfo.min), head.value),
            Math.max(Math.max(leftSubTresInfo.max, rightSubTresInfo.max), head.value)
        )
    }
}


// 二叉树中，一个节点可以往上走回文往下走，那么节点A总能走到节点B。
// 节点A走到节点B的距离为：A走到B最短路径的节点个数。
// 求一颗二叉树上的最远距离
// 思路：和上面类似，求每一个节点的相关信息。每一个节点都有一个信息，包含以该节点为根节点的
// 的树下的最长距离maxDistance和高度h