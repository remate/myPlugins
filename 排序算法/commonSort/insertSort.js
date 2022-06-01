let insertSort = function (arr, flag = 0) {
    let len = arr.length
    for (let i = 0; i < len; i++) {

        let preIndex = i - 1, cur = arr[i];//preIndex = i-1,cur为当前数组取值
        while (preIndex >= 0 && arr[preIndex] > cur) {//如果满足preIndex>=0并且，这个取值小于前一个数值   其实就是依次向前交换位置
            arr[preIndex + 1] = arr[preIndex]
            preIndex--;
        }
        //当哪一位大于当前取值后则不需要操作，把当前取值赋值为当前的arr[preIndex + 1]
        arr[preIndex + 1] = cur
    }
    return flag ? arr.reverse() : arr
}
module.exports = insertSort