class FatAndDiet extends React.Component {

  static propTypes = {
    setValue: React.PropTypes.func.isRequired,
    validate: React.PropTypes.func.isRequired
  }

  constructor ( props ) {

    super(props)

    this.state = {
      if_tracking_macros_fat: '',
      if_tracking_macros_kind_of_diet: ''
    }
    this.setFatPerDay = this.setFatPerDay.bind(this)
    this.setDietPlan = this.setDietPlan.bind(this)
  }

  componentDidMount () {
    if ( this.props.orderGet.length > 0 ) {
      const tracking_macros = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key === 'tracking_macros'
      }).attributes.value
      const diet_plan = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key === 'if_tracking_macros_kind_of_diet'
      })

      if ( 'yes' === tracking_macros ) {
        const fat_per_day = _.find(this.props.orderGet, function ( item ) {
          return item.attributes.key === 'if_tracking_macros_fat'
        }).attributes.value
        this.setState({ if_tracking_macros_fat: fat_per_day })
        this.props.setValue('if_tracking_macros_fat', fat_per_day)
      }
      if ( diet_plan ) {
        this.setState({ if_tracking_macros_kind_of_diet: diet_plan.attributes.value })
        this.props.setValue('if_tracking_macros_kind_of_diet', diet_plan.attributes.value)
      }

    } else if ( this.props.pageThree ) {
      this.setState({ if_tracking_macros_fat: this.props.pageThree.if_tracking_macros_fat })
      this.setState({ if_tracking_macros_kind_of_diet: this.props.pageThree.if_tracking_macros_kind_of_diet })
      this.props.setValue('if_tracking_macros_fat', this.props.pageThree.if_tracking_macros_fat)
      this.props.setValue('if_tracking_macros_kind_of_diet', this.props.pageThree.if_tracking_macros_kind_of_diet)
    }
  }

  setFatPerDay ( e ) {
    this.setState({ if_tracking_macros_fat: e.target.value })
    this.props.setValue('if_tracking_macros_fat', e.target.value)
    this.props.validate('if_tracking_macros_fat', e.target.value)
  }

  setDietPlan ( e ) {
    this.setState({ if_tracking_macros_kind_of_diet: e.target.value })
    this.props.setValue('if_tracking_macros_kind_of_diet', e.target.value)
  }

  render () {
    const { tracking_macros } = this.props
    const if_tracking_macros_fat_has_errors = this.props.validationResults.hasOwnProperty('if_tracking_macros_fat') &&
      this.props.validationResults.if_tracking_macros_fat.length
    return (
      <div className="form-group">
        {
          tracking_macros === 'yes' ? <div className="input-section-wrapper grams-of-fats-section">
              <label className="control-label" htmlFor="if_tracking_macros_fat">
                How many grams of fats do you consume per day?
              </label>
              <div className={'form-group' + (if_tracking_macros_fat_has_errors ? ' has-error' : '')}>
                <div className="input-wrapper">
                  <div className={'input-group' + ' ' + this.props.forceRerender}>
                    <input type="number"
                           className="form-control disabled_if_no_tracking_macros"
                           id="if_tracking_macros_fat"
                           placeholder="Grams fats per day"
                           min="0"
                           required
                           name="fat_per_day"
                           value={this.state.if_tracking_macros_fat}
                           onChange={this.setFatPerDay}
                    />
                    <div className="input-group-addon">grams</div>
                  </div>
                  {if_tracking_macros_fat_has_errors &&
                  this.props.validationResults.if_tracking_macros_fat.map(( value, index ) => {
                    return value ? (<span key={index * 111 + 1} className="help-block">{value}</span>) : '<span></span>'
                  })
                  }
                </div>
              </div>
            </div>
            : <div className="input-section-wrapper here-for-blank-space"></div>

        }

        <div className="input-section-wrapper another-diet-section">
          <label className="control-label" htmlFor="if_tracking_macros_kind_of_diet">
            if using another diet plan, what is it?
          </label>
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="text" className="form-control"
                id="if_tracking_macros_kind_of_diet"
                placeholder="Explain here"
                maxLength="250"
                name="diet_plan"
                value={this.state.if_tracking_macros_kind_of_diet}
                onChange={this.setDietPlan}

              />
            </div>
          </div>
        </div>
      </div>
    )
  }

}

function mapStateToProps ( state ) {
  return {
    pageThree: state.pageThreeReducer.pageThreeData
  }
}

export default ReactRedux.connect(mapStateToProps)(FatAndDiet)
