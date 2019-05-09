// 求一个数组排序之后相邻位置差的最大值，不能用比较排序
// 思路：使用桶排序，如果有N个数，那么就准备N+1个桶，先遍历一遍，求得最大值和最小值，然后将最大值和最小值之间的范围分为10等分，每个桶分别维护当前的最大值和最小值，多出来一个空桶是为了保证
// 最大差值不在桶内，而是响铃桶之间

function maxDiffer(arr) {
    let minValue = Number.MAX_VALUE,
        maxValue = Number.MIN_VALUE,
        len = arr.length;
    if(minValue === maxValue) return 0
    arr.forEach(value => {
        maxValue = value > maxValue ? value : maxValue
        minValue = value < minValue ? value : minValue
    });
    let boolbucket = new Array(len + 1).fill(false),
        maxbucket = new Array(len + 1).fill(Number.MIN_VALUE),
        minbucket = new Array(len + 1).fill(Number.MAX_VALUE);
    maxbucket[0] = minValue
    maxbucket[len] = maxValue
    minbucket[0] = minValue
    minbucket[len] = maxValue
    boolbucket[0] = true
    boolbucket[len] = true
    arr.forEach(value => {
        let index = judge(value, len, minValue, maxValue)
        if(value > maxbucket[index]) {
            maxbucket[index] = value
        } else if (value < minbucket[index]) {
            minbucket[index] = value
        }
        boolbucket[index] = true
    })
    let maxdiffer = 0
    for(let i = 0; i < len; ) { // 从0到第N个桶
        let cur = i,
            next = i + 1
        if(!boolbucket[next]) {
            while(!boolbucket[next]) {
                next++
            }
        }
        if(minbucket[next] - maxbucket[cur] > maxdiffer) {
            maxdiffer = minbucket[next] - maxbucket[cur]
        }
        cur = i = next
        next += 1
    }
}

function judge(value, len, minValue, maxValue) {
    let average = Math.floor((maxValue - minValue) / (len + 1))
    return (value - minValue) % average === 0 ? (value - minValue) / average : (value - minValue) / average + 1
}