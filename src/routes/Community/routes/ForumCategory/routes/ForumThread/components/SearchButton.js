import './SearchButton.scss'
import Button from 'components/controls/Button'

class SearchButton extends React.Component {
  state = {
    expanded: false
  }

  expand = () => {
    this.setState({
      expanded: true
    })
  }

  collapse = () => {
    this.setState({
      expanded: false
    })
  }

  iconClick = () => {
    this.collapse()
  }

  render () {
    return <div className='forumThreadSearch hide'>
      {
        this.state.expanded
          ? <div className='input-container'>
            <input placeholder='Enter your search here...' type='text' />
            <i className='btb bt-search' aria-hidden='true' onClick={this.iconClick} />
          </div>
          : <Button className='search-button' onClick={this.expand} >
            <i className='btb bt-search' aria-hidden='true' />
          </Button>
      }

    </div>
  }
}

export default SearchButton
