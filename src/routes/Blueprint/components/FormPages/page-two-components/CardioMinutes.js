class CardioMinutes extends React.Component {

  static propTypes = {
    setValue: React.PropTypes.func.isRequired,
    validate: React.PropTypes.func.isRequired
  }

  constructor ( props ) {
    super(props)

    this.state = {
      minutes_per_session_of_cardio: ''
    }
    this.setMinutesCardio = this.setMinutesCardio.bind(this)
  }

  componentDidMount () {

    if ( this.props.orderGet.length > 0 ) {
      const minutes_cardio = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key == 'number_of_cardio_sessions'
      }).attributes.value
      this.setState({ minutes_per_session_of_cardio: minutes_cardio })
      this.props.setValue('minutes_per_session_of_cardio', minutes_cardio)
    } else if ( this.props.pageTwo ) {
      this.setState({ minutes_per_session_of_cardio: this.props.pageTwo.minutes_per_session_of_cardio })
      this.props.setValue('minutes_per_session_of_cardio', this.props.pageTwo.minutes_per_session_of_cardio)
    }
  }

  setMinutesCardio ( e ) {
    this.setState({ minutes_per_session_of_cardio: e.target.value })
    this.props.setValue('minutes_per_session_of_cardio', e.target.value)
    this.props.validate('minutes_per_session_of_cardio', e.target.value)
  }

  render () {
    const minutes_per_session_of_cardio_has_error = this.props.validationResults.hasOwnProperty('minutes_per_session_of_cardio') &&
      this.props.validationResults.minutes_per_session_of_cardio.length
    return (
      <div className="form-group">
        <div className="input-section-wrapper cardio-minutes-section pad">
          <label className="control-label pad" htmlFor="minutesPerSessionOfCardio">
            HOW MANY MINUTES DO YOU DO PER CARDIO SESSION?
          </label>
          <div className={'form-group' + (minutes_per_session_of_cardio_has_error ? ' has-error' : '')}>
            <div className="input-wrapper">
              <div className="input-group">
                <input type="number" name="minutes_per_session_of_cardio"
                       className="form-control" id="minutesPerSessionOfCardio"
                       min="0" placeholder="Cardio minutes per session"
                       value={this.state.minutes_per_session_of_cardio}
                       onChange={this.setMinutesCardio}/>
                <div className="input-group-addon">Min</div>
              </div>
              {minutes_per_session_of_cardio_has_error &&
              this.props.validationResults.minutes_per_session_of_cardio.map(( value, index ) => {
                return value ? (<span key={index * 232321 + 1} className="help-block">{value}</span>) : '<span></span>'
              })
              }
            </div>
          </div>
        </div>
        <div className="input-section-wrapper here-for-blank-space">
        </div>
      </div>
    )
  }
}

function mapStateToProps ( state ) {
  return {
    pageTwo: state.pageTwoReducer.pageTwoData
  }
}

export default ReactRedux.connect(mapStateToProps)(CardioMinutes)
