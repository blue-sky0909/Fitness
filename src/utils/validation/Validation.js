import forEach from 'lodash/forEach'
import some from 'lodash/some'
import pick from 'lodash/pick'
import keys from 'lodash/keys'
import * as validators from './validators'

/**
 * Validation tool
 */
export default class Validation {
  /**
   * constructor - creates new Validation instance
   *
   * @param  {Object} rules object that contains validation rules, like { a: [Validation.is.required] }
   * For each field you can provide one validator or array of validators.
   * You can also provide custom function.
   */
  constructor (rules) {
    this.rules = rules
  }

  /**
   * Contains all available validation functions.
   * Each function can be a validator that recieves value and cheks it or
   * a factory function that creates validator based on some params.
   */
  static is = validators;

  /**
   * validate - validates object and returns all found errors
   *
   * @param  {Object} data object that shpuld be validated
   * @return {Object}      object with errors. It contains error message for each field that failed validation
   */
  validate (data) {
    let errors = {}

    forEach(this.rules, (validators, fieldName) => {
      const checkRule = (validator) => {
        const err = validator(data[fieldName])

        if (err) {
          errors[fieldName] = err
        }
      }

      if (validators instanceof Array) {
        forEach(validators, checkRule)
      } else if (this.rules[fieldName] instanceof Function) {
        checkRule(validators)
      } else {
        throw new Error(`Error in validator config for variable ${fieldName}`)
      }
    })

    return some(errors, (value) =>
      typeof value === 'string' ||
      (value instanceof Array && some(value, x => x !== null)) ||
      (value instanceof Object && !(value instanceof Array))
    ) ? errors : null
  }

  /**
   * removeUnexpectedFields - removes all fields that are not described
   * in rules from object
   * TODO should check object recursively
   *
   * @param  {Object} data object that shpuld be filtered
   * @return {Object}  object without unexpected fields
   */
  removeUnexpectedFields (data) {
    return pick(data, keys(this.rules))
  }
}
