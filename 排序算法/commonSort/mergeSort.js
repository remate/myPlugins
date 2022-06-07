const merge = (left, right) => {
    // 合并数组  
    let result = []
    // 使用shift()方法偷个懒,删除第一个元素,并且返回该值  
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }
    //上面为两个都有值时候的操作
    //当剩下的一个还有值就push进去
    while (left.length) {
        result.push(left.shift())
    }
    while (right.length) {
        result.push(right.shift())
    }
    return result
}
let mergeSorts = function (arr) {
    if (arr.length <= 1) return arr
    let mid = Math.floor(arr.length / 2)
    // 拆分数组  
    let left = arr.slice(0, mid), right = arr.slice(mid);
    let mergeLeftArray = mergeSorts(left), mergeRightArray = mergeSorts(right)
    return merge(mergeLeftArray, mergeRightArray)
}
let mergeSort = function (arr, flag = 0) {
    return flag ? mergeSorts(arr).reverse() : mergeSorts(arr)
}
module.exports = mergeSort
