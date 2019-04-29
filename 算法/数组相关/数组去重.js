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