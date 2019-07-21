// 输入一个链表，输出该链表中倒数第k个结点。

function FindKthToTail(head, k) {
    if(!head || k < 0) return
    let listValueArr = []
    while(head) {
        listValueArr.push(head)
        head = head.next
    }
    return listValueArr[listValueArr.length - k]
}