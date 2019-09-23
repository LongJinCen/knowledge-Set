function TreeDepth(pRoot) {
    function goDeep(root, pathDeep) {
        if (root === null) return pathDeep
        return Math.max(
            goDeep(root.left, pathDeep + 1),
            goDeep(root.right, pathDeep + 1)
        )
    }
    return goDeep(pRoot, 0)
}