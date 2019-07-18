// 只执行一次的函数

function addEvent(dom, type, handler) {
	if(dom.addEventListener) {
		dom.addEventListener(type, handler, false)
		addEvent = function (dom, type, handler) { // 重新给这个函数赋值
			dom.addEventListener(type, handler, false)
		}
	} else {
		dom.attachEvent('on' + type, handler)
		addEvent = function (dom, type, handler) { // 重新给这个函数赋值
			dom.attachEvent('on' + type, handler) 
		}
	}
}