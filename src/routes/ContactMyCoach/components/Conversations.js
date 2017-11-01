import './Conversations.scss'
import config from 'config'
import LoadingIndicator from 'components/LoadingIndicator'
import ErrorAlert from 'components/ErrorAlert'
import Conversation from './Conversation'
import MyCoachContainer from '../containers/MyCoachContainer'
class Conversations extends React.Component {
  static propTypes = {
    conversationsGetRequest: PropTypes.func.isRequired,
    conversationsGet: PropTypes.shape({
      loaded: PropTypes.bool,
      loading: PropTypes.bool,
      error: PropTypes.any,
      data: PropTypes.object
    })
  }

  timer = null
  componentWillMount () {
    this.props.conversationsGetRequest()
    this.timer = setInterval(this.timerTick, config.messagesUpdateInterval)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  timerTick = () => {
    if (this.props.conversationsGet.data && this.props.conversationsGet.data.formattedData.length) {
      this.props.conversationsGetRequest()
    }
  }

  componentWillReceiveProps (nextProps) {

  }

  render () {
    const { conversationsGet, notificationsGet } = this.props
    if (conversationsGet.loading && !conversationsGet.data) {
      return <LoadingIndicator type='grid' />
    } else if (conversationsGet.error) {
      return <ErrorAlert error={conversationsGet.error} />
    } else if (conversationsGet.loaded || conversationsGet.data) {
      
      return (
        <div className='conversations-wrap'>
          {
            conversationsGet.data.formattedData.length
              ? _.map(conversationsGet.data.formattedData, (item) => (<Conversation item={item} key={item.id} />))
              : null
          } 
          {/* <div>
            <div className='conversations-empty'>You have no conversations yet.</div>
            <MyCoachContainer />
          </div>  */}
        </div>
      )
    } 
    return null
  }
}

export default Conversations
