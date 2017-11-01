/**
 * bool - validator that checks that value have a boolean type
 *
 * @param  {String} value
 * @return {String}  error
 */
export default function (value) {
  const errorMessage = 'Should be boolean'

  if (value === undefined || value === null) return null
  if (typeof value !== 'boolean') return errorMessage

  return null
}
