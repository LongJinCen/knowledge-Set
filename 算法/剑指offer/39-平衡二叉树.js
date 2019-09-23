function IsBalanced_Solution(pRoot) {
    function process(pRoot) {
        if (pRoot === null) {
            return {
                deep: 0,
                isbalanced: true
            }
        }
        let leftInfo = process(pRoot.left)
        if (!leftInfo.isbalanced) {
            return {
                deep: 0,
                isbalanced: false
            }
        }
        let rightInfo = process(pRoot.right)
        if (!rightInfo.isbalanced) {
            return {
                deep: 0,
                isbalanced: false
            }
        }
        return {
            deep: Math.max(leftInfo.deep, rightInfo.deep) + 1,
            isbalanced: Math.abs(leftInfo.deep - rightInfo.deep) <= 1
        }
    }
    return process(pRoot).isbalanced
}