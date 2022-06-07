let quickSorts = function (arr) {
    if (arr.length <= 1) { return arr; }
    var pivot = arr[0];
    var left = [];
    var right = [];
    var mid = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else if (arr[i] > pivot) {
            right.push(arr[i]);
        } else {
            mid.push(arr[i]);
        }
    }
    return quickSorts(left).concat(mid, quickSorts(right));
};
let quickSort = function (arr, flag = 0) {
    return flag ? quickSorts(arr).reverse() : quickSorts(arr)
}
module.exports = quickSort
