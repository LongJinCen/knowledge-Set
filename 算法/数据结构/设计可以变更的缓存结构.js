// 设计可以变更的缓存结构(LRU)
// 设计一种缓存结构，该结构在构造时确定大小，假设大小为k， 并有两个功能
// set(key, value) : 将记录插入该结构
// get(key): 返回key对应的value值
// 要求: 1) set 和 get  的时间复杂度为 O(1)
//      2) 某个key的set或get操作一旦发生，认为这个Key的记录成了最经常使用的（放到双向链表的尾部）
//      3) 当缓存的大小超过K时，移除最不经常使用的记录，即set或get最久远的(双向链表的头部)

//思路： 准备一个hashmap(key为key，value为该node节点) 和 一个双向链表(假设头部的优先级最低)。
// set 时：先检查双向链表的长度是否超过给定的 k，如果超过了，需要将双向链表的头部的节点(最不经常使用的节点)删除，并且需要把 hashmap当中的该节点删除，
//         如果没有超过长度, 然后以key 为 key， 并构建一个新的node作为 value 存入hashmap，node存储着key和value。同时将它作为优先级最高的
//         节点挂在双向链表的结尾。

// get 时：直接在 hashmap 里面拿到该 node 节点，直接操作该节点，不需要去双向链表中操作，因为该节点就是双向链表中的引用。
// 然后在双向链表中先将其删除，然后将其挂在双向链表的末尾，作为最高优先级

public class Code_02_LRU {

	public static class Node<V> {
		public V value;
		public Node<V> last;
		public Node<V> next;

		public Node(V value) {
			this.value = value;
		}
	}

	public static class NodeDoubleLinkedList<V> {
		private Node<V> head;
		private Node<V> tail;

		public NodeDoubleLinkedList() {
			this.head = null;
			this.tail = null;
		}

		public void addNode(Node<V> newNode) {
			if (newNode == null) {
				return;
			}
			if (this.head == null) {
				this.head = newNode;
				this.tail = newNode;
			} else {
				this.tail.next = newNode;
				newNode.last = this.tail;
				this.tail = newNode;
			}
		}

		public void moveNodeToTail(Node<V> node) {
			if (this.tail == node) {
				return;
			}
			if (this.head == node) {
				this.head = node.next;
				this.head.last = null;
			} else {
				node.last.next = node.next;
				node.next.last = node.last;
			}
			node.last = this.tail;
			node.next = null;
			this.tail.next = node;
			this.tail = node;
		}

		public Node<V> removeHead() {
			if (this.head == null) {
				return null;
			}
			Node<V> res = this.head;
			if (this.head == this.tail) {
				this.head = null;
				this.tail = null;
			} else {
				this.head = res.next;
				res.next = null;
				this.head.last = null;
			}
			return res;
		}

	}

	public static class MyCache<K, V> {
		private HashMap<K, Node<V>> keyNodeMap;
		private HashMap<Node<V>, K> nodeKeyMap;
		private NodeDoubleLinkedList<V> nodeList;
		private int capacity;

		public MyCache(int capacity) {
			if (capacity < 1) {
				throw new RuntimeException("should be more than 0.");
			}
			this.keyNodeMap = new HashMap<K, Node<V>>();
			this.nodeKeyMap = new HashMap<Node<V>, K>();
			this.nodeList = new NodeDoubleLinkedList<V>();
			this.capacity = capacity;
		}

		public V get(K key) {
			if (this.keyNodeMap.containsKey(key)) {
				Node<V> res = this.keyNodeMap.get(key);
				this.nodeList.moveNodeToTail(res);
				return res.value;
			}
			return null;
		}

		public void set(K key, V value) {
			if (this.keyNodeMap.containsKey(key)) {
				Node<V> node = this.keyNodeMap.get(key);
				node.value = value;
				this.nodeList.moveNodeToTail(node);
			} else {
				Node<V> newNode = new Node<V>(value);
				this.keyNodeMap.put(key, newNode);
				this.nodeKeyMap.put(newNode, key);
				this.nodeList.addNode(newNode);
				if (this.keyNodeMap.size() == this.capacity + 1) {
					this.removeMostUnusedCache();
				}
			}
		}

		private void removeMostUnusedCache() {
			Node<V> removeNode = this.nodeList.removeHead();
			K removeKey = this.nodeKeyMap.get(removeNode);
			this.nodeKeyMap.remove(removeNode);
			this.keyNodeMap.remove(removeKey);
		}

	}

	public static void main(String[] args) {
		MyCache<String, Integer> testCache = new MyCache<String, Integer>(3);
		testCache.set("A", 1);
		testCache.set("B", 2);
		testCache.set("C", 3);
		System.out.println(testCache.get("B"));
		System.out.println(testCache.get("A"));
		testCache.set("D", 4);
		System.out.println(testCache.get("D"));
		System.out.println(testCache.get("C"));

	}

}

