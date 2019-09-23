function FindFirstCommonNode(pHead1, pHead2) {
    const map = new Map()
    let res = null
    while (pHead1 != null) {
        map.set(pHead1, true)
        pHead1 = pHead1.next
    }
    while (pHead2 != null) {
        if (map.get(pHead2)) {
            res = pHead2
            break
        }
        pHead2 = pHead2.next
    }
    return res
}