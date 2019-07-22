// 输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点），返回结果为复制后复杂链表的head。
// （注意，输出结果中请不要返回参数中的节点引用，否则判题程序会直接返回空）

function Clone(pHead) {
    let newHead1 = newHead2 = pHead
    if(!pHead) return null
    while(pHead) {
        let node = new RandomListNode(pHead.label)
        node.next = pHead.next
        pHead.next = node
        pHead = pHead.next.next
    }
    while(newHead1) {
        if(newHead1.random) {
            newHead1.next.random = newHead1.random.next
        } else {
            newHead1.next.random = newHead1.random
        }
        newHead1 = newHead1.next.next
    }

    let head = newHead2.next

    while(newHead2) {
        let node = newHead2.next
        newHead2.next = newHead2.next.next
        newHead2 = newHead2.next
        if(newHead2) {
            node.next = newHead2.next
        } else {
            node.next = null
        }
    }

    return head
}