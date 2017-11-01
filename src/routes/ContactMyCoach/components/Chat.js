import './Chat.scss'
import ChatMessages from './ChatMessages'

// requestId used in messagePost reducer to allow user to write new message while previous one is in process
let requestId = 0

class Chat extends React.Component {
  static propTypes = {
    conversationId: PropTypes.string.isRequired,
    messagesGet: PropTypes.shape({
      loaded: PropTypes.bool,
      loading: PropTypes.bool,
      error: PropTypes.any,
      data: PropTypes.array
    }),
    messagesGetRequest: PropTypes.func.isRequired,
    messagePost: PropTypes.object.isRequired,
    messagePostRequest: PropTypes.func.isRequired,
    userGet: PropTypes.object.isRequired
  }

  state = {
    sendingMessages: [],
    sentMessages: []
  }

  constructor(props) {
    super(props)

    this.notificationsReadPostRequest = this.notificationsReadPostRequest.bind(this)
    this.removedselectUnReadMessageId = this.removedselectUnReadMessageId.bind(this)
  }

  onMessageFormSubmit = (e) => {
    e.preventDefault()
    const content = this.input.value

    if (content) {
      const { messagePostRequest, conversationId } = this.props

      this.setState({
        sendingMessages: _.concat(
          this.state.sendingMessages,
          { requestId: `${conversationId}${requestId}`, content, createdAt: new Date().toISOString() })
      }, () => {
        messagePostRequest(`${conversationId}${requestId}`, conversationId, content)
        requestId++
      })

      this.input.value = ''
    }
  }

  componentDidMount() {
    const { conversationId, messagesGet, notificationsGet } = this.props    
    const unReadMessages = _.filter(notificationsGet.data.formattedData, x => x.read === false)
    
    _.map(unReadMessages, (element) => {
      const unReadIds = _.filter(messagesGet[conversationId].data, x => x.id == element.ref)
      if(unReadIds.length > 0){
        this.notificationsReadPostRequest(element.id)
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    const props = this.props
    let nextSendingMessages = _.clone(this.state.sendingMessages)
    let nextSentMessages = _.clone(this.state.sentMessages)

    // when message uploaded move it to sentMessages
    _.each(this.state.sendingMessages, (item) => {
      const requestId = item.requestId

      if (props.messagePost[requestId] &&
          props.messagePost[requestId].loading &&
          nextProps.messagePost[requestId] &&
          nextProps.messagePost[requestId].loaded) {
        const sendingMessage = _.find(this.state.sendingMessages, x => x.requestId === requestId)
        const sentMessage = {
          ...sendingMessage,
          messageId: nextProps.messagePost[requestId].data.id
        }
        nextSentMessages.push(sentMessage)
        _.remove(nextSendingMessages, (x) => x.requestId === requestId)
      }
    })

    const conversationId = this.props.conversationId

    // remove fetched messages from sentMessages array
    if (props.messagesGet[conversationId] &&
        (props.messagesGet[conversationId].loading || props.messagesGet[conversationId].loadingFromTimer) &&
        nextProps.messagesGet[conversationId] &&
        nextProps.messagesGet[conversationId].loaded) {
      _.each(_.clone(nextSentMessages), (x) => {
        if (_.some(nextProps.messagesGet[conversationId].data, item => item.id === x.messageId)) {
          _.remove(nextSentMessages, item => item === x)
        }
      })
    }

    this.setState({
      sendingMessages: nextSendingMessages,
      sentMessages: nextSentMessages
    })
  }

  notificationsReadPostRequest (id) {
    this.props.notificationsReadPostRequest(id)
  }
  removedselectUnReadMessageId() {
    this.props.removedselectUnReadMessageIdRequest()
  }

  render () {
    const { conversationId, messagesGetRequest, messagesGet, userGet, notificationsGet } = this.props
    const { sendingMessages, sentMessages } = this.state
    return <div className='open-conversation'>

      <ChatMessages
        conversationId={conversationId}
        messagesGetRequest={messagesGetRequest}
        messagesGet={messagesGet[conversationId]}
        sendingMessages={sendingMessages}
        sentMessages={sentMessages}
        userGet={userGet}
        notificationsGet={notificationsGet}
        notificationsReadPostRequest={this.notificationsReadPostRequest}
        removedselectUnReadMessageId={this.removedselectUnReadMessageId} />

      <div className='chat-options'>
        <form onSubmit={this.onMessageFormSubmit} className='row'>
          <div className='col-md-10'>
            <input
              ref={(x) => { this.input = x }}
              type='text'
              placeholder='Enter Your Message'
              className='type-message' />
          </div>
          <div className='col-md-2'>
            <button
              type='submit'
              className='send'>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  }
}

export default Chat
