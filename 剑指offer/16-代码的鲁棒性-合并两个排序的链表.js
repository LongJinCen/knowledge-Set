// 输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。

function Merge(pHead1, pHead2) {
    if(!pHead1) return pHead2
    if(!pHead2) return pHead1
    let minHead = head = pHead1,
        otherHead = pHead2;
    if (pHead1.val >= pHead2.val) {
        minHead = head = pHead2
        otherHead = pHead1
    }
    while(minHead && otherHead) {
        while(minHead.next && (minHead.next.val < otherHead.val)) {
            minHead = minHead.next
        }
        if(!minHead.next) break
        let temp = otherHead
        otherHead = otherHead.next

        temp.next = minHead.next
        minHead.next = temp
    }
    if(otherHead) {
        minHead.next = otherHead
    }
    return head
}


function Merge(pHead1, pHead2) {
    if(!pHead1) return pHead2
    if(!pHead2) return pHead1
    let newArr = []
    while(pHead1 && pHead2) {
        if(pHead1.val <= pHead2.val) {
            newArr.push(pHead1)
            pHead1 = pHead1.next
        } else {
            newArr.push(pHead2)
            pHead2 = pHead2.next
        }
    }
    while(pHead1) {
        newArr.push(pHead1)
        pHead1 = pHead1.next
    }
    while(pHead2) {
        newArr.push(pHead2)
        pHead2 = pHead2.next
    }
    for (let i = 0; i < newArr.length - 1; i++) {
        newArr.next = newArr[i + 1]
    }
    return newArr[0]
}
