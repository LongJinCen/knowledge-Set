## 类型转换

- 空字符 -> false
- 0和NaN -> false
- null -> false
- undefined -> false

## iframe
阻塞onload事件，解决办法是使用src属性
- window.frames['name'] //获取
- iframeEle.contentWindow //获取
- window.self // 自己
- window.parent // 父亲
- window.top // 顶部

### 父子窗口通信
- document.domain
- window.location.hash
- window.name // 需要将子iframe替换成同源的页面，否者跨域不能取得

## 回流重绘

https://segmentfault.com/a/1190000017506726

- async 异步加载完立即执行
- defer 异步加载完在DOMConentLoaded前执行
- js阻塞dom解析
- css 不阻塞dom解析 但阻塞渲染过程
- js会等待前面的css加载完毕再执行

## 正则表达式
- 非贪婪: 将?紧跟在任何量词 *、 +、? 或 {} 的后面

## 判断带有src属性的资源加载完毕
```
	var script = document.createElement('script')
	script.type = 'text/javascript'
	script.src = 'demo.js' //异步加载
	if (script.readyState) { 
		script.onreadystatechange = function () {
			if (script.readyState = "complete") {
				//资源加载完毕
			}
		} //IE
	} else {
		script.onload = function () {
			//资源加载完毕
		} // 非IE
	}
	document.head.appendChild(script)
```

## javaScript加载时间线
1. 创建Document对象开始解析页面: document.readyState == 'loading'
2. 遇到link创建线程加载，继续解析文档
3. 遇到js(前面说过)
4. src属性都是异步加载，不阻塞dom解析
5. 文档解析完成: document.readyState = 'interactive'
7. 文档解析完成，defer脚本按顺序执行
8. 触发DOMContentLoaded事件
9. 所有的资源加载完毕的时候，document.readyState = 'complete',紧接着触发load事件


## 事件
### 阻止默认事件
- return false
- event.preventDefault() // ie9以下不兼容
- event.returnValue = false // 兼容ie
### 绑定 解除
- ele.onxxx = function(event) {} // this为ele           ele.onxxx = false/null
- ele.addEventListener(type, fn, false) // this为ele    removeEventListener(type, fn, false)
- ele.attachEvent('on' + type, fn) // this为window      detachEvent('on' + type, fn)

### 事件模型

1. 捕获: 
2. 执行: 执行阶段按照绑定的顺寻进行，即使是先绑定的冒泡模型再绑定的是捕获模型
3. 冒泡: 用event.stopPropagation()取消冒泡 ie为event.cancleBubble = true

### 事件对象 

- window.event: 事件对象
- window.event.target: 事件源对象 (可用来做事件委托)

## 预编译
1. 创建AO对象
2. 查找形参和变量声明
3. 实参和形参的值相统一
4. 查找函数声明

## 作用域[[scope]]

在函数被定义的时候生成，存储的是引用而不是副本，运行时会添加一个活动对象

## 闭包


- 被引用了作用域的函数执行完毕后，只是切断了对自己作用域的引用，但是被返回的函数还引用着它的作用域，因此不会被销毁
- 内部函数执行完毕只销毁自己的上下文，它的[[scope]]在外部函数执行完毕之后会被销毁

## this

箭头函数的this指向创建时的上下文，如果被创建时的上下文的this变化，那么箭头函数内部的this也会跟着变。

## 拷贝
- 深拷贝： `JSON.parse(JSON.stringify(obj))`

## 创建对象
- 工厂模式
- 构造函数模式
- 原型模式
- 组合使用构造函数和原型模式

## 继承

- 直接使用原型链  A.prototype = new B()
- 组合继承 原型链加上call apply
- 寄生组合 object.create()加上apply call, 如下
```
function Father (name, age) {
	this.name = name
	this.age = age
}
Father.prototype.sayhello = function () {
	console.log('hello')
}

function Son (name, age, height) {
	Father.call(this, name, age)
	this.height = height
}

Son.prototype = Object.create(Father.prototype)
Son.prototype.constructor = Son
Son.prototype.sayHi = function () {}
	console.log('Hi')
}

```

- instanceof
- func.prototype.isPrototypeOf
- Object.create() 当为null的时候__proto__为空
- 

## 原型以及对象常用方法

- Object.create
- instanceOf 判断实例
- Object.keys() 获取实例上所有可枚举的属性
- for in 遍历原型链
- Object.defineProperties(obj,value, {})
- Object.defineProperty(obj, {})

## 判断 src 加载完成

两种方式
- ele.onload 
- ele.onreadystatechange 并配合 ele.readyState使用 // ie

