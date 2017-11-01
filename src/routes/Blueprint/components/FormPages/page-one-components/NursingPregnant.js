class NursingPregnant extends React.Component {

  static propTypes = {
    setValue: React.PropTypes.func.isRequired,
    localGender: React.PropTypes.string.isRequired,
    validate: React.PropTypes.func.isRequired
  }

  constructor ( props ) {
    super(props)

    this.state = {
      are_you_pregnant_or_nursing: 'no_i_am_not_pregnant_or_nursing',
      pregnant_months: ''
    }
    this.setNursing = this.setNursing.bind(this)
    this.setMonthsPregnant = this.setMonthsPregnant.bind(this)
  }

  componentDidMount () {

    if ( this.props.orderGet.length > 0 ) {
      const gender = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key === 'gender'
      }).attributes.value
      if ( gender === 'female' ) {
        const nursing = _.find(this.props.orderGet, function ( item ) {
          return item.attributes.key === 'are_you_pregnant_or_nursing'
        }).attributes.value

        if ( nursing === 'yes_i_am_pregnant' ) {
          const pregnant_months = _.find(this.props.orderGet, function ( item ) {
            return item.attributes.key === 'if_pregnant_how_many_months'
          }).attributes.value
          this.setState({ pregnant_months: pregnant_months })
          this.props.setValue('pregnant_months', pregnant_months)
        }

        this.setState({ are_you_pregnant_or_nursing: nursing })
        this.props.setValue('are_you_pregnant_or_nursing', nursing)

      }

    } else if ( this.props.pageOne ) {
      this.setState({ are_you_pregnant_or_nursing: this.props.pageOne.are_you_pregnant_or_nursing })
      this.setState({ pregnant_months: this.props.pageOne.pregnant_months })
      this.props.setValue('are_you_pregnant_or_nursing', this.props.pageOne.are_you_pregnant_or_nursing)
      this.props.setValue('pregnant_months', this.props.pageOne.pregnant_months)
    }
  }

  setNursing ( e ) {
    this.setState({ are_you_pregnant_or_nursing: e.target.value })
    this.props.setValue('are_you_pregnant_or_nursing', e.target.value)
  }

  setMonthsPregnant ( e ) {
    this.setState({ pregnant_months: e.target.value })
    this.props.setValue('pregnant_months', e.target.value)
    this.props.validate('pregnant_months', e.target.value)
  }

  render () {

    const how_many_monts_field = (this.state.are_you_pregnant_or_nursing === 'yes_i_am_pregnant')
    const pregnant_months = this.props.validationResults.hasOwnProperty('pregnant_months') &&
      this.props.validationResults.pregnant_months.length

    let html = (<div className="form-group hide_if_male">
      <div className="input-section-wrapper are-you-preggo">
        <label className="control-label"
               htmlFor="are_you_pregnant_or_nursing"> are you pregnant or
          nursing?</label>
        <div className="form-group">
          <div className="input-wrapper">
            <select className="form-control disabled_if_male" name="are_you_pregnant_or_nursing" value={this.state.are_you_pregnant_or_nursing}
                    onChange={this.setNursing}
                    id="are_you_pregnant_or_nursing" required>
              <option value="no_i_am_not_pregnant_or_nursing">No - I am not pregnant or nursing</option>
              <option value="yes_i_am_pregnant">Yes - I am pregnant</option>
              <option value="yes_i_am_nursing">Yes - I am nursing</option>
            </select>
          </div>
        </div>
      </div>
      {how_many_monts_field === true &&
      <div className="input-section-wrapper how-many-months">
        <label className="control-label">If pregnant, how many months ?</label>
        <div className={'form-group' + (pregnant_months ? ' has-error' : '')}>
          <div className="input-wrapper">
            <div className="input-group">
              <input type="number"
                     className="form-control disabled_if_male disabled_if_no_pregnant_or_nursing "
                     id="if_pregnant_how_many_months" min="1"
                     max="9"
                     name="pregnant_months" value={this.state.pregnant_months}
                     placeholder="If pregnant, how many months ?"
                     onChange={this.setMonthsPregnant}
              />
              <div className="input-group-addon">MTHs</div>
            </div>
            {pregnant_months &&
            this.props.validationResults.pregnant_months.map(( value, index ) => {
              return value ? (<span key={index * 322} className="help-block">{value}</span>) : <span></span>
            })
            }
          </div>
        </div>
      </div>
      }
    </div>)

    if ( this.props.localGender === 'male' ) {
      html = (<div className="form-group hide_if_male"></div>)
    }

    return (
      html
    )
  }
}

function mapStateToProps ( state ) {
  return {
    pageOne: state.pageOneReducer.pageOneData
  }
}

export default ReactRedux.connect(mapStateToProps)(NursingPregnant)
