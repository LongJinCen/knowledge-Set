// 并查集使用来判断两个元素是否属于同一个集合, 以及用来合并两个集合
// 需要在最开始的时候一次性将样本给它

// 设计：最开始各自成为一个集合，然后不断根据指向关系连起来，注意：每一个集合的头结点是自己指向自己
// 查找的时候不断往上找，直到找到一个节点的上一个节点指向自己

// 判断A、B两个集合是同一个集合的方法: 从这两个节点不断往上找，找到的哪一个顶节点都是同一个
// 合并两个集合: 根据指向关系，将节点少的那个集合的顶部节点指向集合节点数多的那一个顶部节点
// 优化：任何一次查找的过程当中，将该节点到父节点查找的过程当中所有经过的节点全部打平，即这些节点直接指向最终的父节点
//其他的节点关系不变

function Node() {} // 节点

/**
 *
 * @param {Node} list 一个由Node组成的List
 */
function unionFindSet(list) {
    var fatherMap = new Map()
    var sizeMap = new Map()
    for (let i = 0; i < list.length; i++) {// 初始化
        const element = list[i];
        fatherMap.set(element, element)
        sizeMap.set(element, 1)
    }
    function findHead(node) {
        var father = fatherMap.get(node) // 获取父节点
        if(father !== node) {   // 如果不是自己就继续去找父节点
            father = findHead(father)
        }
        fatherMap.set(node, father) // 找到了之后将沿途的所有节点的fatern节点都设置为一个节点
        return father
    }
    function isSameSet(aNode, bNode) {
        return findHead(aNode) === findHead(bNode)
    }
    function union(aNode, bNode) { // 合并集合
        if(a === null || b === null) {
            return null
        }
        aHead = findHead(aNode)
        bHead = findHead(bNode)
        aLength = sizeMap.get(aHead)
        bLength = sizeMap.get(bHead)
        if(aLength > bLength) {
            fatherMap.set(bHead, aHead)
            sizeMap.set(aHead, aLength + bLength) // 更新节点数
        } else {
            fatherMap.set(aHead, bHead)
            sizeMap.set(bHead, aLength + bLength) // 更新节点数
        }
    }
}

// 一个矩阵，由0和1组成，所有连着的1为一个岛，求这个矩阵里面有几个岛

function countIsLands(arr) {
    if(arr === null || arr[0] === null) return
    var N = arr.length
    var M = arr[0].length
    var totalLands = 0
    for (let i = 0; i < N; i++) {
        for(let j = 0; j < M; j++) {
            if(arr[i][j] === 1) {
                totalLands ++
                infect(arr, i, j, N, M)
            }
        }
    }
    function infect(arr, i, j, N, M) {
        if(i < 0 || i >= N || j < 0 || j >= M || arr[i][j] !== 1) {
            return
        }
        arr[i][j] === 2
        infect(arr, i + 1, j, N, M)
        infect(arr, i - 1, j, N, M)
        infect(arr, j + 1, j, N, M)
        infect(arr, j + 1, j, N, M)
    }

    return totalLands
}

// 如果是给你一个多CPU或者多机器，那么可以将矩阵分块计算，最后通过并查集连接起来，问题是边界上的同一个岛被分成了两个岛
// 所有步骤是先将分块的数据分别计算出各自有多少个岛，然后再处理边界上相连的两个是否是属于同一个集合
// 利用并查集，在infect的时候，将每一块的岛建立并查集，最后在合并的时候遍历边界，如果都是1说明是在一个岛的，为了保证下面不重复减
// 这个时候需要先通过并查集判断是否在同一个集合里面，如果没有那么就讲两个集合合并，岛的数量减一，那么下面的边界判断的时候
// 如果是同一个集合，那么在第一次就已经合并了，所以查出来的时候是同一个集合，岛的数量不会减一，这就达到了合并集合的过程当中，
// 不会重复减 
// 使用并查集保证了在合并的过程当中，不会重复的减