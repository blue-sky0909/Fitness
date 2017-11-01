// import { RadioGroup, RadioButton } from 'react-radio-buttons'
// import { Field, reduxForm } from 'redux-form'
// import { updateData } from '../../../actions/pageOne'

class AgeGender extends React.Component {

  static propTypes = {
    setValue: React.PropTypes.func.isRequired,
    validate: React.PropTypes.func.isRequired,
    // onUpdateGender: React.PropTypes.func.isRequired,
    validationResults: React.PropTypes.object.optional
  }

  constructor ( props ) {

    super(props)

    this.state = {
      gender: 'female',
      age: ''
    }
    this.onChangeGender = this.onChangeGender.bind(this)
    this.setAge = this.setAge.bind(this)
  }

  componentDidMount () {
    if ( this.props.orderGet.length > 0 ) {
      const gender = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key == 'gender'
      }).attributes.value
      const age = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key == 'age'
      }).attributes.value
      this.setState({ age: age })
      this.props.setValue('age', age)
      this.setState({ gender: gender })
      this.props.setValue('gender', gender)
      this.props.setValue('editing', true)
    } else if ( this.props.pageOne ) {
      this.setState({ gender: this.props.pageOne.gender })
      this.setState({ age: this.props.pageOne.age })
      this.props.setValue('gender', this.props.pageOne.gender)
      this.props.setValue('age', this.props.pageOne.age)
    }
  }

  onChangeGender ( e ) {
    this.setState({ gender: e.target.value })
    this.props.setValue('gender', e.target.value)

  }

  setAge ( e ) {
    this.setState({ 'age': e.target.value })
    this.props.setValue('age', e.target.value)
    this.props.validate('age', e.target.value)
  }

  render () {
    const { gender, age } = this.state
    const { orderGet } = this.props
    const age_has_errors = this.props.validationResults.hasOwnProperty('age') && this.props.validationResults.age.length

    return (
      <div className="form-group">
        <div className="gender-section input-section-wrapper">
          <label className="control-label">What is your gender?</label>
          <div className="form-group">
            <div className="input-wrapper pad">
              <label className="red-input-holder" htmlFor="female">
                <input name="gender" type="radio" value="female" checked={gender === 'female'} id="female" onChange={this.onChangeGender}/>
                <div className="input-ui">
                <span className="radio-button-outer">
                  <span className="radio-button-inner">
                    &nbsp;
                  </span>
                </span>
                  <span className="label">
                  Female
                </span>
                </div>
              </label>
            </div>

            <div className="input-wrapper">
              <label className="red-input-holder" htmlFor="male">
                <input name="gender" type="radio" value="male" id="male" checked={gender === 'male'} onChange={this.onChangeGender}/>
                <div className="input-ui">
                <span className="radio-button-outer">
                  <span className="radio-button-inner">
                    &nbsp;
                  </span>
                </span>
                  <span className="label">
                  Male
                </span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="age-section input-section-wrapper">
          <label className="control-label" htmlFor="age">what is your age?</label>
          <div className={'form-group' + (age_has_errors ? ' has-error' : '')}>
            <div className="input-wrapper">
              <div className="input-group">
                <input type="number" className="form-control" id="age"
                       name="age" placeholder="Age" min="18" max="100" required
                       value={age} onChange={this.setAge}
                />
                <div className="input-group-addon">Years</div>

              </div>
              {age_has_errors &&
              this.props.validationResults.age.map(( value, index ) => {
                return value ? (<span key={index * 1000} className="help-block">{value}</span>) : '<span></span>'
              })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ( state ) {
  return {
    pageOne: state.pageOneReducer.pageOneData,
    showMetric: state.progressBarReducer.flag
  }
}

export default ReactRedux.connect(mapStateToProps)(AgeGender)
