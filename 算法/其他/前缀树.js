// 不断像某一个树里面添加字符串。可以用来处理和前缀以及公共字符串相关的问题

function TreeNode() {
    this.path = 0 // 经过这个节点的路有多少条
    this.end = 0 // 以这个节点结尾的字符串有多少
    // 上面两个数据项可以根据自己的需要来进行更改。例如第一个数据项可以用来知道有多少个以该字符串为前缀的字符串，第二个数据项可以用来知道是否出现过该字符串
    this.nextNode = new Array(24) // 24个字母
}

const root = new TreeNode() // 根节点，所有的添加删除更改都需要从根节点出发

function trie (string){ // 单个字符串插入前缀树
    if(!string) {
        return
    }
    const arrChar = string.split('')
    const node = root
    for (let i = 0; i < arrChar.length; i++) {
        const index = arrChar[i] - 'a'; // 假设输入的字符串在a~z之间
        if(!node.nextNode[index]) {
            node.nextNode[index] = new TreeNode()
        }
        node = node.nextNode[index]
        node.path++
    }
    node.end++
}

// 返回出现的这个字符串的次数
function search(word) {
    if(!word) return
    const node = root
    const arrChar = word.split('')
    for (let i = 0; i < arrChar.length; i++) {
        const index = arrChar[i] - 'a'; // 假设输入的字符串在a~z之间
        if(!node.nextNode[index]) {
            return 0
        }
        node = node.nextNode[index]
    }
    return node.end
}

// 返回公共前缀的字符串的次数
function prefix(word) {
    if(!word) return
    const node = root
    const arrChar = word.split('')
    for (let i = 0; i < arrChar.length; i++) {
        const index = arrChar[i] - 'a'; // 假设输入的字符串在a~z之间
        node = node.nextNode[index]
    }
    return node.path
}

// delete 删除一个字符串
function deleteWord(word) {
    if(!word) return
    if(search(word) === 0) return
    const node = root
    const arrChar = word.split('')
    for (let i = 0; i < arrChar.length; i++) {
        const index = arrChar[i] - 'a'; // 假设输入的字符串在a~z之间
        if(node.path === 1) {
            node.path = 0
            break
        }
        node.path--
        node = node.nextNode[index]
    }
}