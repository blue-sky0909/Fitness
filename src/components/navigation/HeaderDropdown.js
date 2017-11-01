import './HeaderDropdown.scss'
import { default as Dropdown, DropdownTrigger, DropdownContent } from 'react-simple-dropdown'
import { Link } from 'react-router'
import { loginUrl, profileEditUrl, contactMyCoachUrl } from 'routes/urlGenerators'
import user from 'auth/user'

class HeaderDropdown extends React.Component {
  static propTypes = {
    userGet: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      loaded: PropTypes.bool.isRequired,
      data: PropTypes.object.isRequired,
      error: PropTypes.any
    })
  }

  logout = () => {
    user.logout()
    this.dropdown.hide()
  }

  hideDropdown = () => {
    this.dropdown.hide()
  }

  dropdownRef = (el) => {
    this.dropdown = el
  }

  render () {
    const { userGet } = this.props

    if (!userGet.data) return null

    return <Dropdown ref={this.dropdownRef} className='header-dropdown'>
      <DropdownTrigger className='headerWelcome'>
        Welcome, {userGet.data.data.attributes['first-name']} {' '}
        <i className='btm bt-angle-down' aria-hidden='true' />
      </DropdownTrigger>
      <DropdownContent>
        <div className='arrow' />
        <Link onClick={this.hideDropdown} to={contactMyCoachUrl()}>Messages</Link>
        <Link onClick={this.hideDropdown} to={profileEditUrl()}>Settings</Link>
        <Link to={loginUrl()} onClick={this.logout}>Logout</Link>
      </DropdownContent>
    </Dropdown>
  }
}

export default HeaderDropdown
