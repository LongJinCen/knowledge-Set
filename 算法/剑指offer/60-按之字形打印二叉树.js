// 请实现一个函数按照之字形打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右至左的顺序打印
// 第三行按照从左到右的顺序打印，其他行以此类推。

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
        n = 1,
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
        temp = n % 2 === 1 ? temp : temp.reverse()
        if (temp.length > 0) {
            res.push(temp)
        }
        end = queue.length - 1
        n++
        if (start > queue.length - 1) {
            break
        }
    }
    return res
}