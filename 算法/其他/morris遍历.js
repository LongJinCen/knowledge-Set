// 二叉树遍历时，为了回到父节点，二叉树的遍历是需要 O(h) 的空间复杂度的。
// morisi遍历可以做到 O(1) 的空间复杂度。它是利用了二叉树空闲的空间。


// 规则: 来到当前节点 cur
//  1): 如果有左孩子，找到左子树最右边的节点，记为 mostRight
//      1)): mostRight.right 为 null, 让其指向 cur, 然后 cur = cur.left
//      2)): mostRight.right 指向 cur, 让其指向 null, 然后 cur = cur.right
//  2): 如果没有左孩子, 那么 cur = cur.right

// 如果一个节点有左子树，那么会到达两次该节点，如果没有左子树，那么只会到一次。不会像递归版，会到三次
// 第一次到达当前节点：该节点左子树上最右的节点的 right 指向 null
// 第二次到达当前节点：该节点左子树上最右的节点的 right 指向 当前节点

// 为什么能做到 O(N)?
// 因为对于每一个有左子树的节点，就算第一次和第二次到达的时候，都需要去寻找它的左子树的子树
// 但是最右只有 2 次，即有限次。所以还是 O(N)
function morrisIn(head) {
    if (head == null) {
        return
    }
    let cur = head,
        mostRight = null
    while (cur != null) {
        mostRight = cur.left
        if (mostRight != null) {
            while (mostRight.right != null && mostRight.right != cur) {
                mostRight = mostRight.right
            }
            if (mostRight.right == null) {
                mostRight.right = cur
                cur = cur.left
                continue
            } else {
                mostRight.right = null
            }
        }
        cur = cur.right
    }
}

// 先序遍历
function morrisIn(head) {
    if (head == null) {
        return
    }
    let cur = head,
        mostRight = null
    while (cur != null) {
        mostRight = cur.left
        if (mostRight != null) {
            while (mostRight.right != null && mostRight.right != cur) {
                mostRight = mostRight.right
            }
            if (mostRight.right == null) {
                 // 第一次到达
                console.log('先序遍历')
                mostRight.right = cur
                cur = cur.left
                continue
            } else {
                mostRight.right = null
                console.log('中序遍历')
            }
        } else {
            // 没有左子树的时候，也是第一次到达
            console.log('先序遍历')
        }
        cur = cur.right
    }
}

// 中序遍历
function morrisIn(head) {
    if (head == null) {
        return
    }
    let cur = head,
        mostRight = null
    while (cur != null) {
        mostRight = cur.left
        if (mostRight != null) {
            while (mostRight.right != null && mostRight.right != cur) {
                mostRight = mostRight.right
            }
            if (mostRight.right == null) {
                mostRight.right = cur
                cur = cur.left
                continue
            } else {
                mostRight.right = null
            }
        }
        console.log('中序遍历')
        cur = cur.right
    }
}

// 后续遍历
// 只关注能够到达两次的节点，对于这些节点，逆序打印它的左子树的右边界
// 在遍历完成之后，逆序 打印整棵树的右边界
function morrisIn(head) {
    if (head == null) {
        return
    }
    let cur = head,
        mostRight = null
    while (cur != null) {
        mostRight = cur.left
        if (mostRight != null) {
            while (mostRight.right != null && mostRight.right != cur) {
                mostRight = mostRight.right
            }
            if (mostRight.right == null) {
                mostRight.right = cur
                cur = cur.left
                continue
            } else {
                mostRight.right = null
                printEdge(cur.left)
            }
        }
        cur = cur.right
    }
    printEdge(head) // 整棵树的逆序右边界
}