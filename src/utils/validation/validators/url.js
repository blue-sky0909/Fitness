/* eslint-disable */
const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
/* eslint-enable */

/**
 * url - validator that checks that value is a valid URL
 *
 * @param  {String} value
 * @return {String}  error
 */
export default function (value) {
  const errorMessage = 'URL is not valid'

  if (value === undefined || value === null) return null
  if (typeof value === 'string' && re.test(value)) return null

  return errorMessage
}
