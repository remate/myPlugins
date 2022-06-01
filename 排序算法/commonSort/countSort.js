let countSort = function (arr, flag = 0) {
    let min = Math.min(...arr), max = Math.max(...arr), len = arr.length, result = [];
    let d = min < 0 ? -min : 0;
    //若有负数，d为负数的倒数
    // 定义一个临时数组长度为当前 最大值+d+1 并赋值0
    let countArray = new Array(max + d + 1).fill(0)
    for (let i = 0; i < len; i++) {
        // 每个数+d，表示吧所有值转换成>=0的数，因为数组下标>=0
        countArray[arr[i] + d]++
    }
    for (let i = 0; i < countArray.length; i++) {
        // 遍历临时数组，拿到所有值>=1的下标
        if (countArray[i]) {
            let temp = countArray[i]
            result.push(...new Array(temp).fill(i - d))
        }
    }
    return flag ? result.reverse() : result
}
module.exports = countSort