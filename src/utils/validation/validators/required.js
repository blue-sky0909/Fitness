/**
 * required - validator that checks that value is not empty
 *
 * @param  {String} value
 * @return {String}  error
 */
export default function (value) {
  if (value === undefined ||
    value === null ||
    (typeof value === 'string' && !value.length)) return 'This field is required'

  return null
}
