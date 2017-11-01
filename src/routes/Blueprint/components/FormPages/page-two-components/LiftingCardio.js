class LiftingCardio extends React.Component {

  static propTypes = {
    setValue: React.PropTypes.func.isRequired,
    validate: React.PropTypes.func.isRequired,
  }

  constructor ( props ) {
    super(props)
    this.state = {
      minutes_per_minute_of_lifting_weights: '',
      number_of_cardio_sessions: ''
    }
    this.setMinutesTraining = this.setMinutesTraining.bind(this)
    this.setCardioWeek = this.setCardioWeek.bind(this)
  }

  componentDidMount () {

    if ( this.props.orderGet.length > 0 ) {
      const minutes_training = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key == 'minutes_per_minute_of_lifting_weights'
      }).attributes.value
      const number_of_cardio_sessions = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key == 'number_of_cardio_sessions'
      }).attributes.value
      this.setState({ minutes_per_minute_of_lifting_weights: minutes_training })
      this.setState({ number_of_cardio_sessions: number_of_cardio_sessions })
      this.props.setValue('minutes_per_minute_of_lifting_weights', minutes_training)
      this.props.setValue('number_of_cardio_sessions', number_of_cardio_sessions)

    } else if ( this.props.pageTwo ) {
      this.setState({ minutes_per_minute_of_lifting_weights: this.props.pageTwo.minutes_per_minute_of_lifting_weights })
      this.setState({ number_of_cardio_sessions: this.props.pageTwo.number_of_cardio_sessions })
      this.props.setValue('minutes_per_minute_of_lifting_weights', this.props.pageTwo.minutes_per_minute_of_lifting_weights)
      this.props.setValue('number_of_cardio_sessions', this.props.pageTwo.number_of_cardio_sessions)
    }
  }

  setMinutesTraining ( e ) {
    this.setState({ minutes_per_minute_of_lifting_weights: e.target.value })
    this.props.setValue('minutes_per_minute_of_lifting_weights', e.target.value)
    this.props.validate('minutes_per_minute_of_lifting_weights', e.target.value)
  }

  setCardioWeek ( e ) {
    this.setState({ number_of_cardio_sessions: e.target.value })
    this.props.setValue('number_of_cardio_sessions', e.target.value)
    this.props.validate('number_of_cardio_sessions', e.target.value)
  }

  render () {
    const strength_has_errors = this.props.validationResults.hasOwnProperty('minutes_per_minute_of_lifting_weights') &&
      this.props.validationResults.minutes_per_minute_of_lifting_weights.length
    const number_of_cardio_sessions_has_errors = this.props.validationResults.hasOwnProperty('number_of_cardio_sessions') &&
      this.props.validationResults.number_of_cardio_sessions.length
    return (
      <div className="form-group">
        <div className="input-section-wrapper minutes-per-session-section">
          <label className="control-label" htmlFor="minutes_per_minute_of_lifting_weights">
            Minutes Per Session of Strength Training
          </label>
          <div className={'form-group' + (strength_has_errors ? ' has-error' : '')}>
            <div className="input-wrapper">
              <div className="input-group">
                <input type="number" name="minutes_per_minute_of_lifting_weights" value={this.state.minutes_per_minute_of_lifting_weights}
                       className="form-control" id="minutes_per_minute_of_lifting_weights"
                       min="0" placeholder="Minutes per session of strength training"
                       onChange={this.setMinutesTraining}
                />
                <div className="input-group-addon">MIN</div>
              </div>
              {strength_has_errors &&
              this.props.validationResults.minutes_per_minute_of_lifting_weights.map(( value, index ) => {
                return value ? (<span key={index * 232321 + 1} className="help-block">{value}</span>) : '<span></span>'
              })
              }
            </div>
          </div>
        </div>

        <div className="input-section-wrapper cardio-sessions-wrapper">
          <label className="control-label" htmlFor="numberOfCardioSessions">
            HOW MANY CARDIO SESSIONS DO YOU DO PER WEEK?
          </label>
          <div className={'form-group' + (number_of_cardio_sessions_has_errors ? ' has-error' : '')}>
            <div className="input-wrapper">
              <div className="input-group">
                <input type="number" name="number_of_cardio_sessions" value={this.state.number_of_cardio_sessions}
                       className="form-control" id="numberOfCardioSessions"
                       min="0" placeholder="Cardio do you do per week"
                       onChange={this.setCardioWeek}
                />
                <div className="input-group-addon">Session(s)</div>
              </div>
              {number_of_cardio_sessions_has_errors &&
              this.props.validationResults.number_of_cardio_sessions.map(( value, index ) => {
                return value ? (<span key={index * 232321 + 2} className="help-block">{value}</span>) : '<span></span>'
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
    pageTwo: state.pageTwoReducer.pageTwoData
  }
}

export default ReactRedux.connect(mapStateToProps)(LiftingCardio)
