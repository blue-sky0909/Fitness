class WeightHeight extends React.Component {

  static propTypes = {
    setValue: React.PropTypes.func.isRequired,
    validate: React.PropTypes.func.isRequired,
  }

  constructor ( props ) {
    super(props)
    this.state = {
      height_feet: '',
      height_inches: '',
      current_goal_imperial: ''
    }
    this.setGoalImperial = this.setGoalImperial.bind(this)
    this.setGoalMetric = this.setGoalMetric.bind(this)
    this.setHeightFeet = this.setHeightFeet.bind(this)
    this.setHeightInches = this.setHeightInches.bind(this)
    this.setHeightCms = this.setHeightCms.bind(this)
  }

  componentDidMount () {

    if ( this.props.orderGet.length > 0 ) {
      const current_goal_imperial = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key == 'target_weight'
      }).attributes.value
      const height_inches = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key == 'height'
      }).attributes.value
      this.setState({ current_goal_imperial: current_goal_imperial })
      this.setState({ current_goal_metric: Math.round(current_goal_imperial * 0.45359237) })
      this.props.setValue('current_goal_imperial', current_goal_imperial)
      this.props.setValue('current_goal_metric', Math.round(current_goal_imperial * 0.45359237))

      this.setState({ height_cms: parseInt(height_inches * 2.54) })
      this.setState({ height_feet: Math.floor(height_inches * 0.0833333333) })
      this.setState({ height_inches: parseInt(height_inches % 12) })

      this.props.setValue('height_cms', parseInt(height_inches * 2.54))
      this.props.setValue('height_feet', Math.floor(height_inches * 0.0833333333))
      this.props.setValue('height_inches', parseInt(height_inches % 12))
    } else if ( this.props.pageOne ) {
      this.setState({ current_goal_imperial: this.props.pageOne.current_goal_imperial })
      this.setState({ current_goal_metric: this.props.pageOne.current_goal_metric })
      this.setState({ height_feet: this.props.pageOne.height_feet })
      this.setState({ height_inches: this.props.pageOne.height_inches })
      this.setState({ height_cms: this.props.pageOne.height_cms })

      this.props.setValue('current_goal_imperial', this.props.pageOne.current_goal_imperial)
      this.props.setValue('current_goal_metric', this.props.pageOne.current_goal_metric)
      this.props.setValue('height_inches', this.props.pageOne.height_inches)
      this.props.setValue('height_feet', this.props.pageOne.height_feet)
      this.props.setValue('height_cms', this.props.pageOne.height_cms)
    }
  }

  setGoalImperial ( e ) {
    this.setState({ current_goal_imperial: e.target.value })
    this.setState({ current_goal_metric: parseFloat(e.target.value * 0.45).toFixed(2) })
    this.props.setValue('current_goal_imperial', e.target.value)
    this.props.setValue('current_goal_metric', parseFloat(e.target.value * 0.45).toFixed(2))
    this.props.validate('current_goal_imperial', e.target.value)

  }

  setGoalMetric ( e ) {
    this.setState({ current_goal_metric: e.target.value })
    this.props.setValue('current_goal_metric', e.target.value)
    this.props.validate('current_goal_metric', e.target.value)
  }

  setHeightFeet ( e ) {
    this.setState({ height_feet: e.target.value })
    this.props.setValue('height_feet', e.target.value)
    this.props.validate('height_feet', e.target.value)
    const cms = (parseFloat(e.target.value * 30.48) + parseFloat(this.state.height_inches * 2.54)).toFixed(2)
    this.setState({ height_cms: cms })
    this.props.setValue('height_cms', cms)
  }

  setHeightInches ( e ) {
    this.setState({ height_inches: e.target.value })
    this.props.setValue('height_inches', e.target.value)
    this.props.validate('height_inches', e.target.value)
    const cms = (parseFloat(e.target.value * 2.54) + parseFloat(this.state.height_feet * 30.48)).toFixed(2)
    this.setState({ height_cms: cms })
    this.props.setValue('height_cms', cms)
  }

  setHeightCms ( e ) {
    this.setState({ height_cms: e.target.value })
    this.props.setValue('height_cms', e.target.value)
    this.props.validate('height_cms', e.target.value)
  }

  render () {

    const current_goal_imperial = this.props.validationResults.hasOwnProperty('current_goal_imperial') &&
      this.props.validationResults.current_goal_imperial.length
    const height_feet = this.props.validationResults.hasOwnProperty('height_feet') &&
      this.props.validationResults.height_feet.length
    const height_inches = this.props.validationResults.hasOwnProperty('height_inches') &&
      this.props.validationResults.height_inches.length
    const current_goal_metric_has_erros = this.props.validationResults.hasOwnProperty('current_goal_metric') &&
      this.props.validationResults.current_goal_metric.length

    const height_cms_has_erros = this.props.validationResults.hasOwnProperty('height_cms') &&
      this.props.validationResults.height_cms.length

    return (
      <div className="form-group">
        <div className="target-weight-section input-section-wrapper">
          <label className="control-label" htmlFor="gender">what is your goal weight?</label>
          <div className={'form-group' + ((current_goal_imperial || current_goal_metric_has_erros) ? ' has-error' : '')}>
            <div className="input-wrapper">
              {
                this.props.showMetric == false ? <div className="input-wrapper hide_if_or">
                    <div className="input-group ">
                      <input type="number" name="current_goal_imperial"
                             className="form-control disabled_if_or"
                             placeholder="Target weight" min="90"
                             maxLength="600"
                             value={this.state.current_goal_imperial}
                             onChange={this.setGoalImperial}

                      />
                      <div className="input-group-addon">LBS</div>
                    </div>
                    {current_goal_imperial &&
                    this.props.validationResults.current_goal_imperial.map(( value, index ) => {
                      return value ? (<span key={index * 1111} className="help-block">{value}</span>) : '<span></span>'
                    })
                    }
                  </div>
                  : <div className="input-wrapper hide_if_or">
                    <div className="input-group ">
                      <input type="number" name="current_goal_metric"
                             className="form-control disabled_if_or"
                             id="current_weight"
                             placeholder="Target weight" min="36"
                             maxLength="227"
                             value={this.state.current_goal_metric}
                             onChange={this.setGoalMetric}

                      />
                      <div className="input-group-addon">KGS</div>
                    </div>
                    {current_goal_metric_has_erros &&
                    this.props.validationResults.current_goal_metric.map(( value, index ) => {
                      return value ? (<span key={index * 1111} className="help-block">{value}</span>) : '<span></span>'
                    })
                    }
                  </div>
              }
            </div>
          </div>
        </div>

        <div className="input-section-wrapper height-section">
          <label className="control-label" htmlFor="height-feet"> what is your height?</label>
          {
            this.props.showMetric == false ?
              <div className={'form-group' + (  (height_feet || height_inches ) ? ' has-error' : '')}>
                <div className="input-wrapper pad">
                  <div className="input-group">
                    <input type="number" name="height_feet" value={this.state.height_feet}
                           className="form-control disabled_if_or"
                           id="height-feet" placeholder="Feet" min="4" max="8"
                           required
                           onChange={this.setHeightFeet}
                    />
                    <div className="input-group-addon">FT</div>
                  </div>
                  {height_feet &&
                  this.props.validationResults.height_feet.map(( value, index ) => {
                    return value ? (<span key={index * 1111} className="help-block">{value}</span>) : '<span></span>'
                  })
                  }
                </div>
                <div className="input-wrapper">
                  <div className="input-group">
                    <input type="number" name="height_inches" value={this.state.height_inches}
                           className="form-control disabled_if_or"
                           id="height-inches" placeholder="Inches"
                           min="0" max="11" required
                           onChange={this.setHeightInches}
                    />
                    <div className="input-group-addon">IN</div>
                  </div>
                  {height_inches &&
                  this.props.validationResults.height_inches.map(( value, index ) => {
                    return value ? (<span key={index * 1111} className="help-block">{value}</span>) : '<span></span>'
                  })
                  }
                </div>
              </div>
              : <div  className={'form-group' + (  height_cms_has_erros ? ' has-error' : '')}>
                <div className="input-wrapper">
                  <div className="input-group">
                    <input type="number" name="height_cms"
                           className="form-control disabled_if_or"
                           id="target_weight" placeholder="Height"
                           min="120" max="245"
                           value={this.state.height_cms}
                           onChange={this.setHeightCms}

                    />
                    <div className="input-group-addon">CMS</div>
                  </div>
                  {height_cms_has_erros &&
                  this.props.validationResults.height_cms.map(( value, index ) => {
                    return value ? (<span key={index * 1111} className="help-block">{value}</span>) : '<span></span>'
                  })
                  }
                </div>
              </div>
          }
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

export default ReactRedux.connect(mapStateToProps)(WeightHeight)
