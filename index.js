function shuffleArray (arr, len) {
    let book = new Array(arr.length).fill(0)
        book1 = new Array(arr.length).fill(true)
    for(let i = 0; i < arr.length; i++) {
        let positon = Math.floor(Math.random()*arr.length)
        while(!book1[positon]) {
            positon = Math.floor(Math.random()*arr.length)
        }
        book1[positon] = false
        book[positon] = arr[i]
    }
    console.log(book1)
    return book1
}

shuffleArray([1,2,3,4,5], 4)



function find(arr, N) {
    var obj = {}, result;
    for(let i = 0; i < arr.length; i++) {
        if(obj[arr[i]] >= 1) {
            result = arr[i]
            break;
        }
        obj[arr[i]] = 1
    }
    return result
}

function TreeNode() {
    this.value = null
    this.left = null
    this.right = null
}

function haspath(root, value, sum) {
    if(root.left === null && root.right === null) {
        if (value === sum) return true
        else return false
    }
    return haspath(root.left, value, sum += root.value) || haspath(root.right, value, sum += root.value)
}

function find(arr, N) {
    let result = []
    for(let i = 0; i < arr.length; i ++) {
        if(judge(arr[i])) {
            result.push(arr[i])
        }
    }
}

function judge(number) {
    if(number === 1) {
        return true
    }
    if(number === 0) {
        return false
    }
    let arr = [],
        length = 0,
        newNumber = number,
        flag = false
        result = true;
    while(newNumber >= 1) {
        newNumber = newNumber / 10
        length++
    }
    
    while(number % 10 > 0) {
        if(arr.length === length ) {
            flag = true
        }
        let i = number % 10
        if(flag) {
            let temp = arr.pop()
            result = temp === i ? true : false;
            if(!result) {
                break;
            }
        } else {
            arr.push(i)
        }
    }
    return result
}
