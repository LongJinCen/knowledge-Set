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
			if (script.readyState == "complete") {
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
- Obj.prototype.isPrototypeOf
- Object.create() 当为null的时候__proto__为空

## 原型以及对象常用方法

- Object.create
- instanceOf 判断实例
- Object.keys() 获取实例上所有可枚举的属性
- for in 遍历原型链
- Object.defineProperty(obj,value, {})
- Object.defineProperties(obj, {})

## 判断 src 加载完成

两种方式
- ele.onload
- ele.onreadystatechange 并配合 ele.readyState使用 // ie

## 生成随机数

例如要生成 20 - 89 的随机数。Math.random()*(89 - 20) + 20

## 封装 JSONP
```javscript
function jsonp( url, fn ){
    //构造一个函数到window上
    var fnName="__jsonpFn"+Math.random().toString().replace(".","");
    //创建script标签
    var script=document.createElement("script"),
    //获得页面中的head标签
        head=document.head;
    //设置script标签请求的src，记得带有参数
    script.src=url + "?callback=" + fnName;
    //先绑定函数，再请求更加安全
    window[fnName]=function( data ){ //发回数据调用的内容
        fn(data);  //用户写的函数

        //删除函数，删除内容

        delete window[fnName];
        head.removeChild( script );
    };

    //将script标签加到页面中，浏览器就会自动的请求下载js格式的字符串
    head.appendChild(script);
}
```
## interface 和 class 的区别和关系

## requestAnimationFrame
每 16ms 刷新一次
```
let dom = document.getElementById('root'),
        timer = null
    function animation() {
      let width = dom.offsetWidth
      if (width > 500) {
        cancelAnimationFrame(timer)
        return
      }
      dom.style.width = width + 10 + 'px'
      timer = requestAnimationFrame(animation)
    }
```

## 简单版 Promise
```
let PENDING = 'pending',
        RESOLVE = 'resolved',
        REJECT = 'rejected'
    function Promise(fn) {
      this.value = null
      this.status = PENDING
      this.resolvedCb = []
      this.rejectedCb = []
      let that = this
      function resolve(v) {
        if (that.status === PENDING) {
          that.status = RESOLVE
          that.value = v
          that.resolvedCb.map(cb => cb(v))
        }
      }
      function reject(v) {
        if (that.status === PENDING) {
          that.status = REJECT
          that.v = v
          that.resolvedCb.map(cb => cb(v))
        }
      }
      try {
        fn(resolve, reject)
      } catch (error) {
        throw new Error(error)
      }
    }
    Promise.prototype.then = function (onFullied, onRejected) {
      onFullied = typeof onFullied === 'function' ? onFullied : v => v
      onRejected = typeof onRejected === 'function' ? onRejected : v => v
      if (this.status === PENDING) {
        this.resolvedCb.push(onFullied)
        this.rejectedCb.push(onRejected)
      }
      if (this.status === RESOLVE) {
        onFullied(this.value)
      }
      if (this.status === REJECT) {
        onRejected(this.value)
      }
    }
```
## new
在调用 new 的过程中会发生以上四件事情:
1. 新生成了一个对象
2. 链接到原型
3. 绑定 this
4. 返回新对象

## 缓存位置
1. Service Worker
Service Worker 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能。使用 Service Worker的话，传输协
议必须为 HTTPS。因为 Service Worker 中涉及到请求拦截，所以必须使用 HTTPS 协议来保障安全。
Service Worker 实现缓存功能一般分为三个步骤:首先需要先注册 Service Worker，然后监听到 install 事件以 后就可以缓存需要的文件，那么在下次用户访问的时候就可以通过拦截请求的方式查询是否存在缓存，存在缓存的话 就可以直接读取缓存文件，否则就去请求数据。
2. Memory Cache
浏览器 会把哪些文件丢进内存这个过程就很玄学
3. Disk Cache
Disk Cache 也就是存储在硬盘中的缓存,它会根据 HTTP Herder 中的字段判断哪些资源需要缓存， 哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求
4. Push Cache
5. 网络请求

## 实际场景应用缓存策略
