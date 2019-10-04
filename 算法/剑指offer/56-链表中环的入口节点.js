// 给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null。

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function EntryNodeOfLoop(pHead) {
    // write code here
    let map = new Map()
    while (!map.get(pHead) && pHead !== null) {
        map.set(pHead, true)
        pHead = pHead.next
    }
    return pHead
}