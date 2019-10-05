// 给定一棵二叉搜索树，请找出其中的第k小的结点。例如,（5，3，7，2，4，6，8）中，按结点数值大小顺序第三小结点的值为4。

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function KthNode(pRoot, k) {
    // write code here
    if (pRoot === null || k <= 0) {
        return null
    }
    let res = []
    function process(pRoot, res) {
        if (pRoot === null) {
            return
        }
        process(pRoot.left, res)
        res.push(pRoot)
        process(pRoot.right, res)
    }
    process(pRoot, res)
    return k <= res.length ? res[k - 1] : null
}