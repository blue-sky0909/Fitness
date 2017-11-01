import { connect } from 'react-redux'
import config from 'config'
import './Conversation.scss'
import ChatContainer from '../containers/ChatContainer'
import Button from 'components/controls/Button'
import Avatar from 'components/Avatar'
import { messagesGetRequest } from '../reducers/messagesGet'
class Conversation extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      opened: false,
      getUnReadMessage: {}
    }
  }

  componentWillMount() {
    const { item } = this.props
    this.props.messagesGetRequest(item.id, null, false)
    this.timer = setInterval(this.timerTick, config.messagesUpdateInterval)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  componentWillReceiveProps(nextProps) {
    const { messagesGet, selectUnReadMessageIdGet, item } = nextProps
    if(!_.isNil(selectUnReadMessageIdGet.data) && !_.isNil(messagesGet)) {
      let getUnReadMessage = {}
      _.map(messagesGet, (element) => {
        if(element.loaded) {
          getUnReadMessage = _.find(element.data, (x)=> x.id == selectUnReadMessageIdGet.data.ref)
          if(!_.isNil(getUnReadMessage)) {
            this.setState({getUnReadMessage})
            this.setState({ opened: item.id == getUnReadMessage.conversation })
          }
        }
      })      
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { messagesGet } = prevProps
    let latestMessages = []
    _.map(messagesGet, (element) => {
      if(element.loaded) {          
        const sortedElement =  _.sortBy(element.data, ['created-at'])
        const lastestElement = sortedElement[sortedElement.length - 1]
        const flag = _.find(latestMessages, x=>x.id == lastestElement.id)
        if(_.isNil(flag)) {
          latestMessages.push(lastestElement)
        }         
      }
    })
  }

  timerTick = () => {
    const { item } = this.props
    this.props.messagesGetRequest(item.id, null, false)
  }

  onChatOpenClick = () => {
    this.setState({ opened: true })
  }

  onChatCloseClick = () => {
    this.setState({ opened: false })
  }

  render () {
    const { item, messagesGet, selectUnReadMessageIdGet } = this.props
    const { getUnReadMessage } = this.state

    let latestMessages = []
    if(!_.isNil(messagesGet)) {
      _.map(messagesGet, (element) => {
        if(element.loaded) {
          const sortedElement =  _.sortBy(element.data, ['created-at'])
          const lastestElement = sortedElement[sortedElement.length - 1]
          latestMessages.push(lastestElement)
        }
      })
    }

    const { opened } = this.state
    const lastMessageAuthor = item.lastMessage && item.lastMessage.attributes.author === item.coach.id * 1 
                              ? item.coach
                              : item.customer
  
    if(latestMessages.length > 0) {

      return <div key={item.id} className='conversation'>
        <div className='row'>
          <div className='col-md-1 col-sm-3 col-3'>
            <div className='user-chat-image'>
              {              
                _.map(latestMessages, (element) => 
                  element.conversation == item.id ?
                    <Avatar key={item.id} size='small' image={element.author.attributes.avatar} />
                  : null
                )              
              }
            </div>
          </div>
          <div className='col-md-2 col-sm-3 col-4'>
            <div className='chat-excerpt'>{item.title}</div>
          </div>
          <div className='col-md-4 col-sm-6 col-5'>
          
            {              
              _.map(latestMessages, (element) => 
                element.conversation == item.id ?
                  element.content.length > 100 ?
                    <div className='chat-content' key={item.id}>
                      {element.content.substr(0, 100) + "..." }
                    </div>
                  : <div className='chat-content' key={item.id}>
                      {element.content}
                    </div>
                : null
              )              
            }
            
          </div>
          <div className='col-md-3 col-sm-3 col-8'>
            {              
              _.map(latestMessages, (element) => 
                element.conversation == item.id ?
                  <div key={item.id} className='time'>{moment(item['last-message-at']).format('lll')}</div>
                : null
              )              
            }
          </div>
          <div className='col-md-2 col-sm-3 col-4'>
            <div className='open-close'>
              {
                opened
                  ? <Button appearance='simple' color='grey' onClick={this.onChatCloseClick}>Collapse</Button>
                  : <Button appearance='simple' color='grey' onClick={this.onChatOpenClick}>Expand</Button>
              }
            </div>
          </div>

          { item['unread-messages-count'] > 0 && <div className='conversation_unread'>{item['unread-messages-count']}</div> }
        </div>
        { opened && <ChatContainer conversationId={item.id} /> }
      </div>
    } else {
      return null
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  messagesGetRequest: 
    (conversationId, createdAt = null, fromTimer = false) =>  dispatch(messagesGetRequest(conversationId, createdAt, fromTimer))
})

const mapStateToProps = (state) => ({
  messagesGet: state.messagesGet,
  selectUnReadMessageIdGet: state.selectUnReadMessageIdGet
})

export default connect(mapStateToProps, mapDispatchToProps)(Conversation)
