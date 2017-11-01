import './FeaturedProduct.scss'
import Button from 'components/controls/Button'
import featuredProductImage from 'assets/shop/featured-product.png'

class FeaturedProduct extends React.Component {
  render () {
    return <div className='featured-product'>
      <img src={featuredProductImage} className='featured-product-image' />
      <h1 className='featured-product-title'>THE IIFYM 90 DAY CHALLANGE</h1>
      <div className='featured-product-white-block'>
        <div className='featured-product-content'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
        <div className='featured-product-controls'>
          <div className='featured-product-price'>
            <div className='featured-product-old-price'>$79.99 USD</div>
            <div className='featured-product-new-price'>
              <span className='featured-product-new-price-numbers'>$59.99</span> USD
            </div>
          </div>

          <Button className='featured-product-button' appearance='with-background' color='red'>
            <i className='btm bt-shopping-cart' aria-hidden='true' /> Add to cart
          </Button>
          <Button className='featured-product-button' appearance='bordered' color='light-grey'>Learn More</Button>
        </div>
      </div>
    </div>
  }
}

export default FeaturedProduct
