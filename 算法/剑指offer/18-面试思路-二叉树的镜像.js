// 操作给定的二叉树，将其变换为源二叉树的镜像。

function Mirror(root) {
    if(!root) return null
    exchange(root, root.left)
    exchange(root, root.right)
    swap(root, root.left, root.right)
    return root
}

function exchange(parent, cur) {
    if(!cur) return
    exchange(cur, cur.left)
    exchange(cur, cur.right)
    swap(cur, cur.left, cur.right)
}

function swap(root, left, right) {
    let temp = left
    root.left = right
    root.right = temp
}