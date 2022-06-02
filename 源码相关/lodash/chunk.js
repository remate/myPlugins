var baseSlice = require('./_baseSlice'),
  isIterateeCall = require('./_isIterateeCall'),
  toInteger = require('./toInteger');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil,
  nativeMax = Math.max;

/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * 
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * _.chunk(['a', 'b', 'c', 'd'], 2);
 * // => [['a', 'b'], ['c', 'd']]
 *
 * _.chunk(['a', 'b', 'c', 'd'], 3);
 * // => [['a', 'b', 'c'], ['d']]
 */
// array = [1, 2, 3, 4, 5, 6]
// chunk(array,2)
function chunk(array, size, guard) {
  if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
    size = 1;
  } else {
    size = nativeMax(toInteger(size), 0);
  }
  // length为得到array的长度 length = 6
  var length = array == null ? 0 : array.length;
  // 如果没有长度值或者size不可用，则直接返回[]
  if (!length || size < 1) {
    return [];
  }

  var index = 0,//指针
    resIndex = 0,//result数组指针
    result = Array(nativeCeil(length / size));//初始化结果[] //6/2=3 Array(3)
// size=2
  while (index < length) {//当处理到的数组值index，依次填充result
    result[resIndex++] = baseSlice(array, index, (index += size));
  }
  return result;
}

module.exports = chunk;
