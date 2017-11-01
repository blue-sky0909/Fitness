import { Link } from 'react-router'

class NextButton extends React.Component {

  constructor ( props ) {
    super(props)

    this.validatePageBefore = this.validatePageBefore.bind(this)
  }

  validatePageBefore ( e ) {
    if ( !this.props.validateAll() ) {
      e.preventDefault()
      return false
    }
  }

  render () {
    const { nextPage, label, disabled } = this.props
    //console.log(disabled)
    return (
      <div className="button-wrap next">
        <Link to={'/blueprint/' + nextPage} onClick={this.validatePageBefore}>{label}<i className="btb bt-angle-right"></i></Link>
      </div>
    )
  }

}

export default NextButton
