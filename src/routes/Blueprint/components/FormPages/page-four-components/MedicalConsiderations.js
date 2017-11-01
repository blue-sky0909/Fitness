let lists = []

class MedicalConsiderations extends React.Component {

  static propTypes = {
    setValue: React.PropTypes.func.isRequired,
    validate: React.PropTypes.func.isRequired
  }

  constructor ( props ) {

    super(props)

    // this.state = {
    //   medical_considerations: []
    // }

    this.state = {
      lists: [
        {
          label: 'None',
          checked: false,
          value: 'none',
        },
        {
          label: 'Prediabetic',
          checked: false,
          value: 'Prediabetic',
        },

        {
          label: 'Type 2 Diabetes',
          checked: false,
          value: 'Type 2 Diabetes',
        },
        {
          label: 'Hashimoto’s',
          checked: false,
          value: 'Hashimoto’s',
        },
        {
          label: 'Hyperthyroidism',
          checked: false,
          value: 'Hyperthyroidism',
        },
        {
          label: 'Menopause',
          checked: false,
          value: 'Menopause',
        },
        {
          label: 'Vertical Gastric Sleeve',
          checked: false,
          value: 'Vertical Gastric Sleeve',
        },
        {
          label: 'Hormone replacement',
          checked: false,
          value: 'Hormone replacement',
        },
        {
          label: 'Type 1 Diabetes',
          checked: false,
          value: 'Type 1 Diabetes',
        },
        {
          label: 'PCOS',
          checked: false,
          value: 'PCOS',
        },
        {
          label: 'Hypothyroidism',
          checked: false,
          value: 'Hypothyroidism',
        },
        {
          label: 'Missing thyroid (medicated and regulated)',
          checked: false,
          value: 'Missing thyroid (medicated and regulated)',
        },
        {
          label: 'Gastric Bypass',
          checked: false,
          value: 'Gastric Bypass',
        },
      ]
    }
    this.selectList = this.selectList.bind(this)
  }

  componentDidMount () {

    if ( this.props.orderGet.length > 0 ) {
      const medical_considerations = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key === 'medical_considerations'
      }).attributes.value

      lists = JSON.parse(medical_considerations)
      this.state.lists.forEach(( item, index ) => {
        if ( lists.indexOf(item.value) > -1 ) {
          this.state.lists[ index ].checked = true
        }
      })
      this.props.setValue('medical_considerations', lists)
    } else if ( this.props.pageFour ) {

      lists = this.props.pageFour.medical_considerations ? this.props.pageFour.medical_considerations : []
      this.state.lists.forEach(( item, index ) => {
        if ( lists.indexOf(item.value) > -1 ) {
          this.state.lists[ index ].checked = true
        }
      })
      this.props.setValue('medical_considerations', lists)
    }
  }

  selectList ( e ) {

    const index = lists.indexOf(this.state.lists[ e.target.value ].value)
    _.remove(lists, ( currentObject ) => {
      return currentObject === this.state.lists[ e.target.value ].value
    })
    if ( index === -1 ) {
      lists.push(this.state.lists[ e.target.value ].value)
    }
    this.state.lists[ e.target.value ].checked = !this.state.lists[ e.target.value ].checked
    this.setState({ medical_considerations: lists })
    this.props.setValue('medical_considerations', lists)
    this.props.validate('medical_considerations', lists)
  }

  render () {

    const medical_considerations_has_errors = this.props.validationResults.hasOwnProperty('medical_considerations') &&
      this.props.validationResults.medical_considerations.length

    return (
      <div className="form-group">
        <div className="input-section-wrapper diagnosed-medical-section">
          <label className="control-label">
            LIST ANY DIAGNOSED MEDICAL CONSIDERATIONS WE SHOULD KNOW ABOUT
          </label>
          <div className={'form-group' + (medical_considerations_has_errors ? ' has-error' : '')}>
            <div className="row">
              {
                this.state.lists.map(( value, index ) => (
                  <div className="col-xs-12 col-sm-6">
                    <div className="input-wrapper ">
                      <label className="red-input-holder-checkbox">
                        <input type="checkbox" name="medical_considerations"
                               value={index} key={index}
                               checked={
                                 value.checked
                               }
                               onChange={this.selectList}/>
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
          {medical_considerations_has_errors &&
          this.props.validationResults.medical_considerations.map(( value, index ) => {
            return value ? (<span key={index * 222 + 6} className="help-block checkboxes-groups">{value}</span>) : '<span></span>'
          })
          }
        </div>
      </div>
    )
  }

}

function mapStateToProps ( state ) {
  return {
    pageFour: state.pageFourReducer.pageFourData
  }
}

export default ReactRedux.connect(mapStateToProps)(MedicalConsiderations)
