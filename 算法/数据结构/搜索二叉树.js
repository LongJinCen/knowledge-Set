// 一个节点的左子树都比他小，右子树比它大

// 如何判断：如果中序遍历是升序的，那么这棵树就是搜索二叉树
// 一般不含重复节点，因为一般重复节点是放到一个节点的信息里面，比如存重复了多少次

// 如何判断搜索二叉树代码: 修改自中序遍历非递归版本
function midOrderTraverse(node) {
    if(node === null) {
        return
    }
    let stack = [],
        maxValue = Number.MAX_VALUE
    while(stack.length || node !== null) {
        if(node !== null) {
            stack.push(node)
            node = node.left
        } else {
            node = stack.pop()
            if(node.value > maxValue) return false
            maxValue = node.value
            node = node.right
        }
    }
    return true
}

// 搜索二叉树的 增删改查
function AbtractBinarySearchTree(Head) {
    const Root = Head
    let size = 0
    // 搜索一个值
    function search(val) {
        let node = Root
        while (node != null && node.value != null && node.value != val) {
            if (val < node.value) {
                node = node.left
            } else {
                node = node.right
            }
        }
        return node
    }
    // 插入一个值
    function insert(val) {
        if (Root === null) {
            Root = new Node(val)
            size++
            return Root
        }
        let insertParentNode = null
        let searchTempNode = Root
        while (searchTempNode != null && searchTempNode.value != null) {
            insertParentNode = searchTempNode
            if (val < searchTempNode.val) {
                searchTempNode = searchTempNode.left
            } else {
                searchTempNode = searchTempNode.right
            }
        }
        let newNode = new Node(val)
        if (insertParentNode.val > newNode.val) {
            insertParentNode.left = newNode
        } else {
            insertParentNode.right = newNode
        }
    }
    function del(val) {
        
    }
}

// 平衡二叉搜索树 例题: https://www.lintcode.com/problem/the-skyline-problem/description
// 思路：将每一栋大楼的信息拆分: 如[1, 3, 3] 可以拆分为 [1,3,上]和[3,3,下]，表示1位置有一个高度为3的上去，3位置有一个高度为3的下来，
// 然后根据位置排序, 建立一个 平衡二叉搜索树，遍历排序过后的数组， 记录高度，以 高度为 key, 该高度出现的次数为value，如果是上，该value就加一
// 如果是下，该 value 就减一。在遍历的过程当中，需要记录每一个位置的最大高度
// java 代码

public class Building_Outline {
    // 记录每一个位置信息的节点
    /**
     * isUp: 是上还是下
     * posi: 当前位置
     * h: 高度
     */
    public static class Node {
        public boolean isUp;
        public int posi;
        public int h;

        public Node(boolean boRe, int position, int height) {
            isUp = boRe;
            posi = position;
            h = height;
        }
    }
    // 比较器
    public static class NodeComparator implements Comparator<Node> {
        @Override
        public int compare(Node o1, Node o2) {
            if (o1.posi != o2.posi) {
                return o1.posi - o2.posi;
            }
            // 如果在一个位置，那么这里规定 上的在前面
            if (o1.isUp != o2.isUp) {
                return o1.isUp ? -1 : 1;
            }
            return 0
        }
    }
    /**
     * buildings: 二维数组，输入的大楼们
     */
    public static List<List<Interger>> BuildingOutline(int[][] buildings) {
        // 新建一个长度为 2 倍大楼数量的 node 数组，用来记录每一栋大楼的上和下位置的信息
        Node[] nodes = new Node[buildings.length * 2];
        for (int i = 0; i < buildings.length; i++) {
            // true 记录上的信息
            nodes[i * 2] = new Node(true, buildings[i][0], buildings[i][2])
            // false 记录下的信息
            nodes[i * 2 + 1] = new Node(false, buildings[i][1], buildings[i][2])
        }
        // 根据位置排序
        Arrays.sort(nodes, new NodeComparator())
        // 二叉平衡搜索树
        // htMap 用来记录遍历过程
        TreeMap<Interger, Interger> htMap = new TreeMap<>()
        // pmMap用来记录每一个位置的最大高度
        TreeMap<Interger, Interger> pmMap = new TreeMap<>()
        // 遍历排序后的 nodes 数组
        for (int i = 0; i < nodes.length; i++){
            // 如果是往上就 加
            if(nodes[i].isUp) {
                // 以 h 为 key, 出现的次数为 value
                if (!htMap.containsKey(nodes[i].h)) {
                    htMap.put(nodes[i].h, 1)
                } else {
                    // 出现过得话在原有的基础上加 1
                    htMap.put(nodes[i].h, htMap.get(nodes[i].h) + 1)
                }
            } else {
                // 如果是下就 减
                if (htMap.containsKey(nodes[i].h)) {
                    if (htMap.get(nodes[i].h) == 1) {
                        htMap.remove(nodes[i].h)
                    } else {
                        htMap.put(nodes[i].h, htMap.get(nodes[i].h) - 1)
                    }
                }
            }
            // 每遍历一个位置都要把当前位置的最大高度存储起来
            if (htMap.isEmpty()) {
                pmMap.put(nodes[i].posi, 0)
            } else {
                // htMap.lastKey 为获取当前树种的最大高度
                pmMap.put(nodes[i].posi, htMap.lastKey())
            }
        }
        // 根据遍历得到的结果 pmMap， 生成轮廓
        List<List<Interger>> res = new ArrayList<>()
        int start = 0;
        int height = 0
        for(Entry<Integer, Integer> entry : pmMap.entrySet()) {
            int curPosition = entry.gertKey()
            int curMaxHeight = entry.getValue()
            // 如果高度发生了变化
            if (height != curMaxHeight) {
                if (height != 0) {
                    List<Interger> newRecord = new ArrayList<Interger>()
                    newRecord.add(start)
                    newRecord.add(curPosition)
                    newRecord.add(height)
                    res.add(newRecord)
                }
                start = curPosition
                height = curMaxHeight
            }
        }
        return res
    }


}