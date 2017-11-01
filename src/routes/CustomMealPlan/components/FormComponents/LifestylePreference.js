let lifestyle_list = []

class LifestylePreference extends React.Component {
  constructor ( props ) {
    super(props)
    this.state = {
      specific_lifestyle: [
        {
          label: 'Meat, dairy and other animal based products',
          checked: false,
          value: 'Meat, dairy and other animal based products',
        },
        {
          label: 'Vegetarian; No meat but will eat eggs & dairy',
          checked: false,
          value: 'Vegetarian; No meat but will eat eggs & dairy',
        },
        {
          label: 'Pescatarian (fish, eggs, dairy)',
          checked: false,
          value: 'Pescatarian (fish, eggs, dairy)',
        },
        {
          label: 'Vegan',
          checked: false,
          value: 'Vegan',
        },
      ]
    }

    this.setLifeStylePreferences = this.setLifeStylePreferences.bind(this)
  }

  componentDidMount () {

    if ( this.props.orderGet.length > 0 ) {
      const specific_lifestyle = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key === 'specific_lifestyle'
      }).attributes.value

      lifestyle_list = JSON.parse(specific_lifestyle)
      this.state.specific_lifestyle.forEach(( item, index ) => {
        if ( lifestyle_list.indexOf(item.value) > -1 ) {
          this.state.specific_lifestyle[ index ].checked = true
        }
      })
      this.props.setValue('specific_lifestyle', lifestyle_list)

    } else if ( this.props.customMealPlanReducer ) {

      lifestyle_list = this.props.customMealPlanReducer.specific_lifestyle ? this.props.customMealPlanReducer.specific_lifestyle : []

      if ( lifestyle_list.length ) {
        this.state.specific_lifestyle.forEach(( item, index ) => {
          if ( lifestyle_list.indexOf(item.value) > -1 ) {
            this.state.specific_lifestyle[ index ].checked = true
          }
        })
      }
      this.props.setValue('specific_lifestyle', lifestyle_list)
    }

  }

  setLifeStylePreferences ( e ) {
    const index = lifestyle_list.indexOf(this.state.specific_lifestyle[ e.target.value ].value)
    _.remove(lifestyle_list, ( currentObject ) => {
      return currentObject === this.state.specific_lifestyle[ e.target.value ].value
    })
    if ( index === -1 ) {
      lifestyle_list.push(this.state.specific_lifestyle[ e.target.value ].value)

    }
    this.state.specific_lifestyle[ e.target.value ].checked = !this.state.specific_lifestyle[ e.target.value ].checked
    this.setState({ specific_lifestyle_local: lifestyle_list })
    this.props.setValue('specific_lifestyle', lifestyle_list)
    // this.props.validate('specific_lifestyle', specific_lifestyle)
    this.props.validate('specific_lifestyle', lifestyle_list)
  }

  render () {
    const lifestyle_preferece_options = this.state.specific_lifestyle
    const lifestyle_preferece_has_errors = this.props.validationResults.hasOwnProperty('specific_lifestyle') &&
      this.props.validationResults.specific_lifestyle.length
    return (
      <div className={'form-group' + (lifestyle_preferece_has_errors ? ' has-error' : '')}>
        <div className="input-section-wrapper">
          <label className="control-label"
                 htmlFor="specific_life_style">Please select your specific
            lifestyle preference.
          </label>
          <div className={'form-group' + (lifestyle_preferece_has_errors ? ' has-error' : '')}>
            <div className="row">
              {
                lifestyle_preferece_options.map(( value, index ) => (
                  <div key={index + 1 * 100} className=" col-xs-12 col-sm-6">
                    <div className="input-wrapper">
                      <label className="red-input-holder-checkbox">
                        <input type="checkbox" name="specific_life_style"
                               value={index}
                               checked={
                                 value.checked
                               }
                               onChange={this.setLifeStylePreferences}/>
                        <div className="input-ui" style={{ width: '100%' }}>
                          <div className="display-table-cell">
                          <span className="checkbox-button-outer">
                            <span className="checkbox-button-inner">
                              <i className="btl bt-check"></i>
                            </span>
                          </span>
                          </div>
                          <div className="display-table-cell">
                          <span className="label">
                            {value.label}
                          </span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          {lifestyle_preferece_has_errors &&
          this.props.validationResults.specific_lifestyle.map(( value, index ) => {
            return value ? (<span key={index * 232321 + 6} className="help-block checkboxes-groups">{value}</span>) : '<span></span>'
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

export default ReactRedux.connect(mapStateToProps)(LifestylePreference)



