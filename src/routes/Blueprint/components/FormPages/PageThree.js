import '../Blueprint.scss'
import Dieting from './page-three-components/Dieting'
import MacrosCalories from './page-three-components/MacrosCalories'
import FatAndDiet from './page-three-components/FatAndDiet'

import ProgressBar from './form-components/ProgressBar'

import NextButton from './form-components/NextButton'
import PrevButton from './form-components/PrevButton'
import { updateData } from '../../actions/pageThree'
import { orderGetRequest } from '../../../OrderDetails/reducers/orderGet'

class PageThree extends React.Component {

  constructor ( props ) {
    super(props)

    this.state = {
      tracking_macros: 'no',
      orderGet: [],
      how_weeks_dieting_for: ' ',
      actively_dieting: 'no_just_started',
      how_many_calories_are_you_supposed: '',
      tracking_calories: 'no',
      how_many_calories_are_you_actually_hit: '',
      forceRerender: '',
      if_tracking_macros_protein: '',
      if_tracking_macros_carbohydrates: '',
      if_tracking_macros_fat: '',
      validationRules: {
        how_weeks_dieting_for: {
          unit_system: 'both',
          rules: {
            min: 1,
            required_if: {
              field: {
                value: 'yes_started_already',
                key: 'actively_dieting'
              }
            },
          },
          messages: {
            required_if: 'This field is required',
            min: 'Please enter a value greater than or equal to 1.',
          },
        },
        how_many_calories_are_you_supposed: {
          unit_system: 'both',
          rules: {
            required_if: {
              field: {
                value: 'yes',
                key: 'tracking_calories'
              }
            },
          },
          messages: {
            required_if: 'This field is required',
          }
        },
        how_many_calories_are_you_actually_hit: {
          unit_system: 'both',
          rules: {
            required_if: {
              field: {
                value: 'yes',
                key: 'tracking_calories'
              }
            },
          },
          messages: {
            required_if: 'This field is required',
          }
        },

        if_tracking_macros_protein: {
          unit_system: 'both',
          rules: {
            required_if: {
              field: {
                value: 'yes',
                key: 'tracking_macros'
              }
            },
          },
          messages: {
            required_if: 'This field is required',
          }
        },
        if_tracking_macros_carbohydrates: {
          unit_system: 'both',
          rules: {
            required_if: {
              field: {
                value: 'yes',
                key: 'tracking_macros'
              }
            },
          },
          messages: {
            required_if: 'This field is required',
          }
        },
        if_tracking_macros_fat: {
          unit_system: 'both',
          rules: {
            required_if: {
              field: {
                value: 'yes',
                key: 'tracking_macros'
              }
            },
          },
          messages: {
            required_if: 'This field is required',
          }
        }
      },
      validationResults: {}
    }
    this.setValue = this.setValue.bind(this)
    this.validateAll = this.validateAll.bind(this)
    this.validate = this.validate.bind(this)
  }

  componentWillMount () {
    const orderId = localStorage.getItem('orderId')
    this.props.orderGetRequest(orderId)
    this.setState({ orderId: orderId })
    const orderGet = _.filter(this.props.orderGet[ orderId ].data.included, function ( item ) {
      return item.type == 'infos'
    })

    this.setState({ orderGet: orderGet })
    if ( orderGet.length > 0 ) {
      const tracking_macros = _.find(orderGet, function ( item ) {
        return item.attributes.key == 'tracking_macros'
      }).attributes.value
      this.setState({ tracking_macros: tracking_macros })
    }
  }

  setValue ( field, value ) {
    this.setState({ [field]: value })
    this.props.updateData(field, value)
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

  isMinLength ( rule, value ) {
    return (value && value.length >= rule)
  }

  validate ( field, values ) {
    if ( typeof  this.state.validationRules[ field ] !== 'undefined' ) {

      const filed_rules_reference = this.state.validationRules[ field ]
      const rules = filed_rules_reference.rules

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
            case 'required_min_length': {
              if ( this.state.hasOwnProperty(field) ) {
                this.setRemoveFieldsError(field, key, this.isMinLength(rules[ key ], values), filed_rules_reference.messages)
              }
              break
            }
          }
        }
      }
    }
  }

  validateAll () {
    //alert(this.state.validationRules.length)
    if ( this.state.hasOwnProperty('validationRules') ) {

      for ( let key in this.state.validationRules ) {

        if ( this.state.hasOwnProperty(key) ) {

          if ( this.props.showMetric ) {

            if ( this.state.validationRules[ key ].unit_system === 'metric' ||
              this.state.validationRules[ key ].unit_system === 'both' ) {
              this.validate(key, this.state[ key ])
            } else {
              this.removeFieldErrors(key)
            }
          } else {

            if ( this.state.validationRules[ key ].unit_system === 'imperial' ||
              this.state.validationRules[ key ].unit_system === 'both' ) {
              this.validate(key, this.state[ key ])
            } else {
              this.removeFieldErrors(key)
            }
          }
        }
      }
    }
    this.setState({ forceRerender: Math.random() })
    if ( this.state.hasOwnProperty('validationResults') && Object.keys(this.state.validationResults).length ) {
      return false
    }

    return true
  }

  render () {
    const { orderGet } = this.state
    return (
      <section id="blueprint-wrap">
        <div className="container">
          <form>
            <ProgressBar pageNum="3"/>
            <div className="content">
              <div className="form-wrap">
                <h3>First3</h3>
                <section>

                  <Dieting setValue={this.setValue} forceRerender={this.state.forceRerender} validationResults={this.state.validationResults}
                           validate={this.validate} orderGet={orderGet}/>

                  <MacrosCalories setValue={this.setValue} forceRerender={this.state.forceRerender} validationResults={this.state.validationResults}
                                  validate={this.validate} orderGet={orderGet}/>

                  <FatAndDiet setValue={this.setValue} tracking_macros={this.state.tracking_macros} forceRerender={this.state.forceRerender}
                              validationResults={this.state.validationResults}
                              validate={this.validate} orderGet={orderGet}/>

                  <div className="nav-button-wrap">
                    <PrevButton prevPage="page-two" validateAll={this.validateAll} label="Prev"/>
                    <NextButton nextPage="page-four" validateAll={this.validateAll} label="Next"/>
                  </div>

                </section>
              </div>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

function

mapStateToProps ( state ) {
  return {
    orderGet: state.orderGet
  }
}

function

mapDispatchToProps ( dispatch ) {
  return {
    orderGetRequest: ( orderId ) => dispatch(orderGetRequest(orderId)),
    updateData: ( field, value ) => dispatch(updateData(field, value))
  }
}

export default ReactRedux
  .connect(mapStateToProps, mapDispatchToProps)

  (
    PageThree
  )
