import './Header.scss'
import { Link } from 'react-router'
import { dashboardUrl } from 'routes/urlGenerators'
import Avatar from 'components/Avatar'
import HeaderDropdown from 'components/navigation/HeaderDropdown'
import NotificationsDropdownContainer from 'containers/NotificationsDropdownContainer'

class Header extends React.Component {
  static propTypes = {
    userGet: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      loaded: PropTypes.bool.isRequired,
      data: PropTypes.object.isRequired,
      error: PropTypes.any
    })
  }

  render () {
    const { userGet } = this.props
    const basicMebership = userGet.data.data.attributes['has-iifym-basic']
    const proMebership = userGet.data.data.attributes['has-iifym-pro']
    const hasCoach = userGet.data.data.attributes['has-fitness-coaching']

    if (!userGet.data) return null

    return <section id='header'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3 col-sm-6'>
            <Link to={dashboardUrl()}>
              <img
                src='https://d3gmma0qx5nscy.cloudfront.net/wp-content/themes/iifym-theme/images/comp/logo.jpg' />
            </Link>
          </div>

          <div className='col-md-7 offset-md-2 col-sm-6'>
            <div className='row right-row'>
              <HeaderDropdown userGet={userGet} />

              <div className='headerProfileImage'>
                <Avatar image={userGet.data.data.attributes.avatar} size='small' />
              </div>
              
              {
                basicMebership || proMebership || hasCoach ?
                  <NotificationsDropdownContainer />
                : null
              }
                            
            </div>
          </div>
        </div>
      </div>
    </section>
  }
}

export default Header
