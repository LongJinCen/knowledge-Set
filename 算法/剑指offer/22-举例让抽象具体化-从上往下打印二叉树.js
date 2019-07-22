// 从上往下打印出二叉树的每个节点，同层节点从左至右打印。

function PrintFromTopToBottom(root) {
    if(!root) return []
    let queue = [root], result = []
    let head = tail = 0
    while(head <= tail) {
        let node = queue[head]
        result.push(node.val)
        if(node.left) {
            queue.push(node.left)
            tail++
        }
        if(node.right) {
            queue.push(node.right)
            tail++
        }
        head++
    }
    return result
}