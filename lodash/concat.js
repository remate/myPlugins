var arrayPush = require('./_arrayPush'),
    baseFlatten = require('./_baseFlatten'),
    copyArray = require('./_copyArray'),
    isArray = require('./isArray');

/**
 * Creates a new array concatenating `array` with any additional arrays
 * and/or values.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to concatenate.
 * @param {...*} [values] The values to concatenate.
 * @returns {Array} Returns the new concatenated array.
 * @example
 *
 * var array = [1];
 * var other = _.concat(array, 2, [3], [[4]]);
 *
 * console.log(other);
 * // => [1, 2, 3, [4]]
 *
 * console.log(array);
 * // => [1]
 */
function concat() {
  var length = arguments.length;
  if (!length) {
    return [];
  }
  var args = Array(length - 1),//初始化args
      array = arguments[0],
      index = length;

  while (index--) {
    args[index - 1] = arguments[index];
    //所有参数不管是不是数组先传入args
  }
  // [array]第一个参数都会以数组形式
  return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
}

module.exports = concat;
