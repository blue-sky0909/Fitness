import '../CustomMealPlan.scss'

import ProgressBar from './ProgressBar'

import AllergicFoods from './FormComponents/AllergicFoods'
import LifestylePreference from './FormComponents/LifestylePreference'
import BreakfastChoices from './FormComponents/BreakfastChoices'
import LunchChoices from './FormComponents/LunchChoices'
import DinnerChoices from './FormComponents/DinnerChoices'
import SnackChoices from './FormComponents/SnackChoices'
import ProteinField from './FormComponents/ProteinField'
import { orderGetRequest } from '../../OrderDetails/reducers/orderGet'
import { updateData, setAllData } from '../actions/customMealPlan'

import CompleteButton from './FormComponents/CompleteButton'

class MealPlanForm extends React.Component {
  static propTypes = {
    updateData: React.PropTypes.func.isRequired,
    orderGetRequest: React.PropTypes.func.isRequired
  }

  constructor ( props ) {
    super(props)

    this.state = {
      specific_lifestyle: '',
      foods_you_are_allergic: '',
      breakfast_choices: '',
      lunch_choices: '',
      dinner_choices: '',
      snacks_choices: '',
      validationRules: {
        specific_lifestyle: {
          unit_system: 'both',
          rules: {
            required_min_length: 1,
          },
          messages: {
            required_min_length: 'At least 1 option is required',
          }
        },
        snacks_choices: {
          unit_system: 'both',
          rules: {
            required_min_length: 1,
          },
          messages: {
            required_min_length: 'At least 1 option is required',
          }
        },
        lunch_choices: {
          unit_system: 'both',
          rules: {
            required_min_length: 1,
          },
          messages: {
            required_min_length: 'At least 1 option is required',
          }
        },
        foods_you_are_allergic: {
          unit_system: 'both',
          rules: {
            required: true,
          },
          messages: {
            required: 'This field is required',
          }
        },
        breakfast_choices: {
          unit_system: 'both',
          rules: {
            required_min_length: 1,
          },
          messages: {
            required_min_length: 'At least 1 option is required',
          }
        },
        dinner_choices: {
          unit_system: 'both',
          rules: {
            required_min_length: 1,
          },
          messages: {
            required_min_length: 'At least 1 option is required',
          }
        }
      },
      validationResults: {}
    }
    this.setValue = this.setValue.bind(this)
    this.validateAll = this.validateAll.bind(this)
    this.validate = this.validate.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentWillMount () {
    const orderId = localStorage.getItem('orderId')
    this.props.orderGetRequest(orderId)
    this.setState({ orderId: orderId })
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

  submit = ( e ) => {
    e.preventDefault()

    if ( this.validateAll() ) {
      //this.props.setAllData(this.props.pageOne, this.props.pageTwo, this.props.pageThree, this.props.pageFour, this.props.userInfo)
      //alert()
      this.props.setAllData(this.props.customMealPlanReducer)
    }
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

      <section id="custom-meal-plan">
        <div className="container">
          <form action="" id="wizard-validation-form"
                className="form" onSubmit={this.submit} method="post">

            <ProgressBar/>

            <div className="content">
              <div className="form-wrap">
                <section>
                  <div className="form-group arbitrary-text">
                    <div className="custom-info-block">
                      <h2>21 Meal Details</h2>
                      <p>The program that you purchased comes complete with 21 different macro
                        based meals and 7 snacks (if your macros allow for it). We are an
                        American based company and as such will provide you with American (and
                        Western culture based) farmer options).</p>
                    </div>
                  </div>

                  <AllergicFoods setValue={this.setValue} validationResults={this.state.validationResults}
                                 validate={this.validate} orderGet={orderGet}/>

                  <LifestylePreference setValue={this.setValue} validationResults={this.state.validationResults}
                                       validate={this.validate} orderGet={orderGet}/>

                  <div className="form-group arbitrary-text">
                    <div className="custom-info-block">
                      <h2>Food preferences</h2>
                      <p>Our main goal when creating these 21 meals is to hit YOUR SPECIFIC macros. This is why we implement a
                        combination of foods that we have found to work best to satisfy both your hunger and cravings.</p>
                      <p>We will do our best to include all of your chosen foods to make this meal plan enjoyable.</p>
                    </div>
                  </div>

                  <div className="form-group arbitrary-text">
                    <h2>Please select your favorite options from the
                      list. We will do our best to include one per day.
                    </h2>
                  </div>

                  <BreakfastChoices setValue={this.setValue} validationResults={this.state.validationResults}
                                    validate={this.validate} orderGet={orderGet}/>

                  <LunchChoices setValue={this.setValue} validationResults={this.state.validationResults}
                                validate={this.validate} orderGet={orderGet}/>

                  <DinnerChoices setValue={this.setValue} validationResults={this.state.validationResults}
                                 validate={this.validate} orderGet={orderGet}/>

                  <SnackChoices setValue={this.setValue} validationResults={this.state.validationResults}
                                validate={this.validate} orderGet={orderGet}/>

                  <ProteinField setValue={this.setValue} orderGet={orderGet}/>

                  <div className="form-group arbitrary-text">
                    <div className="custom-info-block">
                      <p>Please remember that every meal we create is custom
                        and can take 7-10 business days before it is delivered. We do our best to get these
                        delivered in a timely fashion, but they do take time to create. We appreciate your patience.</p>
                    </div>
                  </div>

                  <div className="nav-button-wrap">
                    <CompleteButton label="Complete"/>
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

const mapStateToProps = ( state ) => ({
  orderGet: state.orderGet,
  customMealPlanReducer: state.customMealPlanReducer.customMealPlan
})

function mapDispatchToProps ( dispatch ) {
  return {
    orderGetRequest: ( orderId ) => dispatch(orderGetRequest(orderId)),
    updateData: ( field, value ) => dispatch(updateData(field, value)),
    setAllData: ( customMealPlanReducer ) => dispatch(setAllData(customMealPlanReducer))
  }

}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(MealPlanForm)
