import user from 'auth/user'
import LoadingIndicator from 'components/LoadingIndicator'

class Authorized extends React.Component {
  static propTypes = {
    userGetRequest: PropTypes.func,
    userGet: PropTypes.shape({
      loaded: PropTypes.bool,
      loading: PropTypes.bool,
      error: PropTypes.any,
      data: PropTypes.object
    }),
    children: PropTypes.any,
    goToLoginPage: PropTypes.func
  }

  componentWillMount () {
    if (!user.authorized) {
      this.props.goToLoginPage()
      return
    }

    this.props.userGetRequest()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.userGet.error && nextProps.userGet.error.message === 'Unauthorized') {
      this.props.goToLoginPage()
    }
  }

  render () {
    const { children, userGet } = this.props

    if (userGet.loading && !userGet.data) {
      return <LoadingIndicator type='spinner' />
    } else if (userGet.error) {
      return <div>{userGet.error.message}</div>
    } else if (userGet.loaded || userGet.data) {
      return children
    }

    return null
  }
}

export default Authorized
