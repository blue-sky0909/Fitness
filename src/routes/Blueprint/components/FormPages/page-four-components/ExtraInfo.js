class ExtraInfo extends React.Component {

  static propTypes = {
    setValue: React.PropTypes.func.isRequired,
  }

  constructor ( props ) {

    super(props)

    this.state = {
      extra_info: ''
    }
    this.setComment = this.setComment.bind(this)
  }

  componentDidMount () {

    if ( this.props.orderGet.length > 0 ) {
      const help_commment = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key === 'extra_info'
      })
      if ( help_commment ) {
        this.setState({ extra_info: help_commment.attributes.value })
        this.props.setValue('extra_info', help_commment.attributes.value)
      }

    } else if ( this.props.pageFour ) {
      this.setState({ extra_info: this.props.pageFour.extra_info })
    }
  }

  setComment ( e ) {
    this.setState({ extra_info: e.target.value })
    this.props.setValue('extra_info', e.target.value)
  }

  render () {
    return (

      <div className="form-group">
        <div className="input-section-wrapper anything-else-section">
          <label className="control-label" htmlFor="extra_info">
            Is there anything else that will help us with our work?
          </label>
          <div className="form-group">
            <div className="input-wrapper">
              <textarea name="extra_info"
                        maxLength="250"
                        className="form-control" rows="6"
                        id="extra_info"
                        placeholder="Enter here"
                        value={this.state.extra_info}
                        onChange={this.setComment}
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

export default ReactRedux.connect(mapStateToProps)(ExtraInfo)
