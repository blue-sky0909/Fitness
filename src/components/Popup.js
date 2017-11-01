import './Popup.scss'
import Button from 'components/controls/Button'
import { Link, browserHistory } from 'react-router'

class Popup extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    backUrl: PropTypes.string
  }

  componentWillMount () {
    window.addEventListener('keydown', this.onKeyDown, true)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.onKeyDown, true)
  }

  onKeyDown = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
      e.preventDefault()
      browserHistory.push(this.props.backUrl)
      return false
    }
  }

  onOverlayClick = (e) => {
    if (e.target === this.overlay) {
      browserHistory.push(this.props.backUrl)
    }
  }

  render () {
    const { children, backUrl, ...others } = this.props

    return <div onClick={this.onOverlayClick} ref={(x) => { this.overlay = x }} className='overlay' to={backUrl}>
      <div className='popup' {...others} >
        <Link to={backUrl} >
          <Button appearance='bordered' color='grey'>Go Back</Button>
        </Link>
        {children}
      </div>
    </div>
  }
}

export default Popup
