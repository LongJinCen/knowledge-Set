
// 给数组添加id,parentid方式，里面的对象属于该数组，不属于外层
function tree1(cur, parentid) {
    let id = 1
    test(cur, parentid)
    function test(cur, parentid) {
        let curid = id
        if(judgeType(cur) === 'Object' || judgeType(cur) === 'Array') {
            cur.parentid = parentid
            cur.id = id++
        }
        for (const key in cur) {
            if (cur.hasOwnProperty(key)) {
                const prop = cur[key];
                if(judgeType(prop) === 'Object' || judgeType(prop) === 'Array') {
                    test(prop, curid)
                }
            }
        }
        return
   }
}

// 不给数组添加id,parentid方式，里面的对象不属于数组，属于外层
function tree2(cur, parentid) {
    let id = 1
    test(cur, parentid)
    function test(cur, parentid) {
        let curid = id
        if(judgeType(cur) === 'Object') {
            cur.parentid = parentid
            cur.id = id++
        }
        for (const key in cur) {
            if (cur.hasOwnProperty(key)) {
                const prop = cur[key];
                if(judgeType(prop) === 'Object') {
                    test(prop, curid)
                } else if (judgeType(prop) === 'Array') {
                    prop.forEach(value => {
                        if(judgeType(value) === 'Object' || judgeType(prop) === 'Array') {
                            test(value, curid)
                        }
                    });
                }
            }
        }
        return
   }
}

function judgeType(key) {
    return Object.prototype.toString.call(key).match(/\[object (.*)\]/)[1]
}

var data = `{
    "name":"winnie",
    "age":20,
    "location":{
       "province":"hubei",
       "city":"wuhan"
    },
    "pets":[
       {
          "type":"dog",
          "name":"Walter",
          "obj": {
              
          }
       }
    ]
 }`
var obj = JSON.parse(data)

tree(obj, 0)

console.log(obj)