// 给定一个二叉树和其中的一个结点，请找出中序遍历顺序的下一个结点并且返回。
// 注意，树中的结点不仅包含左右子结点，同时包含指向父结点的指针。

/*function TreeLinkNode(x){
    this.val = x;
    this.left = null;
    this.right = null;
    this.next = null;
}*/
function GetNext(pNode) {
    // write code here
    if (!pNode) {
        return null
    }
    if (pNode.right) {
        let next = pNode.right
        while (next.left) {
            next = next.left
        }
        return next
    }
    let parent = pNode.next
    while (parent && pNode !== parent.left) {
        pNode = parent
        parent = parent.next
    }
    return parent
}