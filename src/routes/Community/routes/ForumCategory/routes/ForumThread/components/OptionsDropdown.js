import './OptionsDropdown.scss'
import { default as Dropdown, DropdownTrigger, DropdownContent } from 'react-simple-dropdown'

export default class OptionsDropdown extends React.Component {
  static propTypes = {
    optionsList: PropTypes.array.isRequired
  }

  hideDropdown = () => {
    this.dropdown.hide()
  }

  dropdownRef = (el) => {
    this.dropdown = el
  }

  renderOptionsList () {
    const { optionsList } = this.props

    const options = optionsList.map((item, i) => (
      <li key={i}>
        <a href='#' onClick={e => { e.preventDefault(); item.clickAction() }}>{item.label}</a>
      </li>
    ))

    return (
      <ul>
        { options }
      </ul>
    )
  }

  render () {
    return (
      <Dropdown ref={this.dropdownRef}>
        <DropdownTrigger className='options-dropdown-toggle'>
          <i className='bts bt-ellipsis-v' aria-hidden='true' />
        </DropdownTrigger>
        <DropdownContent>
          {
            this.renderOptionsList()
          }
        </DropdownContent>
      </Dropdown>
    )
  }
}
