class ProteinField extends React.Component {
  static propTypes = {
    setValue: React.PropTypes.func.isRequired,

  }

  constructor ( props ) {
    super(props)
    this.state = {
      protein_powder: '',
    }
    this.setProteinPowder = this.setProteinPowder.bind(this)
  }

  componentDidMount () {

    if ( this.props.orderGet.length > 0 ) {
      const protein_powder = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key === 'protein_powder'
      })
      if ( protein_powder ) {
        this.setState({ extra_info: protein_powder.attributes.value })
        this.props.setValue('extra_info', protein_powder.attributes.value)
      }

    } else if ( this.props.customMealPlanReducer ) {
      this.setState({ protein_powder: this.props.customMealPlanReducer.protein_powder })
    }
  }

  setProteinPowder ( e ) {
    this.setState({ protein_powder: e.target.value })
    this.props.setValue('protein_powder', e.target.value)
  }

  render () {
    return (
      <div className={'form-group'}>
        <div className="input-section-wrapper">
          <label className="control-label" htmlFor="protein_powder">If you
            want
            us to include a protein powder in your meals, please list the
            exact
            brand and flavor you prefer.
          </label>
          <div className={'form-group'}>
            <div className="input-wrapper">
              <input type="text" name="protein_powder" onChange={this.setProteinPowder} className="form-control"
                        rows="6" id="protein_powder"
                        value={this.state.protein_powder}
                        placeholder="Be as specific as possible so you get exactly what you want"/>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ( state ) {
  return {
    customMealPlanReducer: state.customMealPlanReducer.customMealPlan
  }
}

export default ReactRedux.connect(mapStateToProps)(ProteinField)
