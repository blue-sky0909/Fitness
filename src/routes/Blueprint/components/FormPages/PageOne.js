import '../Blueprint.scss'

import AgeGender from './page-one-components/AgeGender'
import GoalWeight from './page-one-components/GoalWeight'
import BodyFat from './page-one-components/BodyFat'
import WeightHeight from './page-one-components/WeightHeight'
import NursingPregnant from './page-one-components/NursingPregnant'

import ProgressBar from './form-components/ProgressBar'
import NextButton from './form-components/NextButton'
import { updateData } from '../../actions/pageOne'
import { orderGetRequest } from '../../../OrderDetails/reducers/orderGet'

const ReactToastr = require('react-toastr')
const { ToastContainer } = ReactToastr
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation)

class PageOne extends React.Component {

  componentWillMount () {
    const orderId = localStorage.getItem('orderId')
    this.props.orderGetRequest(orderId)
    this.setState({ orderId: orderId })
  }

  constructor ( props ) {
    super(props)
    this.state = {
      disabled: true,
      orderId: '',
      gender: 'female',
      age: '',
      current_weight_imperial: '',
      current_goal_imperial: '',
      height_feet: '',
      height_inches: '',
      fitness_goal: 'Burn fat, lose weight, get toned',
      know_body_fat: 'no',
      body_fat_percentage: '',
      pregnant_months: '',
      are_you_pregnant_or_nursing: 'no_i_am_not_pregnant_or_nursing',
      current_weight_metric: '',
      current_goal_metric: '',
      height_cms: '',
      validationRules: {
        age: {
          unit_system: 'both',
          rules: {
            required: true,
            min: 18,
            max: 100,
          },
          messages: {
            required: 'This field is required',
            min: 'Please enter a value greater than or equal to 18.',
            max: 'Please enter a value less than or equal to 100.',
          }
        },
        current_weight_imperial: {
          unit_system: 'imperial',
          rules: {
            required: true,
            min: 90,
            max: 600,

          },
          messages: {
            required: 'This field is required',
            min: 'Please enter a value greater than or equal to 90.',
            max: 'Please enter a value less than or equal to 600.',
          }
        },
        current_weight_metric: {
          unit_system: 'metric',
          rules: {
            required: true,
            min: 36,
            max: 227,

          },
          messages: {
            required: 'This field is required',
            min: 'Please enter a value greater than or equal to 36.',
            max: 'Please enter a value less than or equal to 227.',

          }
        },
        current_goal_metric: {
          unit_system: 'metric',
          rules: {
            required: true,
            min: 36,
            max: 227,
            right_if: {
              fitness_goal: {
                'Burn fat, lose weight, get toned': {
                  has_to_be: '<',
                  field: 'current_weight_metric',
                },
                'Maintain my current weight': {
                  has_to_be: '==',
                  field: 'current_weight_metric',
                },
                'Gain muscle, add size, bulk up': {
                  has_to_be: '>',
                  field: 'current_weight_metric',
                }
              }
            }
          },
          messages: {
            required: 'This field is required',
            min: 'Please enter a value greater than or equal to 36.',
            max: 'Please enter a value less than or equal to 227.',
            right_if: 'Current weight and goal weight don\'t match physique goal',
          }
        },
        current_goal_imperial: {
          unit_system: 'imperial',
          rules: {
            required: true,
            min: 90,
            max: 600,
            right_if: {
              fitness_goal: {
                'Burn fat, lose weight, get toned': {
                  has_to_be: '<',
                  field: 'current_weight_imperial',
                },
                'Maintain my current weight': {
                  has_to_be: '==',
                  field: 'current_weight_imperial',
                },
                'Gain muscle, add size, bulk up': {
                  has_to_be: '>',
                  field: 'current_weight_imperial',
                }
              }
            }
          },
          messages: {
            required: 'This field is required',
            min: 'Please enter a value greater than or equal to 90.',
            max: 'Please enter a value less than or equal to 600.',
            right_if: 'Current weight and goal weight don\'t match physique goal',
          }
        },
        height_feet: {
          unit_system: 'imperial',
          rules: {
            required: true,
            min: 4,
            max: 8,
          },
          messages: {
            required: 'This field is required',
            min: 'Please enter a value greater than or equal to 4.',
            max: 'Please enter a value less than or equal to 8.',
          }
        },
        height_cms: {
          unit_system: 'metric',
          rules: {
            required: true,
            min: 120,
            max: 245,
          },
          messages: {
            required: 'This field is required',
            min: 'Please enter a value greater than or equal to 120.',
            max: 'Please enter a value less than or equal to 245.',
          }
        },
        height_inches: {
          unit_system: 'imperial',
          rules: {
            required: true,
            max: 11,
          },
          messages: {
            required: 'This field is required',
            max: 'Please enter a value less than or equal to 11.',
          }
        },
        body_fat_percentage: {
          unit_system: 'both',
          rules: {
            required_if: {
              field: {
                value: 'yes',
                key: 'know_body_fat'
              }
            },
          },
          messages: {
            required_if: 'This field is required',
          }
        },
        pregnant_months: {
          unit_system: 'both',
          rules: {
            min: 1,
            max: 9,
            required_if: {
              field: {
                value: 'yes_i_am_pregnant',
                key: 'are_you_pregnant_or_nursing'
              }
            },
          },
          messages: {
            required_if: 'This field is required',
            min: 'Please enter a value greater than or equal to 1.',
            max: 'Please enter a value less than or equal to 9.',
          }
        }
      },
      validationResults: {}
    }
    this.setValue = this.setValue.bind(this)
    //this.onUpdateGender = this.onUpdateGender.bind(this)
    this.validate = this.validate.bind(this)
    this.validateAll = this.validateAll.bind(this)
  }

