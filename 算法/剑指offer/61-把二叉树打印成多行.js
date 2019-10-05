// 从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行。

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */

function Print(pRoot) {
    // write code here
    if (!pRoot) {
        return []
    }
    let queue = [pRoot],
        res = [],
        start = 0,
        end = queue.length - 1
    while (true) {
        let temp = []
        for (start; start <= end; start++) {
            temp.push(queue[start].val)
            if (queue[start].left) {
                queue.push(queue[start].left)
            }
            if (queue[start].right) {
                queue.push(queue[start].right)
            }
        }
        if (temp.length > 0) {
            res.push(temp)
        }
        end = queue.length - 1
        if (start > queue.length - 1) {
            break
        }
    }
    return res
}