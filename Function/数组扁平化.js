function flattern(arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] instanceof Array) {
            result = result.concat(flattern(arr[i]))
        } else {
            result = result.concat(arr[i])
        }
    }
    return result
}

