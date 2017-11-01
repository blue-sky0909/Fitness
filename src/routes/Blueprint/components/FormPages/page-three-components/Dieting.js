class Dieting extends React.Component {

  static propTypes = {
    setValue: React.PropTypes.func.isRequired,
  }

  constructor ( props ) {

    super(props)

    this.state = {
      actively_dieting: 'no_just_started',
      how_weeks_dieting_for: '',
      how_have_been_the_results: ''
    }
    this.setDieting = this.setDieting.bind(this)
    this.setDietingWeeks = this.setDietingWeeks.bind(this)
    this.setNoticedResult = this.setNoticedResult.bind(this)
  }

  componentDidMount () {

    if ( this.props.orderGet.length > 0 ) {
      const dieting = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key === 'actively_dieting'
      }).attributes.value
      if ( 'yes_started_already' === dieting ) {
        const weeks_dieting = _.find(this.props.orderGet, function ( item ) {
          return item.attributes.key === 'how_weeks_dieting_for'
        }).attributes.value

        this.setState({ how_weeks_dieting_for: weeks_dieting })
        this.props.setValue('how_weeks_dieting_for', weeks_dieting)

        const how_have_been_the_results = _.find(this.props.orderGet, function ( item ) {
          return item.attributes.key === 'how_have_been_the_results'
        }).attributes.value

        this.setState({ how_have_been_the_results: how_have_been_the_results })
        this.props.setValue('how_have_been_the_results', how_have_been_the_results)

      }

      this.setState({ actively_dieting: dieting })
      this.props.setValue('actively_dieting', dieting)

    } else if ( this.props.pageThree ) {
      this.setState({ actively_dieting: this.props.pageThree.actively_dieting })
      this.setState({ how_weeks_dieting_for: this.props.pageThree.how_weeks_dieting_for })
      this.setState({ how_have_been_the_results: this.props.pageThree.how_have_been_the_results })
      this.props.setValue('actively_dieting', this.props.pageThree.actively_dieting)
      this.props.setValue('how_weeks_dieting_for', this.props.pageThree.how_weeks_dieting_for)
      this.props.setValue('how_have_been_the_results', this.props.pageThree.how_have_been_the_results)
    }
  }

  setDieting ( e ) {
    this.setState({ actively_dieting: e.target.value })
    this.props.setValue('actively_dieting', e.target.value)
  }

  setDietingWeeks ( e ) {
    this.setState({ how_weeks_dieting_for: e.target.value })
    this.props.setValue('how_weeks_dieting_for', e.target.value)
    this.props.validate('how_weeks_dieting_for', e.target.value)
  }

  setNoticedResult ( e ) {
    this.setState({ how_have_been_the_results: e.target.value })
    this.props.setValue('how_have_been_the_results', e.target.value)
  }

  render () {
    const { actively_dieting } = this.state
    const how_weeks_dieting_for_has_errors = this.props.validationResults.hasOwnProperty('how_weeks_dieting_for') &&
      this.props.validationResults.how_weeks_dieting_for.length
    return (
      <div className="dieting-wrap">
        <div className="form-group">
          <div className="input-section-wrapper actively-dieting-section" onChange={this.setDieting.bind(this)}>
            <label className="control-label">Have you been actively dieting?</label>
            <div className="form-group">
              <div className="input-wrapper big-flex pad">
                <label className="red-input-holder">
                  <input name="actively_dieting" type="radio" name="actively_dieting" value="no_just_started"
                         checked={actively_dieting === 'no_just_started'}/>
                  <div className="input-ui">
                    <span className="radio-button-outer">
                      <span className="radio-button-inner">&nbsp;</span>
                    </span>
                    <span className="label">No, I'm just starting my diet </span>
                  </div>
                </label>
              </div>
              <div className="input-wrapper">
                <label className="red-input-holder">
                  <input name="actively_dieting" type="radio" name="actively_dieting" value="yes_started_already"
                         checked={actively_dieting === 'yes_started_already'}/>
                  <div className="input-ui">
                    <span className="radio-button-outer">
                      <span className="radio-button-inner">&nbsp;</span>
                    </span>
                    <span className="label">Yes</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="input-section-wrapper here-for-blank-space"></div>
        </div>
        {
          actively_dieting === 'yes_started_already' ? <div className="form-group">
              <div className="input-section-wrapper weeks-dieting-section">
                <label className="control-label pad" htmlFor="how_weeks_dieting_for">
                  HOW MANY WEEKS HAVE YOU BEEN DIETING FOR?
                </label>
                <div className={'form-group' + (how_weeks_dieting_for_has_errors ? ' has-error' : '')}>
                  <div className="input-wrapper">
                    <div className={'input-group' + ' ' + this.props.forceRerender}>
                      <input type="number" name="how_weeks_dieting_for" value={this.state.how_weeks_dieting_for}
                             className="form-control disabled_if_active_dieting_no"
                             id="how_weeks_dieting_for" placeholder="Weeks" min="0"
                             onChange={this.setDietingWeeks}
                      />
                      <div className=" input-group-addon">Weeks</div>
                    </div>
                    {how_weeks_dieting_for_has_errors &&
                    this.props.validationResults.how_weeks_dieting_for.map(( value, index ) => {
                      return value ? (<span key={index * 111 + 1} className="help-block">{value}</span>) : '<span></span>'
                    })
                    }
                  </div>

                </div>

              </div>
              <div className="input-section-wrapper results-noticed-section">
                <label className="control-label" htmlFor="how_have_been_the_results">
                  WHAT KIND OF RESULTS HAVE YOU NOTICED?
                </label>
                <div className="form-group">
                  <div className="input-wrapper">
                    <select name="noticed_results" value={this.state.how_have_been_the_results} onChange={this.setNoticedResult}
                            className="form-control disabled_if_active_dieting_no"
                            id="how_have_been_the_results">
                      <option value="Lost Weight">Lost Weight</option>
                      <option value="Gained">Gained</option>
                      <option value="No Change">No Change</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            : null
        }

      </div>
    )
  }
}

function mapStateToProps ( state ) {
  return {
    pageThree: state.pageThreeReducer.pageThreeData
  }
}

export default ReactRedux.connect(mapStateToProps)(Dieting)
