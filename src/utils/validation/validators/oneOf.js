/**
 * oneOf - validator factory, returns validator that checks if value is one of array items
 *
 * @param  {Array} variants
 * @return {Function}  validator
 */
export default function (variants) {
  return function (value) {
    if (value === null || value === undefined) return null

    return variants.indexOf(value) >= 0 ? null : `Should be one of: ${variants.join(', ')}`
  }
}
