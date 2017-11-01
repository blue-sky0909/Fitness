import { Link } from 'react-router'

class PrevButton extends React.Component {
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
    return (
      <div className="button-wrap prev">
        <Link to={'/blueprint/' + this.props.prevPage} onClick={this.validatePageBefore}><i className="btb bt-angle-left"></i>{this.props.label}
        </Link>
      </div>
    )
  }
}

export default PrevButton
