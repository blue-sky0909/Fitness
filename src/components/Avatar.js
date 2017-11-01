import './Avatar.scss'
import defaultAvatar from 'assets/default-avatar.jpg'

class Avatar extends React.Component {
  static propTypes = {
    image: PropTypes.string,
    size: PropTypes.oneOf(['smallest', 'small', 'normal', 'big']),
    className: PropTypes.string
  }

  render () {
    const { image, size, className } = this.props
    const imgClassName = classnames(className, 'avatar', 'avatar_' + size)

    return <img className={imgClassName} src={image || defaultAvatar} />
  }
}

export default Avatar
