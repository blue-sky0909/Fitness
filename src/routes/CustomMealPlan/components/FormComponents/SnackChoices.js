let snacks_choices_list = []

class SnackChoices extends React.Component {
  constructor ( props ) {
    super(props)
    this.state = {
      snacks_choices_labels: [
        {
          label: 'Nutter Butter Cookies',
          checked: false,
          value: 'Nutter Butter Cookies',
        },
        {
          label: 'Rice Cakes',
          checked: false,
          value: 'Rice Cakes',
        },
        {
          label: 'Cliff Bars',
          checked: false,
          value: 'Cliff Bars',
        },
        {
          label: 'Lara Bars',
          checked: false,
          value: 'Lara Bars',
        },
        {
          label: 'Luna Bars',
          checked: false,
          value: 'Luna Bars',
        },
        {
          label: 'Quest Bars',
          checked: false,
          value: 'Quest Bars',
        },
        {
          label: 'Halo Top Ice Cream',
          checked: false,
          value: 'Halo Top Ice Cream',
        },
        {
          label: 'Tofu',
          checked: false,
          value: 'Tofu',
        },
        {
          label: 'Skinny Cow Ice Cream',
          checked: false,
          value: 'Skinny Cow Ice Cream',
        },
        {
          label: 'Chips',
          checked: false,
          value: 'Chips',
        },
        {
          label: 'Guacamole',
          checked: false,
          value: 'Guacamole',
        },
        {
          label: 'Salsa',
          checked: false,
          value: 'Salsa',
        },
        {
          label: 'Jerky',
          checked: false,
          value: 'Jerky',
        },
        {
          label: 'Nuts',
          checked: false,
          value: 'Nuts',
        },
        {
          label: 'Trail Mix',
          checked: false,
          value: 'Trail Mix',
        },
        {
          label: 'Hummus',
          checked: false,
          value: 'Hummus',
        },
        {
          label: 'Veggies',
          checked: false,
          value: 'Veggies',
        },
        {
          label: 'Cottage Cheese',
          checked: false,
          value: 'Cottage Cheese',
        },
        {
          label: 'Granola',
          checked: false,
          value: 'Granola',
        },
        {
          label: 'Fruit',
          checked: false,
          value: 'Fruit',
        },
        {
          label: 'Yogurt',
          checked: false,
          value: 'Yogurt',
        },
        {
          label: 'Candy',
          checked: false,
          value: 'Candy',
        },
        {
          label: 'Cheese',
          checked: false,
          value: 'Cheese',
        },
        {
          label: 'Chocolate',
          checked: false,
          value: 'Chocolate',
        },
        {
          label: 'Cookies',
          checked: false,
          value: 'Cookies',
        },
        {
          label: 'PopTarts',
          checked: false,
          value: 'PopTarts',
        },
        {
          label: 'Popcorn',
          checked: false,
          value: 'Popcorn',
        },
        {
          label: 'Pretzels',
          checked: false,
          value: 'Pretzels',
        },
      ],
      snacks_choices: [],

    }
    this.setDinnerChoices = this.setDinnerChoices.bind(this)
  }

  componentDidMount () {
    if ( this.props.orderGet.length > 0 ) {
      const snacks_choices = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key === 'snacks_choices'
      }).attributes.value

      snacks_choices_list = JSON.parse(snacks_choices)
      this.state.snacks_choices_labels.forEach(( item, index ) => {
        if ( snacks_choices_list.indexOf(item.value) > -1 ) {
          this.state.snacks_choices_labels[ index ].checked = true
        }
      })
      this.props.setValue('snacks_choices', snacks_choices_list)

    } else if ( this.props.customMealPlanReducer ) {

      snacks_choices_list = this.props.customMealPlanReducer.snacks_choices ? this.props.customMealPlanReducer.snacks_choices : []

      if ( snacks_choices_list.length ) {
        this.state.snacks_choices_labels.forEach(( item, index ) => {
          if ( snacks_choices_list.indexOf(item.value) > -1 ) {
            this.state.snacks_choices_labels[ index ].checked = true
          }
        })
      }
      this.props.setValue('snacks_choices', snacks_choices_list)
    }
  }

  setDinnerChoices ( e ) {
    const index = snacks_choices_list.indexOf(this.state.snacks_choices_labels[ e.target.value ].value)
    _.remove(snacks_choices_list, ( currentObject ) => {
      return currentObject === this.state.snacks_choices_labels[ e.target.value ].value
    })
    if ( index === -1 ) {
      snacks_choices_list.push(this.state.snacks_choices_labels[ e.target.value ].value)

    }
    this.state.snacks_choices_labels[ e.target.value ].checked = !this.state.snacks_choices_labels[ e.target.value ].checked
    this.setState({ snacks_choices: snacks_choices_list })
    this.props.setValue('snacks_choices', snacks_choices_list)
    this.props.validate('snacks_choices', snacks_choices_list)
  }

  render () {
    const snacks_choices_labels = this.state.snacks_choices_labels
    const snacks_choices_has_error = this.props.validationResults.hasOwnProperty('snacks_choices') &&
      this.props.validationResults.snacks_choices.length
    return (

      <div className={'form-group' + (snacks_choices_has_error ? ' has-error' : '')}>
        <div className="input-section-wrapper">
          <label className="control-label"
                 for="breakfast-choices">SNACKS</label>
          <div className="form-group">
            <div className="row">
              {
                snacks_choices_labels.map(( value, index ) => (
                  <div key={index * 22 + 13} className="col-xs-12 col-sm-4">
                    <div className="input-wrapper">
                      <label className="red-input-holder-checkbox">
                        <input type="checkbox" name="snacks_choices"
                               value={index}
                               checked={
                                 value.checked
                               }
                               onChange={this.setDinnerChoices}
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
          {snacks_choices_has_error &&
          this.props.validationResults.snacks_choices.map(( value, index ) => {
            return value ? (<span key={index * 212 + 6} className="help-block checkboxes-groups">{value}</span>) : '<span></span>'
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

export default ReactRedux.connect(mapStateToProps)(SnackChoices)
