/* eslint-disable */
const re = /^[\+\-\s\(\)0-9]{8,}$/
/* eslint-enable */

/**
 * phone - validator that checks that value is a valid phone number
 *
 * @param  {String} value
 * @return {String}  error
 */
export default function (value) {
  const errorMessage = 'Phone is not valid'

  if (value === undefined || value === null) return null
  if (typeof value === 'string' && re.test(value)) return null

  return errorMessage
}
