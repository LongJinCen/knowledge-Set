// 就是将我们的二叉树序列化为字符串，然后再通过该字符串重建出这棵树
// 实际应用: 保存数据

//方式有好几种
// 方式一: 可分别通过先中后序遍历，遇到null用#来代替，每个节点之间的值用下划线分割。序列化之后，可以风别通过其序列化的方式进行反序列化重建整棵树
// 方式二: 按层序列化和反序列化

// 先序方式的序列化和反序列化
function serialize (node) {
    if(node === null) {
        return '#_'
    }
    let result = node.value + '_'
    result += serialize(node.left)
    result += serialize(node.right)
    return result
}
// 先序的方式反序列化
function deserialize(str) {
    let arr = str.split('_')
    return execDeserialize(arr)
}

function execDeserialize(arr) {
    let value = arr.shift()
    if(value === '#') {
        return null
    }
    let head = new Node()
    head.value = value
    head.left = execDeserialize(arr)
    head.right = execDeserialize(arr)
    return head
}


