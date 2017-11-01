import './ShareButton.scss'
import { default as Dropdown, DropdownTrigger, DropdownContent } from 'react-simple-dropdown'
import Button from 'components/controls/Button'
import mailIcon from 'assets/mail-icon.png'
import {
  ShareButtons,
  generateShareIcon
} from 'react-share'

const { FacebookShareButton, TwitterShareButton } = ShareButtons
const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')

class ShareButton extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
  }

  hideDropdown = () => {
    this.dropdown.hide()
  }

  dropdownRef = (el) => {
    this.dropdown = el
  }

  render () {
    const { title, description } = this.props

    return <Dropdown ref={(dropdown) => { this.dropdown = dropdown }} className='share-dropdown' >
      <DropdownTrigger className='headerWelcome'>
        <div className='share-button'>
          <Button className='share'>
            <p><i className='btm bt-share' />Share</p>
          </Button>
        </div>
      </DropdownTrigger>
      <DropdownContent>
        <div className='arrow' />
        <FacebookShareButton
          beforeOnClick={this.hideDropdown}
          title={title}
          description={description}
          url={window.location.href} >
          <div className='share-dropdown-icon'>
            <FacebookIcon size={32} round />
          </div>
          <div className='share-dropdown-link-text'>
            Facebook
          </div>
        </FacebookShareButton>

        <TwitterShareButton beforeOnClick={this.hideDropdown} title={title} url={window.location.href}>
          <div className='share-dropdown-icon'>
            <TwitterIcon size={32} round />
          </div>
          <div className='share-dropdown-link-text'>
            Twitter
          </div>
        </TwitterShareButton>

        <a
          onClick={this.hideDropdown}
          className='share-mail-link'
          href={`mailto:?subject=I wanted you to see this site&body=Check out this site ${window.location.href}`}
          >
          <img src={mailIcon} alt='Email' />
          Email
        </a>
      </DropdownContent>
    </Dropdown>
  }
}

export default ShareButton
