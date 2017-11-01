import './Shop.scss'
import FeaturedProduct from './FeaturedProduct'
import Product from './Product'
import featuredProductImage1 from 'assets/shop/weight-loss-guide-free.png'
import featuredProductImage2 from 'assets/shop/product.png'
import featuredProductImage3 from 'assets/shop/recipe-cover-1.png'
import featuredProductImage4 from 'assets/shop/Blueprint-1.png'
import featuredProductImage5 from 'assets/shop/2Pack-1.png'
import featuredProductImage6 from 'assets/shop/90rev.png'
import freeBadge from 'assets/shop/free-badge.png'
class Shop extends React.Component {
  render () {
    return <section id='shop' >
      <div className='container-fluid'>
        <div className='row'>
          <div className='banner-wrap text-center'>
            <div className='banner-wrap-background' />
            <div className='container'>
              <div className='row'>
               
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 no-padding'>
            <ul className='product-layout'>
              <Product 
                featuredProductImage={featuredProductImage2}
                title="Ultimate IIFYM Guide"
                content="Whether you are a beginner or a personal trainer, our step-by-step guide will give you all the tools you need to master IIFYM."
                price="$17.00"
                href="https://collovamedia.samcart.com/products/ultimate-iifym-guide?_ga=2.23385274.103825144.1502209514-288014799.1500468427"/>
              <Product 
                featuredProductImage={featuredProductImage3}
                title="Macro Friendly Recipes"
                content="100 mouth watering, macro-friendly recipes with macros listed for every option. Breakfast, lunch, dinner, snacks & desserts!"
                price="$17.00"
                href="https://collovamedia.samcart.com/products/macro-friendly-recipes?_ga=2.23385274.103825144.1502209514-288014799.1500468427"/>
              <Product 
                featuredProductImage={featuredProductImage4}
                title="Custom Macro Blueprint"
                content="Have our IIFYM coaches create a fully customized macro program for you to reach your goals while eating food you love! GUARANTEED TO WORK!"
                price="$67.00"
                href="https://collovamedia.samcart.com/products/custom-macro-blueprint?_ga=2.118275593.103825144.1502209514-288014799.1500468427"/>
              <Product 
                featuredProductImage={featuredProductImage5}
                title="Custom Macro Meal Plan + Blueprint Bundle"
                content="A fully customized meal plan based on your specific macros with foods that you love + a Custom Macro Blueprint"
                price="$147"
                href="https://collovamedia.samcart.com/products/macro-meal-plan?_ga=2.190813355.103825144.1502209514-288014799.1500468427"/>
              <Product 
                featuredProductImage={featuredProductImage6}               
                title="12 Week Online Coaching"
                content="Work with your very own IIFYM Nutrition Coach for 12 weeks.Constant macro adjustments. EVERY QUESTION ANSWERED!"
                price="$197"
                href="https://collovamedia.samcart.com/products/12-weeks-1-on-1-online-coaching/?_ga=2.118275593.103825144.1502209514-288014799.1500468427"/>
                
            </ul>
          </div>
        </div>
      </div>
    </section>
  }
}

export default Shop
