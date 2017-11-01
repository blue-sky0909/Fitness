class MacrosCalories extends React.Component {

  static propTypes = {
    setValue: React.PropTypes.func.isRequired,
    validate: React.PropTypes.func.isRequired,
  }

  constructor ( props ) {

    super(props)

    this.state = {
      tracking_calories: 'no',
      tracking_macros: 'no',
      how_many_calories_are_you_supposed: 0,
      how_many_calories_are_you_actually_hit: 0,
      if_tracking_macros_protein: 0,
      if_tracking_macros_carbohydrates: 0,
      if_tracking_macros_fat: 0

    }
    this.setCalories = this.setCalories.bind(this)
    this.setMacros = this.setMacros.bind(this)
    this.setCaloriesPerDay = this.setCaloriesPerDay.bind(this)
    this.setHitCaloriesPerDay = this.setHitCaloriesPerDay.bind(this)
    this.setProteinPerDay = this.setProteinPerDay.bind(this)
    this.setCarbsPerDay = this.setCarbsPerDay.bind(this)
  }

  componentDidMount () {

    if ( this.props.orderGet.length > 0 ) {
      const tracking_calories = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key == 'tracking_calories'
      }).attributes.value
      const tracking_macros = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key == 'tracking_macros'
      }).attributes.value

      this.setState({ tracking_macros: tracking_macros })
      this.setState({ tracking_calories: tracking_calories })
      this.props.setValue('tracking_calories', tracking_calories)
      this.props.setValue('tracking_macros', tracking_calories)

      if ( 'yes' === tracking_macros ) {
        const protein_per_day = _.find(this.props.orderGet, function ( item ) {
          return item.attributes.key === 'if_tracking_macros_protein'
        }).attributes.value
        const carbs_per_day = _.find(this.props.orderGet, function ( item ) {
          return item.attributes.key === 'if_tracking_macros_carbohydrates'
        }).attributes.value

        this.setState({ if_tracking_macros_protein: protein_per_day })
        this.setState({ if_tracking_macros_carbohydrates: carbs_per_day })
        this.props.setValue('if_tracking_macros_protein', protein_per_day)
        this.props.setValue('if_tracking_macros_carbohydrates', carbs_per_day)
      }

      if ( 'yes' === tracking_calories ) {
        const how_many_calories_are_you_supposed = _.find(this.props.orderGet, function ( item ) {
          return item.attributes.key === 'how_many_calories_are_you_supposed'
        }).attributes.value

        const how_many_calories_are_you_actually_hit = _.find(this.props.orderGet, function ( item ) {
          return item.attributes.key === 'how_many_calories_are_you_actually_hit'
        }).attributes.value

        this.setState({ how_many_calories_are_you_supposed: how_many_calories_are_you_supposed })
        this.setState({ how_many_calories_are_you_actually_hit: how_many_calories_are_you_actually_hit })
        this.props.setValue('how_many_calories_are_you_supposed', how_many_calories_are_you_supposed)
        this.props.setValue('how_many_calories_are_you_actually_hit', how_many_calories_are_you_actually_hit)
      }

    } else if ( this.props.pageThree ) {
      this.setState({ tracking_calories: this.props.pageThree.tracking_calories })
      this.setState({ tracking_macros: this.props.pageThree.tracking_macros })
      this.setState({ how_many_calories_are_you_supposed: this.props.pageThree.how_many_calories_are_you_supposed })
      this.setState({ how_many_calories_are_you_actually_hit: this.props.pageThree.how_many_calories_are_you_actually_hit })
      this.setState({ if_tracking_macros_protein: this.props.pageThree.if_tracking_macros_protein })
      this.setState({ if_tracking_macros_carbohydrates: this.props.pageThree.if_tracking_macros_carbohydrates })
      this.props.setValue('tracking_calories', this.props.pageThree.tracking_calories)
      this.props.setValue('tracking_macros', this.props.pageThree.tracking_macros)
      this.props.setValue('how_many_calories_are_you_supposed', this.props.pageThree.how_many_calories_are_you_supposed)
      this.props.setValue('how_many_calories_are_you_actually_hit', this.props.pageThree.how_many_calories_are_you_actually_hit)
      this.props.setValue('if_tracking_macros_protein', this.props.pageThree.if_tracking_macros_protein)
      this.props.setValue('if_tracking_macros_carbohydrates', this.props.pageThree.if_tracking_macros_carbohydrates)
      //this.setState({ if_tracking_macros_fat: this.props.pageThree.if_tracking_macros_fat })
    }
  }

  setCalories ( e ) {
    this.setState({ tracking_calories: e.target.value })
    this.props.setValue('tracking_calories', e.target.value)
  }

  setMacros ( e ) {
    this.setState({ tracking_macros: e.target.value })
    this.props.setValue('tracking_macros', e.target.value)
  }

  setCaloriesPerDay ( e ) {
    this.setState({ how_many_calories_are_you_supposed: e.target.value })
    this.props.setValue('how_many_calories_are_you_supposed', e.target.value)
    this.props.validate('how_many_calories_are_you_supposed', e.target.value)
  }

  setHitCaloriesPerDay ( e ) {
    this.setState({ how_many_calories_are_you_actually_hit: e.target.value })
    this.props.setValue('how_many_calories_are_you_actually_hit', e.target.value)
    this.props.validate('how_many_calories_are_you_actually_hit', e.target.value)
  }

  setProteinPerDay ( e ) {
    this.setState({ if_tracking_macros_protein: e.target.value })
    this.props.setValue('if_tracking_macros_protein', e.target.value)
    this.props.validate('if_tracking_macros_protein', e.target.value)
  }

  setCarbsPerDay ( e ) {
    this.setState({ if_tracking_macros_carbohydrates: e.target.value })
    this.props.setValue('if_tracking_macros_carbohydrates', e.target.value)
    this.props.validate('if_tracking_macros_carbohydrates', e.target.value)
  }

  render () {
    const { tracking_calories, tracking_macros, how_many_calories_are_you_supposed } = this.state
    const how_many_calories_are_you_supposed_has_errors = this.props.validationResults.hasOwnProperty('how_many_calories_are_you_supposed') &&
      this.props.validationResults.how_many_calories_are_you_supposed.length
    const how_many_calories_are_you_actually_hit_has_errors = this.props.validationResults.hasOwnProperty('how_many_calories_are_you_actually_hit') &&
      this.props.validationResults.how_many_calories_are_you_actually_hit.length
    const if_tracking_macros_protein_has_errors = this.props.validationResults.hasOwnProperty('if_tracking_macros_protein') &&
      this.props.validationResults.if_tracking_macros_protein.length
    const if_tracking_macros_carbohydrates_has_errors = this.props.validationResults.hasOwnProperty('if_tracking_macros_carbohydrates') &&
      this.props.validationResults.if_tracking_macros_carbohydrates.length

    return (
      <div className="macros-calories-wrap">
        <div className="form-group">
          <div className="input-section-wrapper macros-calories-section">
            <label className="control-label" htmlFor="gender">Have you been tracking your calories?</label>
            <div className="form-group no-margin-bottom">
              <div className="input-wrapper">
                <label className="red-input-holder">
                  <input name="tracking_calories" type="radio" value="no" checked={tracking_calories === 'no'}
                         onChange={this.setCalories.bind(this)}/>
                  <div className="input-ui">
                  <span className="radio-button-outer">
                    <span className="radio-button-inner">
                      &nbsp;
                    </span>
                  </span>
                    <span className="label">
                    No, I'm unaware of my calorie intake
                  </span>
                  </div>
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label className="red-input-holder">
                  <input name="tracking_calories" type="radio" value="yes" checked={tracking_calories === 'yes'}
                         onChange={this.setCalories.bind(this)}/>
                  <div className="input-ui">
                    <span className="radio-button-outer">
                      <span className="radio-button-inner">
                        &nbsp;
                      </span>
                    </span>
                    <span className="label">
                      Yes, I have been tracking my calories
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="input-section-wrapper macros-calories-section">
            <label className="control-label" htmlFor="gender">Have you been tracking your macros?</label>
            <div className="form-group no-margin-bottom">
              <div className="input-wrapper">
                <label className="red-input-holder">
                  <input name="tracking_macros" type="radio" value="no" checked={tracking_macros === 'no'} onChange={this.setMacros.bind(this)}/>
                  <div className="input-ui">
                    <span className="radio-button-outer">
                      <span className="radio-button-inner">
                        &nbsp;
                      </span>
                    </span>
                    <span className="label">
                      No, I am not tracking my macros
                    </span>
                  </div>
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="input-wrapper">
                <label className="red-input-holder">
                  <input name="tracking_macros" type="radio" value="yes" checked={tracking_macros === 'yes'} onChange={this.setMacros.bind(this)}/>
                  <div className="input-ui">
                  <span className="radio-button-outer">
                    <span className="radio-button-inner">
                      &nbsp;
                    </span>
                  </span>
                    <span className="label">
                    Yes, I am tracking my macros
                  </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        {
          tracking_calories === 'yes' ? <div className={'form-group' + (how_many_calories_are_you_supposed_has_errors ? ' has-error' : '')}>
              <div className="input-section-wrapper calories-to-eat">
                <label className="control-label" htmlFor="how_many_calories_are_you_supposed">
                  HOW MANY CALORIES ARE YOU SUPPOSED TO EAT PER DAY?
                </label>
                <div className={'form-group' + (how_many_calories_are_you_supposed_has_errors ? ' has-error' : '')}>
                  <div className="input-wrapper">
                    <div className={'input-group' + ' ' + this.props.forceRerender}>
                      <input type="number"
                             className="form-control disabled_if_no_tracking_calories"
                             id="how_many_calories_are_you_supposed"
                             placeholder="Calories per day"
                             min="0"
                             name="calories_per_day"
                             value={how_many_calories_are_you_supposed}
                             onChange={this.setCaloriesPerDay}
                      />
                      <div className="input-group-addon">CALS</div>
                    </div>
                    {how_many_calories_are_you_supposed_has_errors &&
                    this.props.validationResults.how_many_calories_are_you_supposed.map(( value, index ) => {
                      return value ? (<span key={index * 111 + 44} className="help-block">{value}</span>) : '<span></span>'
                    })
                    }
                  </div>
                </div>
              </div>
              <div className="input-section-wrapper calories-hit-day">
                <label className="control-label" htmlFor="how_many_calories_are_you_supposed">
                  HOW MANY CALORIES Do you actually hit PER DAY?
                </label>
                <div className={'form-group' + (how_many_calories_are_you_actually_hit_has_errors ? ' has-error' : '')}>
                  <div className="input-wrapper">
                    <div className="input-group">
                      <input type="number"
                             className="form-control disabled_if_no_tracking_calories"
                             id="how_many_calories_are_you_supposed"
                             placeholder="Calories you actually hit per day"
                             min="0"
                             name="hitCalories_per_day"
                             value={this.state.how_many_calories_are_you_actually_hit}
                             onChange={this.setHitCaloriesPerDay}
                      />
                      <div className="input-group-addon">CALS</div>
                    </div>
                    {how_many_calories_are_you_actually_hit_has_errors &&
                    this.props.validationResults.how_many_calories_are_you_actually_hit.map(( value, index ) => {
                      return value ? (<span key={index * 111 + 55} className="help-block">{value}</span>) : '<span></span>'
                    })
                    }
                  </div>
                </div>
              </div>
            </div>
            : null

        }
        {
          tracking_macros === 'yes' ? <div className="form-group">
              <div className="input-section-wrapper grams-of-protein">
                <label className="control-label" htmlFor="if_tracking_macros_protein">
                  How many grams of protein do you consume per day?
                </label>
                <div className={'form-group' + (if_tracking_macros_protein_has_errors ? ' has-error' : '')}>
                  <div className="input-wrapper">
                    <div className={'input-group' + ' ' + this.props.forceRerender}>
                      <input type="number" className="form-control disabled_if_no_tracking_macros"
                             id="if_tracking_macros_protein"
                             placeholder="Grams of protein per day"
                             min="0"
                             name="protein_per_day"
                             value={this.state.if_tracking_macros_protein}
                             onChange={this.setProteinPerDay}
                      />
                      <div className="input-group-addon">grams</div>
                    </div>
                    {if_tracking_macros_protein_has_errors &&
                    this.props.validationResults.if_tracking_macros_protein.map(( value, index ) => {
                      return value ? (<span key={index * 111 + 77} className="help-block">{value}</span>) : '<span></span>'
                    })
                    }


                  </div>
                </div>
              </div>
              <div className="input-section-wrapper grams-of-carbs">
                <label className="control-label" htmlFor="if_tracking_macros_protein">
                  How many grams of carbs do you consume per day?
                </label>
                <div className={'form-group' + (if_tracking_macros_carbohydrates_has_errors ? ' has-error' : '')}>
                  <div className="input-wrapper">
                    <div className={'input-group' + ' ' + this.props.forceRerender}>
                      <input
                        type="number" className="form-control disabled_if_no_tracking_macros"
                        id="if_tracking_macros_protein"
                        placeholder="Grams of carbohydrates per day" min="0"
                        name="carbs_per_day"
                        value={this.state.if_tracking_macros_carbohydrates}
                        onChange={this.setCarbsPerDay}

                      />
                      <div className="input-group-addon">grams</div>
                    </div>
                    {if_tracking_macros_carbohydrates_has_errors &&
                    this.props.validationResults.if_tracking_macros_carbohydrates.map(( value, index ) => {
                      return value ? (<span key={index * 111 + 77} className="help-block">{value}</span>) : '<span></span>'
                    })
                    }
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

export default ReactRedux.connect(mapStateToProps)(MacrosCalories)
