// 输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。要求不能创建任何新的结点，只能调整树中结点指针的指向。

function Convert(pRootOfTree) {
    if(!pRootOfTree) return null
    let linkList = []
    function converTreeToLink(curNode) {
        if(!curNode) return
        converTreeToLink(curNode.left, curNode)
        linkList.push(curNode)
        converTreeToLink(curNode.right, curNode)
    }
    converTreeToLink(pRootOfTree)
    linkList[0].left = null
    linkList[linkList.length - 1].right = null
    for (let i = 0; i < linkList.length - 1; i++) {
        linkList[i].right = linkList[i + 1]
        linkList[i + 1].left = linkList[i]
    }
    return linkList[0]
}

