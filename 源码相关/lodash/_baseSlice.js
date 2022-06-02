/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
/**
 * 
 * @param {*} array 原始数组
 * @param {*} start 开始下标
 * @param {*} end 结束下标
 * @returns 
 */
// baseSlice([1, 2, 3, 4, 5, 6], 0, 2)
function baseSlice(array, start, end) {
  var index = -1,
    length = array.length;
  //若start<0, 先对start取反,>length 不可用，直接赋值为0，否则为倒数数起始位
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  //数据处理
  // 如果end大于数据长度，则等于数组长度//处理最后一组数组不够数的情况
  end = end > length ? length : end;
  // <0为倒数数起始位
  if (end < 0) {
    end += length;
  }
  // 保证数据合理
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;
