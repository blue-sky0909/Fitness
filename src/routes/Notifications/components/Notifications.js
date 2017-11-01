import './Notifications.scss'
import LoadingIndicator from 'components/LoadingIndicator'
import ErrorAlert from 'components/ErrorAlert'

class Notifications extends React.Component {
  static propTypes = {
    notificationsGet: PropTypes.object.isRequired,
    notificationsReadPost: PropTypes.object.isRequired,
    notificationsReadPostRequest: PropTypes.func.isRequired
  }

  markAllAsRead () {
    _.each(this.props.notificationsGet.data.formattedData, (item) => {
      if (!item.read && !this.props.notificationsReadPost[item.id]) {
        this.props.notificationsReadPostRequest(item.id)
      }
    })
  }

  componentWillMount () {
    if (this.props.notificationsGet.data) {
      this.markAllAsRead()
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.notificationsGet.loaded && prevProps.notificationsGet.loading) {
      this.markAllAsRead()
    }
  }

  renderNotification (item) {
    if (item['notification-type'] === 'message') {
      return <li key={item.id} className='notifications-list-item'>
        <img src={item.author.attributes.avatar} />
        <div className='notification-text'>
          New message from <b>{item.author.attributes['first-name']} {item.author.attributes['last-name']}</b>
        </div>
        <div className='notification-time'>
          Jun 21, 2017 2:15 PM
        </div>
      </li>
    }
  }

  renderNotifications () {
    const { notificationsGet } = this.props

    if (notificationsGet.loading && !notificationsGet.data) {
      return <LoadingIndicator type='spinner' />
    } else if (notificationsGet.error) {
      return <ErrorAlert error={notificationsGet.error} />
    } else if (notificationsGet.data) {
      return <div>
        <h1>Notifications</h1>
        <ul className='notifications-list'>
          {
            _.map(
              notificationsGet.data.formattedData,
              (item) => this.renderNotification(item))
          }
        </ul>
      </div>
    }

    return null
  }

  render () {
    return <section id='notifications'>
      <div className='container'>
        {this.renderNotifications()}
      </div>
    </section>
  }
}

export default Notifications
