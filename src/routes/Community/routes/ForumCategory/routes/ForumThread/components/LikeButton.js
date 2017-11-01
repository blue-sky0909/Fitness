import './LikeButton.scss'
import Button from 'components/controls/Button'

class LikeButton extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    likeCount: PropTypes.number,
    liked: PropTypes.bool,
    like: PropTypes.object.isRequired,
    likeRequest: PropTypes.func.isRequired,
    dislike: PropTypes.object.isRequired,
    dislikeRequest: PropTypes.func.isRequired
  }

  onClick = () => {
    const { liked } = this.state
    const { likeRequest, dislikeRequest } = this.props

    if (liked) {
      dislikeRequest()
    } else {
      likeRequest()
    }

    this.setState({ liked: !liked })
  }

  componentWillMount () {
    this.setState({ liked: this.props.liked })
  }

  render () {
    const { likeCount, like, dislike, className } = this.props
    const { liked } = this.state

    const iconClassName = classnames('btm bt-heart', liked ? 'liked' : 'not-liked')

    return <div className={classnames(className, 'forum-like-button')}>
      {
        likeCount > 0 &&
        <span>
          {likeCount + ' '}
          {
            likeCount === 1 ? 'like' : 'likes'
          }
        </span>
      }
      <Button
        disabled={like.loading || dislike.loading}
        appearance='simple'
        onClick={this.onClick}
        color='grey'>
        <i className={iconClassName} />
      </Button>
    </div>
  }
}

export default LikeButton