  isMin ( rule, value ) {
    return value >= rule
  }

  isMax ( rule, value ) {
    return value <= rule
  }

  isRequired ( value ) {
    return !!value
  }

  isRightIf ( field, rules, value ) {
    const keys = Object.keys(rules)
    if ( keys.length ) {
      const base_field = keys[ 0 ]
      const current_rule = rules[ base_field ][ this.state[ base_field ] ]
      switch ( current_rule.has_to_be ) {
        case '==': {
          return parseInt(value) == parseInt(this.state[ current_rule.field ])
        }
        case '>': {
          return parseInt(value) > parseInt(this.state[ current_rule.field ])
        }
        case  '<': {
          return parseInt(value) < parseInt(this.state[ current_rule.field ])
        }
      }
    }
    return true
  }

  setRemoveFieldsError ( field, validation_key, validation_result, filed_messages_rules_reference ) {

    const current_validation_results = this.state.validationResults

    if ( !validation_result ) {
      if ( current_validation_results.hasOwnProperty(field) && current_validation_results[ field ].length ) {
        _.remove(current_validation_results[ field ], ( currentObject ) => {
          return currentObject === filed_messages_rules_reference[ validation_key ]
        })
        current_validation_results[ field ].push(filed_messages_rules_reference[ validation_key ])

        this.setState({ validationResults: current_validation_results })
      } else {
        current_validation_results[ field ] = [ filed_messages_rules_reference[ validation_key ] ]
        this.setState({ validationResults: current_validation_results })
      }
    } else {
      if ( current_validation_results.hasOwnProperty(field) && current_validation_results[ field ].length ) {
        _.remove(current_validation_results[ field ], ( currentObject ) => {
          return currentObject === filed_messages_rules_reference[ validation_key ]
        })
        if ( current_validation_results[ field ].length === 0 ) {
          delete  current_validation_results[ field ]
        }
        this.setState({ validationResults: current_validation_results })
      }
    }

    return validation_result
  }

  removeFieldErrors ( field ) {
    const current_validation_results = this.state.validationResults
    if ( current_validation_results.hasOwnProperty(field) ) {
      delete  current_validation_results[ field ]
      this.setState({ validationResults: current_validation_results })
    }
  }

