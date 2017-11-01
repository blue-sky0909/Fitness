let lunch_choices_list = []

class LunchChoices extends React.Component {
  static propTypes = {
    setValue: React.PropTypes.func.isRequired,
    validate: React.PropTypes.func.isRequired
  }

  constructor ( props ) {
    super(props)
    this.state = {
      lunch_choices_labels: [
        {
          label: 'Beef',
          checked: false,
          value: 'Beef',
        },
        {
          label: 'Chicken',
          checked: false,
          value: 'Chicken',
        },
        {
          label: 'Cod',
          checked: false,
          value: 'Cod',
        },
        {
          label: 'Pork',
          checked: false,
          value: 'Pork',
        },
        {
          label: 'Salmon',
          checked: false,
          value: 'Salmon',
        },
        {
          label: 'Shrimp',
          checked: false,
          value: 'Shrimp',
        },
        {
          label: 'Tempeh',
          checked: false,
          value: 'Tempeh',
        },
        {
          label: 'Tofu',
          checked: false,
          value: 'Tofu',
        },
        {
          label: 'Tuna',
          checked: false,
          value: 'Tuna',
        },
        {
          label: 'Turkey',
          checked: false,
          value: 'Turkey',
        },
        {
          label: 'Soup',
          checked: false,
          value: 'Soup',
        },
        {
          label: 'Salad',
          checked: false,
          value: 'Salad',
        },
        {
          label: 'Sandwich',
          checked: false,
          value: 'Sandwich',
        },
        {
          label: 'Pasta',
          checked: false,
          value: 'Pasta',
        },
        {
          label: 'Potatoes',
          checked: false,
          value: 'Potatoes',
        },
        {
          label: 'Quinoa',
          checked: false,
          value: 'Quinoa',
        },
        {
          label: 'Rice',
          checked: false,
          value: 'Rice',
        },
        {
          label: 'Beans',
          checked: false,
          value: 'Beans',
        },
        {
          label: 'Chickpeas',
          checked: false,
          value: 'Chickpeas',
        },
        {
          label: 'Vegetables',
          checked: false,
          value: 'Vegetables',
        },
      ],
      lunch_choices: [],

    }
    this.setLunchChoices = this.setLunchChoices.bind(this)
  }

  componentDidMount () {
    if ( this.props.orderGet.length > 0 ) {
      const lunch_choices = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key === 'lunch_choices'
      }).attributes.value

      lunch_choices_list = JSON.parse(lunch_choices)
      this.state.lunch_choices_labels.forEach(( item, index ) => {
        if ( lunch_choices_list.indexOf(item.value) > -1 ) {
          this.state.lunch_choices_labels[ index ].checked = true
        }
      })
      this.props.setValue('lunch_choices', lunch_choices_list)

    } else if ( this.props.customMealPlanReducer ) {

      lunch_choices_list = this.props.customMealPlanReducer.lunch_choices ? this.props.customMealPlanReducer.lunch_choices : []

      if ( lunch_choices_list.length ) {
        this.state.lunch_choices_labels.forEach(( item, index ) => {
          if ( lunch_choices_list.indexOf(item.value) > -1 ) {
            this.state.lunch_choices_labels[ index ].checked = true
          }
        })
      }
      this.props.setValue('lunch_choices', lunch_choices_list)
    }

  }

  setLunchChoices ( e ) {
    const index = lunch_choices_list.indexOf(this.state.lunch_choices_labels[ e.target.value ].value)
    _.remove(lunch_choices_list, ( currentObject ) => {
      return currentObject === this.state.lunch_choices_labels[ e.target.value ].value
    })
    if ( index === -1 ) {
      lunch_choices_list.push(this.state.lunch_choices_labels[ e.target.value ].value)

    }
    this.state.lunch_choices_labels[ e.target.value ].checked = !this.state.lunch_choices_labels[ e.target.value ].checked
    this.setState({ lunch_choices: lunch_choices_list })
    this.props.setValue('lunch_choices', lunch_choices_list)

    this.props.validate('lunch_choices', lunch_choices_list)
  }

  render () {
    const lunch_choices_labels = this.state.lunch_choices_labels
    const lunch_choices_has_error = this.props.validationResults.hasOwnProperty('lunch_choices') &&
      this.props.validationResults.lunch_choices.length
    return (

      <div className={'form-group' + (lunch_choices_has_error ? ' has-error' : '')}>
        <div className="input-section-wrapper">
          <label className="control-label"
                 htmlFor="breakfast-choices">Lunch</label>
          <div className="form-group">
            <div className="row">
              {
                lunch_choices_labels.map(( value, index ) => (
                  <div key={index * 31 + 13} className="col-xs-12 col-sm-4">
                    <div className="input-wrapper">
                      <label className="red-input-holder-checkbox">
                        <input type="checkbox" name="lunch_choices"
                               value={index}
                               checked={
                                 value.checked
                               }
                               onChange={this.setLunchChoices}
                        />
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
          {lunch_choices_has_error &&
          this.props.validationResults.lunch_choices.map(( value, index ) => {
            return value ? (<span key={index * 21 + 6} className="help-block checkboxes-groups">{value}</span>) : '<span></span>'
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

export default ReactRedux.connect(mapStateToProps)(LunchChoices)
