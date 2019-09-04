// 使用栈来完成加减乘除的过程, 记录当前的数值，如果遇到运算符，就将该值和运算符放到栈中
// 遇到括号有两种处理方式:
// 1): 还是使用栈来处理，遇到左括号，仍然往里面push, 直到遇到右括号，这个时候再准备一个栈，将第一个栈中的值依次出栈，直到遇到左括号，然后将新
//  的栈中的值计算出来，push 进之前的栈中
// 2): 使用递归来处理，将遇到一个左括号就看做一个子过程，子过程返回两个信息，一个是该括号中的运算结果，一个是该左括号对应的右括号的坐标
public class Code_07_ExpressionCompute {

	public static int getValue(String str) {
		return value(str.toCharArray(), 0)[0];
	}

	public static int[] value(char[] str, int i) {
        // 栈
        LinkedList<String> que = new LinkedList<String>();
        // 计算每一个数字的值
		int pre = 0;
		int[] bra = null;
		while (i < str.length && str[i] != ')') {
			if (str[i] >= '0' && str[i] <= '9') {
				pre = pre * 10 + str[i++] - '0';
			} else if (str[i] != '(') {
                // 遇到运算符
				addNum(que, pre);
				que.addLast(String.valueOf(str[i++]));
				pre = 0;
			} else {
                // 遇到左括号，当做子过程
                bra = value(str, i + 1);
				pre = bra[0]; // 第一个位置表示子过程计算得到的值
				i = bra[1] + 1;
			}
		}
		addNum(que, pre);
		return new int[] { getNum(que), i };
	}

	public static void addNum(LinkedList<String> que, int num) {
		if (!que.isEmpty()) {
			int cur = 0;
			String top = que.pollLast();
			if (top.equals("+") || top.equals("-")) {
				que.addLast(top);
			} else {
				cur = Integer.valueOf(que.pollLast());
				num = top.equals("*") ? (cur * num) : (cur / num);
			}
		}
		que.addLast(String.valueOf(num));
	}

	public static int getNum(LinkedList<String> que) {
		int res = 0;
		boolean add = true;
		String cur = null;
		int num = 0;
		while (!que.isEmpty()) {
			cur = que.pollFirst();
			if (cur.equals("+")) {
				add = true;
			} else if (cur.equals("-")) {
				add = false;
			} else {
				num = Integer.valueOf(cur);
				res += add ? num : (-num);
			}
		}
		return res;
	}

	public static void main(String[] args) {
		String exp = "48*((70-65)-43)+8*1";
		System.out.println(getValue(exp));

		exp = "4*(6+78)+53-9/2+45*8";
		System.out.println(getValue(exp));

		exp = "10-5*3";
		System.out.println(getValue(exp));

		exp = "-3*4";
		System.out.println(getValue(exp));

		exp = "3+1*4";
		System.out.println(getValue(exp));

	}

}