  validate ( field, values ) {
    if ( typeof  this.state.validationRules[ field ] !== 'undefined' ) {

      const filed_rules_reference = this.state.validationRules[ field ]
      const rules = filed_rules_reference.rules

      if ( !this.shouldThisFieldValidate(field) ) {
        this.removeFieldErrors(field)
      }

      for ( let key in rules ) {
        if ( rules.hasOwnProperty(key) ) {
          switch ( key ) {
            case 'min': {
              this.setRemoveFieldsError(field, key, this.isMin(rules[ key ], values), filed_rules_reference.messages)
              break
            }
            case 'max': {
              this.setRemoveFieldsError(field, key, this.isMax(rules[ key ], values), filed_rules_reference.messages)
              break
            }
            case 'required': {
              this.setRemoveFieldsError(field, key, this.isRequired(values), filed_rules_reference.messages)
              break
            }
            case 'required_if': {
              if ( this.state.hasOwnProperty(field) ) {
                if ( this.state[ rules[ key ].field.key ] === rules[ key ].field.value ) {
                  this.setRemoveFieldsError(field, key, this.isRequired(values), filed_rules_reference.messages)
                } else {
                  this.removeFieldErrors(field)
                }
              }
              break
            }
            case 'right_if': {
              if ( this.state.hasOwnProperty(field) ) {
                this.setRemoveFieldsError(field, key, this.isRightIf(field, rules[ key ], values), filed_rules_reference.messages)
              }
              break
            }
          }
        }
      }
    }
  }

  shouldThisFieldValidate ( key ) {
    if ( this.props.showMetric ) {

      if ( this.state.validationRules[ key ].unit_system === 'metric' ||
        this.state.validationRules[ key ].unit_system === 'both' ) {
        return true
      }
    } else {

      if ( this.state.validationRules[ key ].unit_system === 'imperial' ||
        this.state.validationRules[ key ].unit_system === 'both' ) {
        return true
      }
    }

    return false
  }

  validateAll () {

    if ( this.state.hasOwnProperty('validationRules') ) {

      for ( let key in this.state.validationRules ) {

        if ( this.state.hasOwnProperty(key) ) {
          if ( this.shouldThisFieldValidate(key) ) {
            this.validate(key, this.state[ key ])
          } else {
            this.removeFieldErrors(key)
          }
        }
      }
    }

    if ( this.state.hasOwnProperty('validationResults') && Object.keys(this.state.validationResults).length ) {
      return false
    }

    return true
  }

  setValue ( field, value ) {
    this.setState({ [field]: value })
    this.props.updateData(field, value)
  }

  render () {
    const orderGet = _.filter(this.props.orderGet[ this.state.orderId ].data.included, function ( item ) {
      return item.type == 'infos'
    })

    //console.log(this.props)

    return (
      <section id="blueprint-wrap">
        <div className="container">

          <ToastContainer ref="message"
                          toastMessageFactory={ToastMessageFactory}
                          className="toast-bottom-center"/>
          <form>
            <ProgressBar pageNum="1"/>
            <div className="content">
              <div className="form-wrap">
                <h3>First1</h3>
                <section>

                  <AgeGender setValue={this.setValue} validationResults={this.state.validationResults}
                             validate={this.validate} orderGet={orderGet}/>

                  <GoalWeight setValue={this.setValue} validationResults={this.state.validationResults}
                              validate={this.validate} orderGet={orderGet}/>

                  <WeightHeight setValue={this.setValue} validationResults={this.state.validationResults}
                                validate={this.validate} orderGet={orderGet}/>

                  <BodyFat setValue={this.setValue} validationResults={this.state.validationResults}
                           validate={this.validate} orderGet={orderGet}/>

                  <NursingPregnant setValue={this.setValue} localGender={this.state.gender}
                                   validationResults={this.state.validationResults}
                                   validate={this.validate} orderGet={orderGet}/>

                  <div className="nav-button-wrap">
                    <NextButton nextPage="page-two" label="Next" validateAll={this.validateAll} disabled={this.state.disabled}/>
                  </div>

                </section>
              </div>
            </div>
            <input type="hidden" name="action" value="process_questionnaire_form"/>
          </form>
        </div>
      </section>
    )
  }

}

const mapStateToProps = ( state ) => ({
  orderGet: state.orderGet,
  showMetric: state.progressBarReducer.flag
})

function mapDispatchToProps ( dispatch ) {
  return {
    orderGetRequest: ( orderId ) => dispatch(orderGetRequest(orderId)),
    updateData: ( field, value ) => dispatch(updateData(field, value))
  }

}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PageOne)
