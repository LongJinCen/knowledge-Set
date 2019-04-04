const PENDING = 'pending'
const RESLOVED = 'resolved'
const REJECTED = 'rejected'
function Promise(fn) {
	const that = this
	that.value = null
	that.state = PENDING
	that.resolvedCallbacks = []
	that.rejectedCallbacks = []

	function resolve(v) {
		if (that.state === PENDING) {
			that.value = v
			that.state = RESLOVED
			that.resolvedCallbacks.forEach(cb => cb(that.value))
		}

	}

	function rejected(v) {
		if (that.state === PENDING) {
			that.value = v
			that.state = REJECTED
			this.rejectedCallbacks.forEach(cb => cb(that.value))
		}
	}

	try {
		fn(resolve, rejected)
	} catch(e) {
		rejected(e)
	}
}
Promise.prototype.then = function (onFulfilled, onRejected) {
	const that = this
	onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
	onRejected = typeof onRejected === 'function' ? onRejected : r => {
		throw r
	}
	if(that.state === PENDING) {
		that.resolvedCallbacks.push(onFulfilled)
		that.rejectedCallbacks.push(onRejected)
	}
	if(that.state === RESOLVED) {
		onFulfilled(that.value)
	}
	if(that.state === REJECTED) {
		onRejected(that.value)
	}
}