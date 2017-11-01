/* eslint-disable */
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
/* eslint-enable */

/**
 * email - validator that checks that value is a valid email address
 *
 * @param  {String} value
 * @return {String}  error
 */
export default function (value) {
  const errorMessage = 'Email address is not valid'

  if (value === undefined || value === null) return null
  if (typeof value === 'string' && re.test(value)) return null

  return errorMessage
}