/**
 * 缓存算法 LFU: 和 LRU 不同的是，当达到 K 大小的时候，出去的策略是访问次数最少的出去，如果有访问次数最少的相同的几个key，那么将最不经常访问的那个出去。
 * 定义一个双向链表：每一个节点代表访问次数为指定次数。在每一个节点下面，还会挂一个双向链表。该双向链表表示访问次数为 n，的所有 key 的节点。并且和LRU一样。
 * 按照使用的频繁程度，最经常使用的在链表末尾，最不经常使用的在链表的头部。
 * set: 先检查改 key 是否出现过, 如果未出现，直接将其挂在出现次数为 1 的那个节点的下的双向链表的尾部。如果出现过，那么需要找到它所在的那个双向链表的头部是哪一个。
 *      然后将其从该双向链表中移除，并且将其添加到该头部的下一个节点(即出现的次数加一)下的双向链表的尾部。
 * get: 需要将其出现的次数加一，操作步骤和 set 中相同。
 * 需要注意，如果表示出现次数的那个双向链表中的某个节点下面的双向链表的节点数为0时，也需要将该节点移除。
 * 所以在添加的时候，如果发现某一个某一个出现的次数的节点没有，需要新建。
 */

public class Code_03_LFU {

	public static class Node {
		public Integer key;
		public Integer value;
		public Integer times;
		public Node up;
		public Node down;

		public Node(int key, int value, int times) {
			this.key = key;
			this.value = value;
			this.times = times;
		}
	}

	public static class LFUCache {

		public static class NodeList {
			public Node head;
			public Node tail;
			public NodeList last;
			public NodeList next;

			public NodeList(Node node) {
				head = node;
				tail = node;
			}

			public void addNodeFromHead(Node newHead) {
				newHead.down = head;
				head.up = newHead;
				head = newHead;
			}

			public boolean isEmpty() {
				return head == null;
			}

			public void deleteNode(Node node) {
				if (head == tail) {
					head = null;
					tail = null;
				} else {
					if (node == head) {
						head = node.down;
						head.up = null;
					} else if (node == tail) {
						tail = node.up;
						tail.down = null;
					} else {
						node.up.down = node.down;
						node.down.up = node.up;
					}
				}
				node.up = null;
				node.down = null;
			}
		}

		private int capacity;
		private int size;
		private HashMap<Integer, Node> records;
		private HashMap<Node, NodeList> heads;
		private NodeList headList;

		public LFUCache(int capacity) {
			this.capacity = capacity;
			this.size = 0;
			this.records = new HashMap<>();
			this.heads = new HashMap<>();
			headList = null;
		}

		public void set(int key, int value) {
			if (records.containsKey(key)) {
				Node node = records.get(key);
				node.value = value;
				node.times++;
				NodeList curNodeList = heads.get(node);
				move(node, curNodeList);
			} else {
				if (size == capacity) {
					Node node = headList.tail;
					headList.deleteNode(node);
					modifyHeadList(headList);
					records.remove(node.key);
					heads.remove(node);
					size--;
				}
				Node node = new Node(key, value, 1);
				if (headList == null) {
					headList = new NodeList(node);
				} else {
					if (headList.head.times.equals(node.times)) {
						headList.addNodeFromHead(node);
					} else {
						NodeList newList = new NodeList(node);
						newList.next = headList;
						headList.last = newList;
						headList = newList;
					}
				}
				records.put(key, node);
				heads.put(node, headList);
				size++;
			}
		}

		private void move(Node node, NodeList oldNodeList) {
			oldNodeList.deleteNode(node);
			NodeList preList = modifyHeadList(oldNodeList) ? oldNodeList.last
					: oldNodeList;
			NodeList nextList = oldNodeList.next;
			if (nextList == null) {
				NodeList newList = new NodeList(node);
				if (preList != null) {
					preList.next = newList;
				}
				newList.last = preList;
				if (headList == null) {
					headList = newList;
				}
				heads.put(node, newList);
			} else {
				if (nextList.head.times.equals(node.times)) {
					nextList.addNodeFromHead(node);
					heads.put(node, nextList);
				} else {
					NodeList newList = new NodeList(node);
					if (preList != null) {
						preList.next = newList;
					}
					newList.last = preList;
					newList.next = nextList;
					nextList.last = newList;
					if (headList == nextList) {
						headList = newList;
					}
					heads.put(node, newList);
				}
			}
		}

		// return whether delete this head
		private boolean modifyHeadList(NodeList nodeList) {
			if (nodeList.isEmpty()) {
				if (headList == nodeList) {
					headList = nodeList.next;
					if (headList != null) {
						headList.last = null;
					}
				} else {
					nodeList.last.next = nodeList.next;
					if (nodeList.next != null) {
						nodeList.next.last = nodeList.last;
					}
				}
				return true;
			}
			return false;
		}

		public int get(int key) {
			if (!records.containsKey(key)) {
				return -1;
			}
			Node node = records.get(key);
			node.times++;
			NodeList curNodeList = heads.get(node);
			move(node, curNodeList);
			return node.value;
		}

	}
}