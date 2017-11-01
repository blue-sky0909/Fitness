class AllergicFoods extends React.Component {
  static propTypes = {
    setValue: React.PropTypes.func.isRequired,
    validate: React.PropTypes.func.isRequired
  }

  constructor ( props ) {
    super(props)
    this.state = {
      foods_you_are_allergic: '',
    }
    this.setFoodsYourAreAllergic = this.setFoodsYourAreAllergic.bind(this)
  }

  componentDidMount () {

    if ( this.props.orderGet.length > 0 ) {
      const foods_you_are_allergic = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key === 'foods_you_are_allergic'
      })
      if ( foods_you_are_allergic ) {
        this.setState({ extra_info: foods_you_are_allergic.attributes.value })
        this.props.setValue('foods_you_are_allergic', foods_you_are_allergic.attributes.value)
      }

      this.props.setValue('editing', true)

    } else if ( this.props.customMealPlanReducer ) {
      this.setState({ foods_you_are_allergic: this.props.customMealPlanReducer.foods_you_are_allergic })
      this.props.setValue('foods_you_are_allergic', this.props.customMealPlanReducer.foods_you_are_allergic)
    }
  }

  setFoodsYourAreAllergic ( e ) {
    this.setState({ foods_you_are_allergic: e.target.value })
    this.props.setValue('foods_you_are_allergic', e.target.value)
    this.props.validate('foods_you_are_allergic', e.target.value)
  }

  render () {
    const foods_you_are_allergic_has_error = this.props.validationResults.hasOwnProperty('foods_you_are_allergic') &&
      this.props.validationResults.foods_you_are_allergic.length
    return (
      <div className={'form-group' + (foods_you_are_allergic_has_error ? ' has-error' : '')}>
        <div className="input-section-wrapper">
          <label className="control-label" for="extra_info">Please list
            all
            foods you are allergic to, or absolutely refuse to eat. We will
            keep
            this out of your plan.
          </label>
          <div className={'form-group' + (foods_you_are_allergic_has_error ? ' has-error' : '')}>
            <div className="input-wrapper">
              <textarea name="foods_you_are_allergic" maxLength="100" onChange={this.setFoodsYourAreAllergic} className="form-control"
                        rows="6" id="foods_you_are_allergic"
                        value={this.state.foods_you_are_allergic}
                        placeholder="Limit to 100 characters"/>
            </div>

          </div>
          {foods_you_are_allergic_has_error &&
          this.props.validationResults.foods_you_are_allergic.map(( value, index ) => {
            return value ? (<span key={index * 22 + 1} className="help-block">{value}</span>) : '<span></span>'
          })
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps ( state ) {
  return {
    customMealPlanReducer: state.customMealPlanReducer.customMealPlan
  }
}

export default ReactRedux.connect(mapStateToProps)(AllergicFoods)
