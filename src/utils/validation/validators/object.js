/**
 * string - validator that checks that value is a string
 *
 * @param  {String} value
 * @return {String}  error
 */
export default function (value) {
  const errorMessage = 'Should be object'

  if (value === undefined || value === null) return null
  if (typeof value !== 'object') return errorMessage

  return null
}
