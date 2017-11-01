import Validation from '../Validation'

/**
 * shape - factory function.
 *
 * @param  {Object} rules rules to check an object
 * @return {Function}  validator checks if object is valid by provided rules
 */
export default function (rules) {
  const validation = new Validation(rules)

  return (item) => {
    if (item === undefined || item === null) return null
    return validation.validate(item)
  }
}
