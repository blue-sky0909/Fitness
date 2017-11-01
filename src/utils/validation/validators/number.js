/**
 * string - validator that checks that value is a number
 *
 * @param  {String} value
 * @return {String}  error
 */
export default function (value) {
  const errorMessage = 'Should be number'

  if (value === undefined || value === null) return null
  if (typeof value !== 'number') return errorMessage

  return null
}
