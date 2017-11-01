class GoalWeight extends React.Component {
  static propTypes = {
    setValue: React.PropTypes.func.isRequired,
    validate: React.PropTypes.func.isRequired
  }

  constructor ( props ) {
    super(props)

    this.state = {
      current_weight_imperial: '',
      current_weight_metric: '',
      fitness_goal: 'Burn fat, lose weight, get toned'
    }
    this.selectGoal = this.selectGoal.bind(this)
    this.setWeightMetric = this.setWeightMetric.bind(this)
    this.setWeightImperial = this.setWeightImperial.bind(this)
  }

  componentDidMount () {
    if ( this.props.orderGet.length > 0 ) {
      const fitness_goal = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key == 'fitness_goal'
      }).attributes.value
      const current_weight_imperial = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key == 'current_weight'
      }).attributes.value

      this.setState({ fitness_goal: fitness_goal })
      this.props.setValue('fitness_goal', fitness_goal)

      this.setState({ current_weight_imperial: current_weight_imperial })
      this.props.setValue('current_weight_imperial', current_weight_imperial)
      this.setState({ current_weight_metric: Math.round(current_weight_imperial * 0.45359237) })
      this.props.setValue('current_weight_metric', Math.round(current_weight_imperial * 0.45359237))

    } else if ( this.props.pageOne ) {
      this.setState({ fitness_goal: this.props.pageOne.fitness_goal })
      this.setState({ current_weight_imperial: this.props.pageOne.current_weight_imperial })
      this.setState({ current_weight_metric: this.props.pageOne.current_weight_metric })
      this.props.setValue('fitness_goal', this.props.pageOne.fitness_goal)
      this.props.setValue('current_weight_imperial', this.props.pageOne.current_weight_imperial)
      this.props.setValue('current_weight_metric', this.props.pageOne.current_weight_metric)
    }

  }

  selectGoal ( e ) {
    this.setState({ fitness_goal: e.target.value })
    this.props.setValue('fitness_goal', e.target.value)

  }

  setWeightImperial ( e ) {
    this.setState({ current_weight_imperial: e.target.value })
    this.setState({ current_weight_metric: parseFloat(e.target.value * 0.45).toFixed(2) })
    this.props.setValue('current_weight_imperial', e.target.value)
    this.props.setValue('current_weight_metric', parseFloat(e.target.value * 0.45).toFixed(2))

    this.props.validate('current_weight_imperial', e.target.value)
  }

  setWeightMetric ( e ) {
    this.setState({ current_weight_metric: e.target.value })
    this.props.setValue('current_weight_metric', e.target.value)
    this.props.validate('current_weight_metric', e.target.value)
  }

  render () {
    const current_weight_imperial_has_erros = this.props.validationResults.hasOwnProperty('current_weight_imperial') &&
      this.props.validationResults.current_weight_imperial.length
    const current_weight_metric_has_erros = this.props.validationResults.hasOwnProperty('current_weight_metric') &&
      this.props.validationResults.current_weight_metric.length

    //console.log(this.props);
    return (
      <div className="form-group">
        <div className="input-section-wrapper goals-section">
          <label className="control-label" htmlFor="fitness_goal">
            WHAT ARE YOUR PHYSIQUE GOALS?
          </label>
          <div className="form-group">
            <div className="input-wrapper">
              <select className="form-control" id="fitness_goal" name="fitness_goal" value={this.state.fitness_goal} onChange={this.selectGoal}>
                <option value="Burn fat, lose weight, get toned">Burn fat, lose weight, get toned</option>
                <option value="Maintain my current weight">Maintain my current weight</option>
                <option value="Gain muscle, add size, bulk up">Gain muscle, add size, bulk up</option>
              </select>
            </div>
          </div>
        </div>
        <div className="input-section-wrapper current-weight-section">
          <label className="control-label">what is your current weight? </label>
          <div className={'form-group' + ((current_weight_imperial_has_erros || current_weight_metric_has_erros) ? ' has-error' : '')}>
            {
              this.props.showMetric == false ? <div className="input-wrapper hide_if_or">
                  <div className="input-group ">
                    <input type="number" name="current_weight_imperial" value={this.state.current_weight_imperial}
                           className="form-control disabled_if_or"
                           id="current_weight" placeholder="Your current weight" min="90" maxLength="600"
                           onChange={this.setWeightImperial}
                    />
                    <div className="input-group-addon">LBS</div>
                  </div>
                  {current_weight_imperial_has_erros &&
                  this.props.validationResults.current_weight_imperial.map(( value, index ) => {
                    return value ? (<span key={index * 1000} className="help-block">{value}</span>) : <span></span>
                  })
                  }
                </div>
                : <div className="input-wrapper">
                  <div className="input-group ">
                    <input type="number" name="current_weight_metric" value={this.state.current_weight_metric}
                           className="form-control disabled_if_or"
                           id="current_weight" placeholder="Your current weight" min="36" maxLength="227"

                           onChange={this.setWeightMetric}
                    />
                    <div className="input-group-addon">KGS</div>
                  </div>
                  {current_weight_metric_has_erros &&
                  this.props.validationResults.current_weight_metric.map(( value, index ) => {
                    return value ? (<span key={index * 1000} className="help-block">{value}</span>) : <span></span>
                  })
                  }
                </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ( state ) {
  return {
    pageOne: state.pageOneReducer.pageOneData,
    showMetric: state.progressBarReducer.flag
  }
}

export default ReactRedux.connect(mapStateToProps)(GoalWeight)
