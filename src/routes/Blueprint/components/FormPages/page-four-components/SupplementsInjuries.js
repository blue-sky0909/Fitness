class SupplementsInjuries extends React.Component {

  static propTypes = {
    setValue: React.PropTypes.func.isRequired,
  }

  constructor ( props ) {

    super(props)

    this.state = {
      list_all_supplements: '',
      current_injuries: ''
    }
    this.setAllSupplements = this.setAllSupplements.bind(this)
    this.setCurrentInjuries = this.setCurrentInjuries.bind(this)
  }

  componentDidMount () {

    if ( this.props.orderGet.length > 0 ) {

      const list_all_supplements = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key == 'list_all_supplements'
      })
      const current_injuries = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key === 'current_injuries'
      })
      if ( list_all_supplements ) {
        this.setState({ list_all_supplements: list_all_supplements.attributes.value })
        this.props.setValue('list_all_supplements', list_all_supplements.attributes.value)
      }
      if ( current_injuries ) {
        this.setState({ current_injuries: current_injuries.attributes.value })
        this.props.setValue('current_injuries', current_injuries.attributes.value)
      }

    } else if ( this.props.pageFour ) {
      this.setState({ list_all_supplements: this.props.pageFour.list_all_supplements })
      this.setState({ current_injuries: this.props.pageFour.current_injuries })
    }
  }

  setAllSupplements ( e ) {
    this.setState({ list_all_supplements: e.target.value })
    this.props.setValue('list_all_supplements', e.target.value)
  }

  setCurrentInjuries ( e ) {
    this.setState({ current_injuries: e.target.value })
    this.props.setValue('current_injuries', e.target.value)
  }

  render () {
    return (
      <div className="form-group">
        <div className="input-section-wrapper supplements-section">
          <label className="control-label" htmlFor="list_all_supplements">
            Supplements you are taking
          </label>
          <div className="form-group">
            <div className="input-wrapper">
              <input type="text" className="form-control"
                     id="list_all_supplements"
                     placeholder="Enter here"
                     maxLength="100"
                     name="list_all_supplements"
                     value={this.state.list_all_supplements}
                     onChange={this.setAllSupplements}
              />
            </div>
          </div>
        </div>
        <div className="input-section-wrapper current-injuries-section">
          <label className="control-label" htmlFor="current_injuries">
            any current injuries?
          </label>
          <div className="form-group">
            <div className="input-wrapper">
              <input type="text" className="form-control"
                     id="current_injuries"
                     placeholder="Enter here"
                     maxLength="100"
                     name="current_injuries"
                     value={this.state.current_injuries}
                     onChange={this.setCurrentInjuries}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

}

function mapStateToProps ( state ) {
  return {
    pageFour: state.pageFourReducer.pageFourData
  }
}

export default ReactRedux.connect(mapStateToProps)(SupplementsInjuries)
