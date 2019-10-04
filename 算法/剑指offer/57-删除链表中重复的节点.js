// 在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。
// 例如，链表1->2->3->3->4->4->5 处理后为 1->2->5

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function deleteDuplication(pHead) {
    // write code here
    let stack = []
    while (pHead) {
        let len = stack.length
        if (len === 0 || (len > 0 && stack[len - 1].val === pHead.val)) {
            stack.push(pHead)
        } else {
            let flag = false
            while (len > 1 && stack[len - 1].val === stack[len - 2].val) {
                flag = true
                stack.pop()
                len--
            }
            if (flag) {
                stack.pop()
            }
            stack.push(pHead)
        }
        pHead = pHead.next
    }
    let flag = false,
        len = stack.length
    while (len > 1 && stack[len - 1].val === stack[len - 2].val) {
        flag = true
        stack.pop()
        len--
    }
    if (flag) {
        stack.pop()
    }
    for (let i = 0; i < stack.length - 1; i++) {
        stack[i].next = stack[i + 1]
    }
    if (stack.length > 0) {
        stack[stack.length - 1].next = null
    }
    return stack[0] ? stack[0] : null
}

function deleteDuplication(pHead) {
    //{1,1,2,3,3,4,5,5}
    let pre = head = {
        next: null
    }
    let last = pHead
    while (last) {
        let flag = false
        while (last && last.next && last.val === last.next.val) {
            last = last.next
            flag = true
        }
        if (flag) {
            last = last.next
            if (!last) {
                pre.next = last
            }
        }
        if (!flag) {
            pre.next = last
            pre = pre.next
            last = last.next
        }
    }
    return head.next
}