function isObj(o) {
	return (typeof o === 'object' || typeof o === 'function') && o !== null
}

function deepclone(obj) {
	if (!isObj(obj)) {
		throw new TypeError('不是对象')
	}
	let isArray = Array.isArray(obj)
	let newObj = isArray ? [...obj] : {...obj}
	Object.keys(newObj).forEach(value => {
		newObj[value] = isObj(newObj[value]) ? deepclone(newObj[value]) : newObj[value]
	})
	return newObj
}
