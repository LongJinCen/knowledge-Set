// 输入一个链表，反转链表后，输出新链表的表头。

function ReverseList(pHead) {
    return reverseList(null, pHead)
}

function reverseList(pre, cur) {
    if(!cur) return pre
    let head = reverseList(cur, cur.next)
    cur.next = pre
    return head
}