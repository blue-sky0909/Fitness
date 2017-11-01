let breakfast_choices_list = []

class BreakfastChoices extends React.Component {
  static propTypes = {
    setValue: React.PropTypes.func.isRequired,
    validate: React.PropTypes.func.isRequired
  }

  constructor ( props ) {
    super(props)
    this.state = {
      breakfast_choices_labels: [
        {
          label: 'Bacon (turkey or pork)',
          checked: false,
          value: 'Bacon (turkey or pork)',
        },
        {
          label: 'Eggs/Egg Whites',
          checked: false,
          value: 'Eggs/Egg Whites',
        },
        {
          label: 'Protein Shake',
          checked: false,
          value: 'Protein Shake',
        },
        {
          label: 'Bagel',
          checked: false,
          value: 'Bagel',
        },
        {
          label: 'Cereal',
          checked: false,
          value: 'Cereal',
        },
        {
          label: 'English Muffin',
          checked: false,
          value: 'English Muffin',
        },
        {
          label: 'Ezekiel Breads',
          checked: false,
          value: 'Ezekiel Breads',
        },
        {
          label: 'Wheat Toast',
          checked: false,
          value: 'Wheat Toast',
        },
        {
          label: 'Protein Pancakes',
          checked: false,
          value: 'Protein Pancakes',
        },
        {
          label: 'Whole Wheat Waffle',
          checked: false,
          value: 'Whole Wheat Waffle',
        },
        {
          label: 'Avocado',
          checked: false,
          value: 'Avocado',
        },
        {
          label: 'Fruit',
          checked: false,
          value: 'Fruit',
        },
        {
          label: 'Oats',
          checked: false,
          value: 'Oats',
        },
        {
          label: 'Cottage Cheese',
          checked: false,
          value: 'Cottage Cheese',
        },
        {
          label: 'Yogurt',
          checked: false,
          value: 'Yogurt',
        },
        {
          label: 'Granola',
          checked: false,
          value: 'Granola',
        },
        {
          label: 'Coffee Creamer',
          checked: false,
          value: 'Coffee Creamer',
        },
        {
          label: 'Almond Milk',
          checked: false,
          value: 'Almond Milk',
        },
        {
          label: 'Milk',
          checked: false,
          value: 'Milk',
        },
        {
          label: 'Juice',
          checked: false,
          value: 'Juice',
        },
      ],
      breakfast_choices: [],

    }
    this.setBreakfastChoices = this.setBreakfastChoices.bind(this)
  }

  componentDidMount () {
    if ( this.props.orderGet.length > 0 ) {
      const breakfast_choices_list_get = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key == 'breakfast_choices'
      }).attributes.value

      breakfast_choices_list = JSON.parse(breakfast_choices_list_get)
      this.state.breakfast_choices_labels.forEach(( item, index ) => {
        if ( breakfast_choices_list.indexOf(item.value) > -1 ) {
          this.state.breakfast_choices_labels[ index ].checked = true
        }
      })
      this.props.setValue('breakfast_choices', breakfast_choices_list)

    } else if ( this.props.customMealPlanReducer ) {

      breakfast_choices_list = this.props.customMealPlanReducer.breakfast_choices ? this.props.customMealPlanReducer.breakfast_choices : []

      if ( breakfast_choices_list.length ) {
        this.state.breakfast_choices_labels.forEach(( item, index ) => {
          if ( breakfast_choices_list.indexOf(item.value) > -1 ) {
            this.state.breakfast_choices_labels[ index ].checked = true
          }
        })
      }
      this.props.setValue('breakfast_choices', breakfast_choices_list)
    }
  }

  setBreakfastChoices ( e ) {
    const index = breakfast_choices_list.indexOf(this.state.breakfast_choices_labels[ e.target.value ].value)
    _.remove(breakfast_choices_list, ( currentObject ) => {
      return currentObject === this.state.breakfast_choices_labels[ e.target.value ].value
    })
    if ( index === -1 ) {
      breakfast_choices_list.push(this.state.breakfast_choices_labels[ e.target.value ].value)

    }
    this.state.breakfast_choices_labels[ e.target.value ].checked = !this.state.breakfast_choices_labels[ e.target.value ].checked
    this.setState({ breakfast_choices: breakfast_choices_list })
    this.props.setValue('breakfast_choices', breakfast_choices_list)
    this.props.validate('breakfast_choices', breakfast_choices_list)
  }

  render () {
    const breakfast_choices_labels = this.state.breakfast_choices_labels
    const breakfast_choices_has_error = this.props.validationResults.hasOwnProperty('breakfast_choices') &&
      this.props.validationResults.breakfast_choices.length
    return (

      <div className={'form-group' + (breakfast_choices_has_error ? ' has-error' : '')}>
        <div className="input-section-wrapper">
          <label className="control-label"
                 for="breakfast-choices">BREAKFAST CHOICES</label>
          <div className="form-group">
            <div className="row">
              {
                breakfast_choices_labels.map(( value, index ) => (
                  <div key={index * 100 + 13} className="col-xs-12 col-sm-4">
                    <div className="input-wrapper">
                      <label className="red-input-holder-checkbox">
                        <input type="checkbox" name="breakfast_choices"
                               value={index}
                               checked={
                                 value.checked
                               }
                               onChange={this.setBreakfastChoices}
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
          {breakfast_choices_has_error &&
          this.props.validationResults.breakfast_choices.map(( value, index ) => {
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

export default ReactRedux.connect(mapStateToProps)(BreakfastChoices)



