let trainingList = []
let cardioList = []

class TypeExplanations extends React.Component {

  constructor ( props ) {
    super(props)

    this.state = {
      trainingLableList: [
        {
          label: 'None',
          checked: false,
          value: 'none',
        },
        {
          label: 'Crossfit',
          checked: false,
          value: 'crossfit',
        },
        {
          label: 'Bodybuilding',
          checked: false,
          value: 'bodybuilding',
        },
        {
          label: 'Sports/athletics',
          checked: false,
          value: 'sportAthletics',
        },
        {
          label: 'At home workouts',
          checked: false,
          value: 'atHomeWorkouts',
        },
        {
          label: 'Pole Fitness, Calisthenics, Plyo, Bodyweight',
          checked: false,
          value: 'poleFitnessCalisthenicsBodyweight',
        },
        {
          label: 'Olympic Lifting',
          checked: false,
          value: 'oplympicLifting',
        },
        {
          label: 'Powerlifting',
          checked: false,
          value: 'powerlifting',
        },
        {
          label: 'Bootcamps',
          checked: false,
          value: 'bootcamps',
        },
        {
          label: 'Fitness classes at the gym',
          checked: false,
          value: 'fitnessClassesAtTheGym',
        },
        {
          label: 'I just lift weights and use machines at the gym sometimes',
          checked: false,
          value: 'lifeAndUseMachinesAtGym',
        }

      ],
      cardioLabelList: [
        {
          label: 'None',
          checked: false,
          value: 'none',
        },
        {
          label: 'Low Intensity (Walking)',
          checked: false,
          value: 'liss',
        },
        {
          label: 'High Intensity (Running)',
          checked: false,
          value: 'hiss',
        },
        {
          label: 'High Intensity Interval Training (HIIT), Tabata',
          checked: false,
          value: 'hiit',
        },
        {
          label: 'Zumba, boxing, spin, etc',
          checked: false,
          value: 'zumbaBoxingSpin',
        },
        {
          label: 'Yoga, Pilates, Barre',
          checked: false,
          value: 'YogoPilatesBarre',
        },
        {
          label: 'Medium Intensity (Jogging)',
          checked: false,
          value: 'miss',
        },
        {
          label: 'Intervals (Sprints)',
          checked: false,
          value: 'mediumIntensity',
        },
        {
          label: 'Crossfit, Bootcamps',
          checked: false,
          value: 'crossfitBootcamps',
        },
        {
          label: 'Pole Fitness, Calisthenics, Plyo, Bodyweight',
          checked: false,
          value: 'PoleFitness',
        },

      ]
    }

    this.setTraining = this.setTraining.bind(this)
    this.setCardio = this.setCardio.bind(this)
  }

