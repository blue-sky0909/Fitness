let dinner_choices_list = []

class DinnerChoices extends React.Component {

  constructor ( props ) {
    super(props)
    this.state = {
      dinner_choices_labels: [
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
          label: 'Beans',
          checked: false,
          value: 'Beans',
        },
        {
          label: 'Meatballs',
          checked: false,
          value: 'Meatballs',
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
          label: 'Rice',
          checked: false,
          value: 'Rice',
        },
        {
          label: 'Vegetables',
          checked: false,
          value: 'Vegetables',
        },
        {
          label: 'Salad',
          checked: false,
          value: 'Salad',
        },
        {
          label: 'Burrito',
          checked: false,
          value: 'Burrito',
        },
        {
          label: 'Burger',
          checked: false,
          value: 'Burger',
        },
        {
          label: 'Fajitas',
          checked: false,
          value: 'Fajitas',
        },
        {
          label: 'Tacos',
          checked: false,
          value: 'Tacos',
        },
        {
          label: 'Pizza',
          checked: false,
          value: 'Pizza',
        },
        {
          label: 'Soup',
          checked: false,
          value: 'Soup',
        },
        {
          label: 'StirFry',
          checked: false,
          value: 'StirFry',
        },
        {
          label: 'Teriyaki Bowl',
          checked: false,
          value: 'Teriyaki Bowl',
        },
      ],
      dinner_choices: [],

    }
    this.setDinnerChoices = this.setDinnerChoices.bind(this)
  }

  componentDidMount () {
    if ( this.props.orderGet.length > 0 ) {
      const dinner_choices = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key === 'dinner_choices'
      }).attributes.value

      dinner_choices_list = JSON.parse(dinner_choices)
      this.state.dinner_choices_labels.forEach(( item, index ) => {
        if ( dinner_choices_list.indexOf(item.value) > -1 ) {
          this.state.dinner_choices_labels[ index ].checked = true
        }
      })
      this.props.setValue('dinner_choices', dinner_choices_list)

    } else if ( this.props.customMealPlanReducer ) {

      dinner_choices_list = this.props.customMealPlanReducer.dinner_choices ? this.props.customMealPlanReducer.dinner_choices : []

      if ( dinner_choices_list.length ) {
        this.state.dinner_choices_labels.forEach(( item, index ) => {
          if ( dinner_choices_list.indexOf(item.value) > -1 ) {
            this.state.dinner_choices_labels[ index ].checked = true
          }
        })
      }
      this.props.setValue('dinner_choices', dinner_choices_list)
    }
  }

  setDinnerChoices ( e ) {
    const index = dinner_choices_list.indexOf(this.state.dinner_choices_labels[ e.target.value ].value)
    _.remove(dinner_choices_list, ( currentObject ) => {
      return currentObject === this.state.dinner_choices_labels[ e.target.value ].value
    })
    if ( index === -1 ) {
      dinner_choices_list.push(this.state.dinner_choices_labels[ e.target.value ].value)

    }
    this.state.dinner_choices_labels[ e.target.value ].checked = !this.state.dinner_choices_labels[ e.target.value ].checked
    this.setState({ dinner_choices: dinner_choices_list })
    this.props.setValue('dinner_choices', dinner_choices_list)
    this.props.validate('dinner_choices', dinner_choices_list)
  }

  render () {
    const dinner_choices_labels = this.state.dinner_choices_labels
    const dinner_choices_has_error = this.props.validationResults.hasOwnProperty('dinner_choices') &&
      this.props.validationResults.dinner_choices.length
    return (

      <div className={'form-group' + (dinner_choices_has_error ? ' has-error' : '')}>
        <div className="input-section-wrapper">
          <label className="control-label"
                 for="breakfast-choices">Dinner</label>
          <div className="form-group">
            <div className="row">
              {
                dinner_choices_labels.map(( value, index ) => (
                  <div key={index * 22 + 13} className="col-xs-12 col-sm-4">
                    <div className="input-wrapper">
                      <label className="red-input-holder-checkbox">
                        <input type="checkbox" name="dinner_choices"
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
          {dinner_choices_has_error &&
          this.props.validationResults.dinner_choices.map(( value, index ) => {
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

export default ReactRedux.connect(mapStateToProps)(DinnerChoices)



