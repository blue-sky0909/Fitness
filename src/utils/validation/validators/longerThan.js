/**
 * string - validator that checks that value is longer than N
 *
 * @param  {String} n value
 * @return {Function}  error
 */
export default function (n) {
  return function (value) {
    const errorMessage = `Should be longer than ${n} characters`

    if (value === undefined || value === null) return null
    if (value.length < n) return errorMessage

    return null
  }
}