  componentDidMount () {

    if ( this.props.orderGet.length > 0 ) {
      const weightTrainingType = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key == 'WeightTrainingType'
      }).attributes.value
      const weightCardioType = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key == 'cardioExplination'
      }).attributes.value
      trainingList = JSON.parse(weightTrainingType)
      cardioList = JSON.parse(weightCardioType)
      this.state.trainingLableList.forEach(( item, index ) => {
        if ( trainingList.indexOf(item.value) > -1 ) {
          this.state.trainingLableList[ index ].checked = true
        }
      })
      this.state.cardioLabelList.forEach(( item, index ) => {
        if ( cardioList.indexOf(item.value) > -1 ) {
          this.state.cardioLabelList[ index ].checked = true
        }
      })
      // this.setState({ weightTrainingType: weightTrainingType })
      // this.setState({ weightCardioType: weightCardioType })

      this.props.setValue('weightTrainingType', trainingList)
      this.props.setValue('weightCardioType', cardioList)

    } else if ( this.props.pageTwo ) {
      // this.setState({ weightTrainingType: this.props.pageTwo.weightTrainingType })
      // this.setState({ weightCardioType: this.props.pageTwo.weightCardioType })

      trainingList = this.props.pageTwo.weightTrainingType ? this.props.pageTwo.weightTrainingType : []
      cardioList = this.props.pageTwo.weightCardioType ? this.props.pageTwo.weightCardioType : []
      if ( trainingList.length ) {
        this.state.trainingLableList.forEach(( item, index ) => {
          if ( trainingList.indexOf(item.value) > -1 ) {
            this.state.trainingLableList[ index ].checked = true
          }
        })
      }
      if ( cardioList.length ) {
        this.state.cardioLabelList.forEach(( item, index ) => {
          if ( cardioList.indexOf(item.value) > -1 ) {
            this.state.cardioLabelList[ index ].checked = true
          }
        })
      }
      this.props.setValue('weightTrainingType', trainingList)
      this.props.setValue('weightCardioType', cardioList)
    }
  }

  setTraining ( e ) {
    const index = trainingList.indexOf(this.state.trainingLableList[ e.target.value ].value)
    _.remove(trainingList, ( currentObject ) => {
      return currentObject === this.state.trainingLableList[ e.target.value ].value
    })
    if ( index === -1 ) {
      trainingList.push(this.state.trainingLableList[ e.target.value ].value)
    }
    this.state.trainingLableList[ e.target.value ].checked = !this.state.trainingLableList[ e.target.value ].checked
    this.setState({ weightTrainingType: trainingList })
    this.props.setValue('weightTrainingType', trainingList)
    this.props.validate('weightTrainingType', trainingList)
  }

  setCardio ( e ) {
    const index = cardioList.indexOf(this.state.cardioLabelList[ e.target.value ].value)
    _.remove(cardioList, ( currentObject ) => {
      return currentObject === this.state.cardioLabelList[ e.target.value ].value
    })
    if ( index === -1 ) {
      cardioList.push(this.state.cardioLabelList[ e.target.value ].value)
    }
    this.state.cardioLabelList[ e.target.value ].checked = !this.state.cardioLabelList[ e.target.value ].checked
    this.setState({ weightCardioType: cardioList })
    this.props.setValue('weightCardioType', cardioList)
    this.props.validate('weightCardioType', cardioList)
  }

  render () {
    const { trainingLableList, cardioLabelList } = this.state
    const weightTrainingType_has_errors = this.props.validationResults.hasOwnProperty('weightTrainingType') &&
      this.props.validationResults.weightTrainingType.length
    const weightCardioType_has_errors = this.props.validationResults.hasOwnProperty('weightCardioType') &&
      this.props.validationResults.weightCardioType.length
    return (
      <div className="form-group">
        <div className="input-section-wrapper strength-training-section">
          <label className="control-label" htmlFor="specific_life_style">
            What kind of strength training are you doing?
          </label>
          <div className={'form-group' + (weightTrainingType_has_errors ? ' has-error' : '')}>
            <div className="row">
              {
                trainingLableList.map(( value, index ) => (
                  <div key={index + 1 * 100} className=" col-xs-12 col-sm-6">
                    <div className="input-wrapper">
                      <label className="red-input-holder-checkbox">
                        <input type="checkbox" name="weightTrainingType"
                               value={index}
                               checked={
                                 value.checked
                               }
                               onChange={this.setTraining}/>
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
          {weightTrainingType_has_errors &&
          this.props.validationResults.weightTrainingType.map(( value, index ) => {
            return value ? (<span key={index * 232321 + 6} className="help-block checkboxes-groups">{value}</span>) : '<span></span>'
          })
          }
        </div>

        <div className="input-section-wrapper cardio-type-section">
          <label className="control-label" htmlFor="specific_life_style">What kind of cardio are you doing? </label>
          <div className={'form-group' + (weightCardioType_has_errors ? ' has-error' : '')}>
            <div className="row">
              {
                cardioLabelList.map(( value, index ) => (
                  <div key={index + 1 * 10} className=" col-xs-12 col-sm-6">
                    <div className="input-wrapper">
                      <label className="red-input-holder-checkbox">
                        <input type="checkbox" name="weightCardioType"
                               value={index}
                               checked={
                                 value.checked
                               }
                               onChange={this.setCardio}/>
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
          {weightCardioType_has_errors &&
          this.props.validationResults.weightCardioType.map(( value, index ) => {
            return value ? (<span key={index * 232321 + 7} className="help-block checkboxes-groups">{value}</span>) : '<span></span>'
          })
          }
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

export default ReactRedux.connect(mapStateToProps)(TypeExplanations)
