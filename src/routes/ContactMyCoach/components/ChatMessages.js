import './ChatMessages.scss'
import config from 'config'
import user from 'auth/user'
import LoadingIndicator from 'components/LoadingIndicator'
import ErrorAlert from 'components/ErrorAlert'
import ChatMessage from './ChatMessage'

class ChatMessages extends React.Component {
  static propTypes = {
    messagesGetRequest: PropTypes.func.isRequired,
    conversationId: PropTypes.string.isRequired,
    messagesGet: PropTypes.shape({
      loaded: PropTypes.bool,
      loading: PropTypes.bool,
      error: PropTypes.any,
      data: PropTypes.array
    }),
    sendingMessages: PropTypes.array.isRequired,
    sentMessages: PropTypes.array.isRequired,
    userGet: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.notificationsReadPost = this.notificationsReadPost.bind(this)
  }

  componentDidMount() {
    const {messagesGet, notificationsGet} = this.props
    const unReadMessages = _.filter(notificationsGet.data.formattedData, x => x.read === false)
    
    _.map(unReadMessages, (element) => {
      const unReadIds = _.filter(messagesGet.data, x => x.id == element.ref)
      if(unReadIds.length > 0){
        this.notificationsReadPost(element.id)
      }
    })
  }
  componentWillMount () {
    this.props.messagesGetRequest(this.props.conversationId)
    this.timer = setInterval(this.timerTick, config.messagesUpdateInterval)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  timerTick = () => {
    this.props.messagesGetRequest(this.props.conversationId, null, true)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.sendingMessages.length < this.props.sendingMessages.length) {
      this.messageWrapper.scrollTop = this.messageWrapper.scrollHeight
    }

    if ((!prevProps.messagesGet || !prevProps.messagesGet.data) &&
      (this.props.messagesGet && this.props.messagesGet.data)) {
      this.messageWrapper.scrollTop = this.messageWrapper.scrollHeight
      this.scrolledDown = true
    }

    if (prevProps.messagesGet && prevProps.messagesGet.data &&
      this.props.messagesGet && this.props.messagesGet.data &&
      !prevProps.messagesGet.loadingFromTimer &&
      prevProps.messagesGet.data.length < this.props.messagesGet.data.length) {
      const lastMessage = prevProps.messagesGet.data[0]
      this.messageWrapper.scrollTop = this.messages[lastMessage.id].offsetTop - 100
    }

    if (prevProps.messagesGet && prevProps.messagesGet.data &&
      this.props.messagesGet && this.props.messagesGet.data &&
      prevProps.messagesGet.loadingFromTimer &&
      prevProps.messagesGet.data.length < this.props.messagesGet.data.length &&
      this.scrolledDown) {
      this.messageWrapper.scrollTop = this.messageWrapper.scrollHeight
      this.scrolledDown = true
    }
  }

  messagesWrapperRef = (el) => {
    if (!this.messageWrapper) {
      el.scrollTop = el.scrollHeight
    }
    this.messageWrapper = el
  }

  messages = {}
  messageRef = (id, el) => {
    this.messages[id] = ReactDOM.findDOMNode(el)
  }

  notificationsReadPost(id) {
    this.props.notificationsReadPostRequest(id)
    this.props.removedselectUnReadMessageId()
  }

  onScroll = () => {
    const {messagesGet, notificationsGet} = this.props
    if (!messagesGet.loading && this.messageWrapper.scrollTop === 0 && !messagesGet.noMoreMessages) {
      this.props.messagesGetRequest(this.props.conversationId, messagesGet.data[0]['created-at'])
    }
    const unReadMessages = _.filter(notificationsGet.data.formattedData, x => x.read === false)

    _.map(unReadMessages, (element) => {
      const unReadIds = _.filter(messagesGet.data, x => x.id == element.ref)
      if(unReadIds.length > 0){
        this.notificationsReadPost(element.id)
      }
    })

    this.scrolledDown =
      Math.abs(this.messageWrapper.scrollTop + this.messageWrapper.offsetHeight - this.messageWrapper.scrollHeight) < 5
    

  }

  renderMessages () {
    const { messagesGet, sendingMessages, sentMessages, userGet, notificationsGet } = this.props
    return <div className='col-md-12'>
      <div className='messages-wrapper' onScroll={this.onScroll} ref={this.messagesWrapperRef}>
        {
          messagesGet && messagesGet.loading &&
          <LoadingIndicator className='messages-loading-indicator' type='small-spinner' />
        }

        {
          messagesGet && messagesGet.error &&
          <ErrorAlert error={messagesGet.error} />
        }

        {
          messagesGet && messagesGet.noMoreMessages &&
          <div className='messages-no-more-messages'>There are no more messages.</div>
        }

        {
          messagesGet && messagesGet.data && _.map(messagesGet.data, (message) =>
            <ChatMessage
              key={message.id}
              ref={(el) => this.messageRef(message.id, el)}
              content={message.content}
              createdAt={message['created-at']}
              image={message.author.attributes.avatar}
              sent={message.author.id === user.id}
              type={message.author.id === user.id ? 'receiver' : 'sender'} />)
        }

        {
          sentMessages && _.map(sentMessages, (message) =>
            <ChatMessage
              key={'sent' + message.messageId}
              content={message.content}
              createdAt={message.createdAt}
              image={userGet.data.data.attributes.avatar}
              sent
              type='receiver' />)
        }

        {
          sendingMessages && _.map(sendingMessages, (message) =>
            <ChatMessage
              key={'sending' + message.requestId}
              content={message.content}
              createdAt={message.createdAt}
              image={userGet.data.data.attributes.avatar}
              sending
              type='receiver' />)
        }

      </div>
    </div>
  }

  render () {
    return <div className='row chat-window'>
      {this.renderMessages()}
    </div>
  }
}

export default ChatMessages
