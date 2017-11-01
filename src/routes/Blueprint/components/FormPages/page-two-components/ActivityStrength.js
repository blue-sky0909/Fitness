class ActivityStrength extends React.Component {

  static propTypes = {
    setValue: React.PropTypes.func.isRequired,
    validate: React.PropTypes.func.isRequired,
  }

  constructor ( props ) {

    super(props)

    this.state = {
      activity_level_new: 0,
      activity_level: ''
    }
    this.selectCurrentActivity = this.selectCurrentActivity.bind(this)
    this.trainingWeek = this.trainingWeek.bind(this)
  }

  componentDidMount () {

    if ( this.props.orderGet.length > 0 ) {
      const activity_level_new = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key == 'activity_level'
      }).attributes.value
      const traning_week = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key == 'session_of_strength_training'
      }).attributes.value
      this.setState({ activity_level: traning_week })
      this.setState({ activity_level_new: activity_level_new })
      this.props.setValue('activity_level', traning_week)
      this.props.setValue('activity_level_new', activity_level_new)
    } else if ( this.props.pageTwo ) {
      this.setState({ activity_level_new: this.props.pageTwo.activity_level_new })
      this.setState({ activity_level: this.props.pageTwo.activity_level })
      this.props.setValue('activity_level', this.props.pageTwo.activity_level)
      this.props.setValue('activity_level_new', this.props.pageTwo.activity_level_new)
    }
  }

  selectCurrentActivity ( e ) {
    this.setState({ activity_level_new: e.target.value })
    this.props.setValue('activity_level_new', e.target.value)
  }

  trainingWeek ( e ) {
    this.setState({ activity_level: e.target.value })
    this.props.setValue('activity_level', e.target.value)
    this.props.validate('activity_level', e.target.value)
  }

  render () {
    const activity_level_has_erros = this.props.validationResults.hasOwnProperty('activity_level') &&
      this.props.validationResults.activity_level.length
    return (
      <div className="form-group">

        <div className="input-section-wrapper activity-level-section">
          <label className="control-label" htmlFor="activity_level_new">
            What is your current activity level?
          </label>
          <div className="form-group">
            <div className="input-wrapper">
              <select className="form-control" id="activity_level_new"
                      name="activity_level_new" value={this.state.activity_level_new}
                      onChange={this.selectCurrentActivity}>
                <option value="0">Not Active, Desk Job, video game tester</option>
                <option value="1">Midly active- Teacher, server, physical therapist</option>
                <option value="2">Active-Personal traniner, construction worker</option>
                <option value="3">Very active- Heavy manual labor, farmer, lumberjack</option>
              </select>
            </div>
          </div>
        </div>

        <div className="input-section-wrapper strength-training-section">
          <label className="control-label" htmlFor="daysOfStrengthTraining">Days of Strength Training Per Week</label>
          <div className={'form-group' + (activity_level_has_erros ? ' has-error' : '')}>
            <div className="input-wrapper">
              <div className="input-group">
                <input type="number" name="activity_level" value={this.state.activity_level}
                       className="form-control" id="daysOfStrengthTraining"
                       min="0" max="7" placeholder="Days of Strength Training Per Week"
                       onChange={this.trainingWeek}
                />
                <div className="input-group-addon">Days</div>
              </div>
              {activity_level_has_erros &&
              this.props.validationResults.activity_level.map(( value, index ) => {
                return value ? (<span key={index * 232321} className="help-block">{value}</span>) : '<span></span>'
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

export default ReactRedux.connect(mapStateToProps)(ActivityStrength)
