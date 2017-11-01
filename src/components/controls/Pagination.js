import './Pagination.scss'
import { Link } from 'react-router'

class Pagination extends React.Component {
  static propTypes = {
    pagesCount: PropTypes.number.isRequired,
    urlGenerator: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    maxButtonsCount: PropTypes.number.isRequired
  }

  static defaultProps = {
    maxButtonsCount: 11
  }

  renderButton = (i) => {
    const { urlGenerator } = this.props

    return <li key={i} className='pagination_list-item'>
      <Link activeClassName='active' to={urlGenerator(i)}>{i}</Link>
    </li>
  }

  renderPrevButton = () => {
    const { urlGenerator, currentPage } = this.props

    return <li className='pagination_list-item pagination_list-item-arrow'>
      <Link activeClassName='active' to={urlGenerator(Math.max(currentPage - 1, 1))}>
        <i className='btm bt-angle-left' aria-hidden='true' />
      </Link>
    </li>
  }

  renderNextButton = () => {
    const { urlGenerator, currentPage, pagesCount } = this.props

    return <li className='pagination_list-item pagination_list-item-arrow'>
      <Link activeClassName='active' to={urlGenerator(Math.min(currentPage + 1, pagesCount))}>
        <i className='btm bt-angle-right' aria-hidden='true' />
      </Link>
    </li>
  }

  render () {
    const { pagesCount, maxButtonsCount, currentPage } = this.props

    if (pagesCount <= 1) return null
    else if (pagesCount <= maxButtonsCount) {
      return <ul className='pagination_list'>
        {this.renderPrevButton()}
        {_.times(pagesCount, i => this.renderButton(i + 1))}
        {this.renderNextButton()}
      </ul>
    } else if (pagesCount > maxButtonsCount && currentPage <= (maxButtonsCount / 2 + 1)) {
      return <ul className='pagination_list'>
        {this.renderPrevButton()}
        {_.times(maxButtonsCount - 1, i => this.renderButton(i + 1))}
        <li className='pagination_list-brake'>...</li>
        {this.renderButton(pagesCount)}
        {this.renderNextButton()}
      </ul>
    } else if (pagesCount > maxButtonsCount && (pagesCount - currentPage) <= maxButtonsCount / 2) {
      return <ul className='pagination_list'>
        {this.renderPrevButton()}
        {this.renderButton(1)}
        <li className='pagination_list-brake'>...</li>
        {_.times(maxButtonsCount - 1, i => this.renderButton(pagesCount - maxButtonsCount + 2 + i))}
        {this.renderNextButton()}
      </ul>
    } else {
      return <ul className='pagination_list'>
        {this.renderPrevButton()}
        {this.renderButton(1)}
        <li className='pagination_list-brake'>...</li>
        {
          _.times(
            maxButtonsCount - 2,
            i => this.renderButton(currentPage - Math.ceil((maxButtonsCount - 2) / 2) + 1 + i))
        }
        <li className='pagination_list-brake'>...</li>
        {this.renderButton(pagesCount)}
        {this.renderNextButton()}
      </ul>
    }
  }
}

export default Pagination
