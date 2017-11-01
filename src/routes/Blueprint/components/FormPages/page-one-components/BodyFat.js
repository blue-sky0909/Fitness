class BodyFat extends React.Component {
  static propTypes = {
    setValue: React.PropTypes.func.isRequired,
    validate: React.PropTypes.func.isRequired,
  }

  constructor ( props ) {
    super(props)
    this.state = {
      know_body_fat: '',
      body_fat_percentage: ''
    }
    this.onChangeFat = this.onChangeFat.bind(this)
    this.getBodyFat = this.getBodyFat.bind(this)
  }

  componentDidMount () {
    if ( this.props.orderGet.length > 0 ) {
      const know_body_fat = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key == 'know_body_fat'
      }).attributes.value
      if ( know_body_fat === 'yes' ) {
        const body_fat_percentage = _.find(this.props.orderGet, function ( item ) {
          return item.attributes.key == 'body_fat_percentage'
        }).attributes.value
        this.setState({ body_fat_percentage: body_fat_percentage })
        this.props.setValue('body_fat_percentage', body_fat_percentage)
      }

      this.setState({ know_body_fat: know_body_fat })
      this.props.setValue('know_body_fat', know_body_fat)

    } else if ( this.props.pageOne ) {
      this.setState({ know_body_fat: this.props.pageOne.know_body_fat })
      this.setState({ body_fat_percentage: this.props.pageOne.body_fat_percentage })
      this.props.setValue('know_body_fat', this.props.pageOne.know_body_fat)
      this.props.setValue('body_fat_percentage', this.props.pageOne.body_fat_percentage)
    }
  }

  onChangeFat ( e ) {
    this.setState({ know_body_fat: e.target.value })
    this.props.setValue('know_body_fat', e.target.value)

  }

  getBodyFat ( e ) {
    this.setState({ body_fat_percentage: e.target.value })
    this.props.setValue('body_fat_percentage', e.target.value)
    this.props.validate('body_fat_percentage', e.target.value)
  }

  render () {
    const { know_body_fat, body_fat_percentage } = this.state

    const body_fat_percentage_v = this.props.validationResults.hasOwnProperty('body_fat_percentage') &&
      this.props.validationResults.body_fat_percentage.length
    return (
      <div className="form-group">
        <div className="body-fat-section input-section-wrapper">
          <label className="control-label" htmlFor="gender">DO YOU KNOW YOUR BODY FAT %?</label>
          <div className="form-group">
            <div className="input-wrapper pad">
              <label className="red-input-holder">
                <input name="know_body_fat" type="radio" value="yes" checked={know_body_fat === 'yes'} onChange={this.onChangeFat.bind(this)}/>
                <div className="input-ui">
                <span className="radio-button-outer">
                  <span className="radio-button-inner">
                    &nbsp;
                  </span>
                </span>
                  <span className="label">
                  Yes
                </span>
                </div>
              </label>
            </div>
            <div className="input-wrapper">
              <label className="red-input-holder">
                <input name="know_body_fat" type="radio" value="no" checked={know_body_fat === 'no'} onChange={this.onChangeFat.bind(this)}/>
                <div className="input-ui">
                <span className="radio-button-outer">
                  <span className="radio-button-inner">
                    &nbsp;
                  </span>
                </span>
                  <span className="label">
                  No
                </span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="input-section-wrapper body-fat-number-section"
             style={know_body_fat === 'yes' ? { opacity: 1 } : { opacity: 0 }}>
          <label className="control-label">
            what is your body fat %?</label>
          <div className={'form-group' + (body_fat_percentage_v ? ' has-error' : '')}>
            <div className="input-wrapper">
              <div className="input-group">
                <input type="number" name="body_fat_percentage"
                       className="form-control disabled_if_body"
                       id="bodyFatPercentage"
                       placeholder="Body fat"
                       onChange={this.getBodyFat}
                       value={this.state.body_fat_percentage}
                />
                <div className="input-group-addon">%</div>
              </div>
              {body_fat_percentage_v &&
              this.props.validationResults.body_fat_percentage.map(( value, index ) => {
                return value ? (<span key={index * 1000} className="help-block">{value}</span>) : <span></span>
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
    pageOne: state.pageOneReducer.pageOneData
  }
}

export default ReactRedux.connect(mapStateToProps)(BodyFat)


