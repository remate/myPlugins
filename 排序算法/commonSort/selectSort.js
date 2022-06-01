let selectSort = function (arr, flag = 0) {
    let len = arr.length, temp = 0;
    // 一共需要排序len-1次   
    for (let i = 0; i < len - 1; i++) {
        temp = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[temp])//遍历取出剩下数组值中最小的值
                temp = j;
        }
        // 每一趟保证第i位为最小值      
        // if (temp !== i) {//不需要判断，肯定不相等
        [arr[i], arr[temp]] = [arr[temp], arr[i]]
        // }
    }
    return flag ? arr.reverse() : arr
}
module.exports = selectSort