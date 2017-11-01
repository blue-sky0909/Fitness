import '../Blueprint.scss'

import MedicalConsiderations from './page-four-components/MedicalConsiderations'
import DiseasesPrescriptions from './page-four-components/DiseasesPrescriptions'
import SupplementsInjuries from './page-four-components/SupplementsInjuries'
import ExtraInfo from './page-four-components/ExtraInfo'

import ProgressBar from './form-components/ProgressBar'

import PrevButton from './form-components/PrevButton'

import { updateData, setAllData } from '../../actions/pageFour'
import { orderGetRequest } from '../../../OrderDetails/reducers/orderGet'

class PageFour extends React.Component {

  constructor ( props ) {
    super(props)
    this.state = {
      medical_considerations: '',
      validationRules: {
        medical_considerations: {
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
    this.submit = this.submit.bind(this)
    this.setValue = this.setValue.bind(this)
    this.validateAll = this.validateAll.bind(this)
    this.validate = this.validate.bind(this)
  }

  componentWillMount () {
    const orderId = localStorage.getItem('orderId')
    this.props.orderGetRequest(orderId)
    this.setState({ orderId: orderId })
  }

  submit = ( e ) => {
    e.preventDefault()
    if ( this.validateAll() ) {
      this.props.setAllData(this.props.pageOne,
        this.props.pageTwo,
        this.props.pageThree,
        this.props.pageFour,
        this.props.userInfo,
        this.props.unitSystem)
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
    const { pageOne, pageTwo, pageThree, pageFour } = this.props
    const orderGet = _.filter(this.props.orderGet[ this.state.orderId ].data.included, function ( item ) {
      return item.type == 'infos'
    })
    return (

      <section id="blueprint-wrap">
        <div className="container">
          <form className="form" onSubmit={this.submit}>

            <ProgressBar pageNum="4"/>

            <div className="content">
              <div className="form-wrap">
                <h3>First4</h3>
                <section>
                  <MedicalConsiderations setValue={this.setValue} validationResults={this.state.validationResults}
                                         validate={this.validate} orderGet={orderGet}/>

                  <DiseasesPrescriptions setValue={this.setValue} orderGet={orderGet}/>

                  <SupplementsInjuries setValue={this.setValue} orderGet={orderGet}/>

                  <ExtraInfo setValue={this.setValue} orderGet={orderGet}/>

                  <div className="nav-button-wrap">
                    <PrevButton prevPage="page-three" validateAll={this.validateAll} label="Prev"/>
                    {/* <CompleteButton label="Complete" />  */}
                    <button className="btn btn-danger" type="submit" style={btnStyle}>Complete</button>
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

const btnStyle = {
  width: 200,
  fontSize: 20,
  textTransform: 'uppercase'
}

function mapStateToProps ( state ) {
  return {
    pageOne: state.pageOneReducer.pageOneData,
    pageTwo: state.pageTwoReducer.pageTwoData,
    pageThree: state.pageThreeReducer.pageThreeData,
    pageFour: state.pageFourReducer.pageFourData,
    userInfo: state.userGet.data.data.attributes,
    orderGet: state.orderGet,
    unitSystem: state.progressBarReducer.flag
  }
}

function mapDispatchToProps ( dispatch ) {
  return {
    orderGetRequest: ( orderId ) => dispatch(orderGetRequest(orderId)),
    updateData: ( field, value ) => dispatch(updateData(field, value)),
    setAllData: ( pageOne, pageTwo, pageThree, pageFour, userInfo, unitSystem ) =>
      dispatch(setAllData(pageOne, pageTwo, pageThree, pageFour, userInfo, unitSystem))
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PageFour)
