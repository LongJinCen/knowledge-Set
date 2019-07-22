// 输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）


// 子树
function HasSubtree(pRoot1, pRoot2) {
    if(!pRoot1 || !pRoot2) {
        return false
    }
    let preRoot1 = preOrder(pRoot1)
    let middRoot1 = middOrder(pRoot1)
    let preRoot2 = preOrder(pRoot2)
    let middRoot2 = middOrder(pRoot2)
    return (preRoot1.indexOf(preRoot2) !== -1) && (middRoot1.indexOf(middRoot2) !== -1)
}

function preOrder (node) {
    if(!node) return '#'
    return node.val + '_' + preOrder(node.left) + '_' + preOrder(node.right)
}

function middOrder (node) {
    if(!node) return '#'
    return middOrder(node.left) + '_' + node.val + '_' + middOrder(node.right)
}

// 子结构
function HasSubtree(pRoot1, pRoot2) {
    if(!pRoot1 || !pRoot2) {
        return false
    }
    let result = false
    function find(pRoot1, pRoot2) {
        if(result || !pRoot1) return
        if(pRoot1.val === pRoot2.val) {
            result = compare(pRoot1, pRoot2)
        }
        find(pRoot1.left, pRoot2)
        find(pRoot1.right, pRoot2)
    }
    function compare(pRoot1, pRoot2) {
        if(!pRoot1 && !pRoot2) return true
        if(!pRoot2) return true
        if(!pRoot1) return false
        if(pRoot1.val !== pRoot2.val) return false
        return compare(pRoot1.left, pRoot2.left) && compare(pRoot1.right, pRoot2.right)
    }
    find(pRoot1, pRoot2)
    return false
}

