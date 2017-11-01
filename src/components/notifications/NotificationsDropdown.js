import './NotificationsDropdown.scss'
import config from 'config'
import { default as Dropdown, DropdownTrigger, DropdownContent } from 'react-simple-dropdown'
import Button from 'components/controls/Button'
import LoadingIndicator from 'components/LoadingIndicator'
import ErrorAlert from 'components/ErrorAlert'
import { Link } from 'react-router'
import { notificationsUrl, contactMyCoachUrl } from 'routes/urlGenerators'

class NotificationsDropdown extends React.Component {
  static propTypes = {
    notificationsGet: PropTypes.object.isRequired,
    notificationsGetRequest: PropTypes.func.isRequired,
    notificationsReadPost: PropTypes.object.isRequired,
    notificationsReadPostRequest: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props) 

    this.state = {
      showAll: false
    }
  }

  timer = null
  componentWillMount () {
    this.props.notificationsGetRequest()
    this.timer = setInterval(() => {
      this.props.notificationsGetRequest()
    }, config.notificationsUpdateInterval)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  hideDropdown = () => {
    this.dropdown.hide()
  }

  dropdownRef = (el) => {
    this.dropdown = el
  }

  selectUnReadMessageId = (item) => {
    this.props.selectUnReadMessageIdRequest(item)
    this.hideDropdown()
  }

  renderNotification (item) {
    if (item['notification-type'] === 'message') {
      return <li key={item.id} className='notifications-list-item'>
        <Link to={contactMyCoachUrl()}>
          <img src={item.author.attributes.avatar} onClick={() =>this.selectUnReadMessageId(item)}/>
        </Link>
        <div>
          New message from 
          <Link to={contactMyCoachUrl()} className="un-read-message">
            <b onClick={() =>this.selectUnReadMessageId(item)}>{item.author.attributes['first-name']} {item.author.attributes['last-name']}</b>
          </Link>
        </div>
      </li>
    }
  }

  renderNotifications () {
    const { notificationsGet } = this.props
    const { showAll } = this.state
  //  console.log("notificationsGet===>", notificationsGet)

    if (notificationsGet.loading && !notificationsGet.data) {
      return <LoadingIndicator type='spinner' />
    } else if (notificationsGet.error) {
      return <ErrorAlert error={notificationsGet.error} />
    } else if (notificationsGet.data) {
      const unReadMessages = _.filter(notificationsGet.data.formattedData, x => x.read === false)
      if(showAll) {
        return <ul className='notifications-list'>
          {
            _.map(unReadMessages,
              (item) => this.renderNotification(item))
          }
        </ul>
      } else {
        return <ul className='notifications-list'>
          {
            _.map(
              _.take(unReadMessages, 3),
              (item) => this.renderNotification(item))
          }
        </ul>
      }

    }

    return null
  }

  showAllNotification () {
    this.setState({ showAll: true})
  }

  hideNotification () {
    this.setState({ showAll: false})
  }

  render () {
    const { notificationsGet } = this.props
    const { showAll } = this.state

    const unreadNotificationsCount = notificationsGet.data
      ? _.filter(notificationsGet.data.formattedData, x => x.read === false).length
      : 0
      
    return <Dropdown ref={this.dropdownRef} className='notifications-dropdown'>
      <DropdownTrigger className='headerWelcome'>
        <Button appearance='simple' className='notifications-button'>
          {
            unreadNotificationsCount > 0 &&
            <div className='notifications-unread-counter'>{unreadNotificationsCount}</div>
          }
          <i className='btm bt-envelope' aria-hidden='true' />
        </Button>
      </DropdownTrigger>
      <DropdownContent>
        <div className='arrow' />
        {this.renderNotifications()}
        {
          unreadNotificationsCount > 0 ?
            showAll ? <p className='notifications-link' onClick={() => this.hideNotification()}>Hide</p>
            : <p className='notifications-link' onClick={() => this.showAllNotification()}>View All</p>
          : <p className="notification">You don't have any new notifications.</p>
        }        
      </DropdownContent>
    </Dropdown>
  }
}

export default NotificationsDropdown
