// 输入一颗二叉树的跟节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。
// (注意: 在返回值的list中，数组长度大的数组靠前)

function FindPath(root, expectNumber) {
    let result = []
    function goWay(root, cur, expectNumber, path) {
        if(!root) return
        if(!root.left && !root.right) {
            if(cur + root.val === expectNumber){
                path.push(root.val)
                result.push(path)
            }
            return
        }
        path.push(root.val)
        goWay(root.left, cur + root.val, expectNumber, path.concat([]))
        goWay(root.right, cur + root.val, expectNumber, path.concat([]))
    }
    goWay(root, 0, expectNumber, [])
    result.sort(function(a, b) {
        if (a.length < b.length) {
            return 1
        } else {
            return -1
        }
    })
    return result
}