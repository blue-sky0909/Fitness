class DiseasesPrescriptions extends React.Component {

  static propTypes = {
    setValue: React.PropTypes.func.isRequired,
  }

  constructor ( props ) {

    super(props)

    this.state = {
      diseases_we_should_know_of: '',
      list_all_prescription: ''
    }
    this.setDiseases = this.setDiseases.bind(this)
    this.setPresscription = this.setPresscription.bind(this)
  }

  componentDidMount () {

    if ( this.props.orderGet.length > 0 ) {

      const diseases = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key === 'diseases_we_should_know_of'
      })
      const all_prescription = _.find(this.props.orderGet, function ( item ) {
        return item.attributes.key === 'list_all_prescription'
      })

      if ( diseases ) {
        this.setState({ diseases_we_should_know_of: diseases.attributes.value })
        this.props.setValue('diseases_we_should_know_of', diseases.attributes.value)

      }

      if ( all_prescription ) {
        this.setState({ list_all_prescription: all_prescription.attributes.value })
        this.props.setValue('list_all_prescription', all_prescription.attributes.value)
      }

    } else if ( this.props.pageFour ) {
      this.setState({ diseases_we_should_know_of: this.props.pageFour.diseases_we_should_know_of })
      this.setState({ list_all_prescription: this.props.pageFour.list_all_prescription })
    }
  }

  setDiseases ( e ) {
    this.setState({ diseases_we_should_know_of: e.target.value })
    this.props.setValue('diseases_we_should_know_of', e.target.value)
  }

  setPresscription ( e ) {
    this.setState({ list_all_prescription: e.target.value })
    this.props.setValue('list_all_prescription', e.target.value)
  }

  render () {
    return (
      <div className="form-group">
        <div className="input-section-wrapper diseases-section">
          <label className="control-label" htmlFor="diseases_we_should_know_of">
            Any diseases we should know about?
          </label>
          <div className="form-group">
            <div className="input-wrapper">
              <input type="text" className="form-control"
                     id="diseases_we_should_know_of"
                     placeholder="Enter here"
                     maxLength="100"
                     name="diseases"
                     value={this.state.diseases_we_should_know_of}
                     onChange={this.setDiseases}
              />
            </div>
          </div>
        </div>

        <div className="input-section-wrapper prescription-section">
          <label className="control-label" htmlFor="list_all_prescription">
            All prescription medications
          </label>
          <div className="form-group">
            <div className="input-wrapper">
              <input type="text" className="form-control"
                     id="list_all_prescription"
                     maxLength="100"
                     placeholder="Enter here"
                     name="all_prescription"
                     value={this.state.list_all_prescription}
                     onChange={this.setPresscription}
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

export default ReactRedux.connect(mapStateToProps)(DiseasesPrescriptions)
