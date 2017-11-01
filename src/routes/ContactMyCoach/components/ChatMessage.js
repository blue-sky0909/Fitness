import './ChatMessage.scss'
import Avatar from 'components/Avatar'

class ChatMessage extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    image: PropTypes.string,
    sending: PropTypes.bool,
    sent: PropTypes.bool,
    type: PropTypes.oneOf(['sender', 'receiver'])
  }

  render () {
    const { content, createdAt, image, sending, sent, type } = this.props

    return <div className={type === 'sender' ? 'sender-text' : 'receiver-text'}>
      <Avatar className='inner-chat-image' image={image} size='smallest' />
      <div className='chat-message-body'>
        <p>
          {content}
        </p>
        <span>
          { sending && <i className='btm bt-clock' aria-hidden='true' /> }
          { sent && <i className='btm bt-check' aria-hidden='true' /> }
          {moment(createdAt).format('lll')}
        </span>
      </div>
      <div className='clear' />
    </div>
  }
}

export default ChatMessage
