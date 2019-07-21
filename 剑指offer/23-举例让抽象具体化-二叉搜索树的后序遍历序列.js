// 输入一个整数数组，判断该数组是不是某     二叉搜索树    的后序遍历的结果。如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同

function VerifySquenceOfBST(sequence) {
    if(sequence.length === 0) return false
    return isSearchTree(sequence, 0, sequence.length - 1)
}

function isSearchTree(arr, left, right) {
    if(left >= right) return true
    let i = left
    while(arr[i] < arr[right] && i < right) {
        i++
    }
    let result = isSearchTree(arr, left, i - 1) && isSearchTree(arr, i, right - 1)
    for (let j = i; j < right; j++) {
        if(arr[j] < arr[right]){
            result =  false
            break
        }
    }
    return result
}