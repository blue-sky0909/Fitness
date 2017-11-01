import './Product.scss'

import Button from 'components/controls/Button'
import {productBuyRequest} from '../actions/productBuy'
class Product extends React.Component {

  constructor(props) {
    super(props)

    this.itemBuy = this.itemBuy.bind(this)
  }

  itemBuy(dispatch) {
    this.props.dispatch(productBuyRequest())
  }
  render () {
    return <li className='product'>
      {
        this.props.freeBadge ?
          <img className='free-image' src={this.props.freeBadge} />
        : null
      }
      <img className='product-image' src={this.props.featuredProductImage} />
      <div className='product-white-block'>
        <div className='product-title'>{this.props.title}</div>
        <div className='product-content'>{this.props.content}</div>
        <div className='product-line'/>
        <div className='product-price'>
          <div className='product-old-price'>$99.99</div>
          <div className='new-price'>{this.props.price}</div>
        </div>
        <div className='product-controls'>
          <Button appearance='bordered' color='light-grey'>
            Learn More
          </Button>
          <Button appearance='with-background' color='red'>
            <a style={aStyle} href={this.props.href}>
              <i className='btm bt-shopping-cart' aria-hidden='true' /> Buy Now
            </a>
          </Button>
          
        </div>
      </div>
    </li>
  }
}

const aStyle= {
  color: 'white',
  textDecoration: 'none'
}
function mapDispatchToProps(dispatch) {
  return dispatch
}
export default ReactRedux.connect(mapDispatchToProps)(Product)
