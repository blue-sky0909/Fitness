import Validation from '../Validation'

/**
 * arrayOf - factory function.
 *
 * @param  {Object} rules rules that should work for every item in array
 * @return {Function}  validator
 */
export default function (rules) {
  const validation = new Validation(rules)

  return (items, soft) => {
    if (items === undefined || items === null) return null
    return items.map((item) => validation.validate(item, soft))
  }
}
