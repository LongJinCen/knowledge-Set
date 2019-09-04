public class Code_02_SkipList {

    // 每一个跳表的结构
	public static class SkipListNode {
		public Integer value;
		public ArrayList<SkipListNode> nextNodes; // 一个 SkipListNode 数组，有多长就代表有多少层，每一个位置表示该层上的下一个节点是啥。这里实现的时候，0 代表最高层

		public SkipListNode(Integer value) {
			this.value = value;
			nextNodes = new ArrayList<SkipListNode>();
		}
	}

	public static class SkipListIterator implements Iterator<Integer> {
		SkipList list;
		SkipListNode current;

		public SkipListIterator(SkipList list) {
			this.list = list;
			this.current = list.getHead();
		}

		public boolean hasNext() {
			return current.nextNodes.get(0) != null;
		}

		public Integer next() {
			current = current.nextNodes.get(0);
			return current.value;
		}
	}

	public static class SkipList {
		private SkipListNode head; // 最小的跳表，它的层数根据所有的数据的最大层来确定。如果有更大的层，那么它需要扩大
		private int maxLevel;// 所有数据中的最大层
		private int size;// 表示有多少的 key
		private static final double PROBABILITY = 0.5; // 概率，表示产生 0 的概率， 1-0.5 = 0.5 表示出现 1 的概率
        // 初始化
		public SkipList() {
			size = 0;
			maxLevel = 0;
			head = new SkipListNode(null);
			head.nextNodes.add(null);
		}

		public SkipListNode getHead() {
			return head;
		}
        // 添加一个值
		public void add(Integer newValue) {
			if (!contains(newValue)) {
                //  随机生成层数
				size++;
				int level = 0;
				while (Math.random() < PROBABILITY) {
					level++;
                }
                // 如果层数变大，那么需要更新最小的跳表的层数
				while (level > maxLevel) {
					head.nextNodes.add(null);
					maxLevel++;
                }
                // 开始查找
				SkipListNode newNode = new SkipListNode(newValue);
				SkipListNode current = head;
				do {
					current = findNext(newValue, current, level);
					newNode.nextNodes.add(0, current.nextNodes.get(level)); // 0 表示始终将 node 加在最底层，那么之前加过的，就会被上移
					current.nextNodes.set(level, newNode);
				} while (level-- > 0);
			}
		}

		public void delete(Integer deleteValue) {
			if (contains(deleteValue)) {
				SkipListNode deleteNode = find(deleteValue);
				size--;
				int level = maxLevel;
				SkipListNode current = head;
				do {
					current = findNext(deleteNode.value, current, level);
					if (deleteNode.nextNodes.size() > level) {
						current.nextNodes.set(level, deleteNode.nextNodes.get(level));
					}
				} while (level-- > 0);
			}
		}

		// Returns the skiplist node with greatest value <= e
		private SkipListNode find(Integer e) {
			return find(e, head, maxLevel);
		}

		// Returns the skiplist node with greatest value <= e
		// Starts at node start and level
		private SkipListNode find(Integer e, SkipListNode current, int level) {
			do {
				current = findNext(e, current, level);
			} while (level-- > 0);
			return current;
		}

        // Returns the node at a given level with highest value less than e
        // 找到下一个节点，如果下一个节点的值比当前值小，那么当前节点往右，如果一旦发现下一个值比当前值大，那么返回当前的节点
		private SkipListNode findNext(Integer e, SkipListNode current, int level) {
			SkipListNode next = current.nextNodes.get(level); // 获取 链表中第 level 层的节点
			while (next != null) {
				Integer value = next.value;
				if (lessThan(e, value)) { // e < value
					break;
				}
				current = next;
				next = current.nextNodes.get(level);
			}
			return current;
		}

		public int size() {
			return size;
		}

		public boolean contains(Integer value) {
			SkipListNode node = find(value);
			return node != null && node.value != null && equalTo(node.value, value);
		}

		public Iterator<Integer> iterator() {
			return new SkipListIterator(this);
		}

		/******************************************************************************
		 * Utility Functions *
		 ******************************************************************************/

		private boolean lessThan(Integer a, Integer b) {
			return a.compareTo(b) < 0;
		}

		private boolean equalTo(Integer a, Integer b) {
			return a.compareTo(b) == 0;
		}

	}

	public static void main(String[] args) {

	}

}
