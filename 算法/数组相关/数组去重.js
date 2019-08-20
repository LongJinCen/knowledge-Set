function unique1 (arr) {
    return Array.from(new Set(arr))
}

function unique2 (arr) {
    var newArr = [],
        len = arr.length;
    for(let i = 0; i < len; i++){
        if(newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i])
        }
    }
    return newArr
}

function unique3(arr) {
    var newArr = [],
        len = arr.length,
        obj = {}
    for(let i = 0; i < len; i++) {
        if(!obj[arr[i]]) {
            newArr.push(arr[i])
            obj[arr[i]] = true
        }
    }
    return newArr
}

// 对于有对象的去重
function noRepet(arr) {
    const type = judgeType(arr)
    if (!isArrOrObj(arr)) {
        return
    }
    if (type === 'Object') {
        let temp = Object.keys(arr).sort(),
            tempObj = {}
        for (let i = 0; i < temp.length; i++) {
            let val = arr[temp[i]]
            if (isArrOrObj(val)) {
                val = noRepet(val)
            }
            tempObj[temp[i]] = val
        }
        return tempObj
    }
    if (type === 'Array') {
        arr = arr.map(value => {
            if (isArrOrObj(value)) {
                value = noRepet(value)
            }
            return JSON.stringify(value)
        });
        arr = Array.from(new Set(arr))
        arr = arr.map(val => {
            return JSON.parse(val)
        })
        return arr
    }
}

function isArrOrObj(val) {
    const type = judgeType(val)
    return type === 'Array' || type === 'Object'
}
function judgeType (val) {
    return  Object.prototype.toString.call(val).match(/\s(\w+)\]$/)[1]
}
var arr = [1, 2, 2, 3, 3, [2, 4, 5, 6, 2, 4, 5, 6, [1, 1, 1, {a: 1},{a: 1}]]]
var arr1 = [123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]
console.log(noRepet(arr1))