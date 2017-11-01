import '../Blueprint.scss'
import ActivityStrength from './page-two-components/ActivityStrength'
import LiftingCardio from './page-two-components/LiftingCardio'
import CardioMinutes from './page-two-components/CardioMinutes'
import TypeExplanations from './page-two-components/TypeExplanations'

import ProgressBar from './form-components/ProgressBar'

import NextButton from './form-components/NextButton'
import PrevButton from './form-components/PrevButton'
import { updateData } from '../../actions/pageTwo'
import { orderGetRequest } from '../../../OrderDetails/reducers/orderGet'

class PageTwo extends React.Component {

  constructor ( props ) {
    super(props)
    this.setValue = this.setValue.bind(this)
    this.state = {
      activity_level: '',
      minutes_per_minute_of_lifting_weights: '',
      number_of_cardio_sessions: '',
      minutes_per_session_of_cardio: '',
      weightTrainingType: '',
      weightCardioType: '',
      validationRules: {
        activity_level: {
          unit_system: 'both',
          rules: {
            required: true,
            min: 1,
            max: 7,
          },
          messages: {
            required: 'This field is required',
            min: 'Please enter a value greater than or equal to 1.',
            max: 'Please enter a value less than or equal to 7.',
          }
        },
        minutes_per_minute_of_lifting_weights: {
          unit_system: 'both',
          rules: {
            required: true,
          },
          messages: {
            required: 'This field is required',
          }
        },
        number_of_cardio_sessions: {
          unit_system: 'both',
          rules: {
            required: true,
          },
          messages: {
            required: 'This field is required',
          }
        },
        minutes_per_session_of_cardio: {
          unit_system: 'both',
          rules: {
            required: true,
          },
          messages: {
            required: 'This field is required',
          }
        },
        weightTrainingType: {
          unit_system: 'both',
          rules: {
            required_min_length: 1,
          },
          messages: {
            required_min_length: 'At least 1 option is required, please select "None" if you are not doing any.',
          }
        },
        weightCardioType: {
          unit_system: 'both',
          rules: {
            required_min_length: 1,
          },
          messages: {
            required_min_length: 'At least 1 option is required, please select "None" if you are not doing any.',
          }
        }

      },
      validationResults: {}

    }
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

    if ( this.state.hasOwnProperty('validationResults') && Object.keys(this.state.validationResults).length ) {
      return false
    }

    return true
  }

  componentWillMount () {
    const orderId = localStorage.getItem('orderId')
    this.props.orderGetRequest(orderId)
    this.setState({ orderId: orderId })
  }

  setValue ( field, value ) {
    this.setState({ [field]: value })
    this.props.updateData(field, value)
  }

  render () {
    const orderGet = _.filter(this.props.orderGet[ this.state.orderId ].data.included, function ( item ) {
      return item.type == 'infos'
    })

    return (
      <section id="blueprint-wrap">
        <div className="container">
          <form>
            <ProgressBar pageNum="2"/>
            <div className="content">
              <div className="form-wrap">
                <h3>First2</h3>
                <section>
                  <ActivityStrength setValue={this.setValue} validationResults={this.state.validationResults}
                                    validate={this.validate} orderGet={orderGet}/>

                  <LiftingCardio setValue={this.setValue} validationResults={this.state.validationResults}
                                 validate={this.validate} orderGet={orderGet}/>

                  <CardioMinutes setValue={this.setValue} validationResults={this.state.validationResults}
                                 validate={this.validate} orderGet={orderGet}/>

                  <TypeExplanations setValue={this.setValue} validationResults={this.state.validationResults}
                                    validate={this.validate} orderGet={orderGet}/>

                  <div className="nav-button-wrap">
                    <PrevButton prevPage="page-one" validateAll={this.validateAll} label="Prev"/>
                    <NextButton nextPage="page-three" validateAll={this.validateAll} label="Next"/>
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

function mapStateToProps ( state ) {
  return {
    orderGet: state.orderGet
  }
}

function mapDispatchToProps ( dispatch ) {
  return {
    orderGetRequest: ( orderId ) => dispatch(orderGetRequest(orderId)),
    updateData: ( field, value ) => dispatch(updateData(field, value))
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PageTwo)
