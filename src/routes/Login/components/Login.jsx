import './Login.scss'
import LoginForm from './LoginForm.jsx'

class Login extends React.Component {
  static propTypes = {
    loginRequest: PropTypes.func.isRequired,
    goToDashboard: PropTypes.func
  }

  submit = data => {
    return this.props.loginRequest(data)
  }

  onSubmitSuccess = data => {
    this.props.goToDashboard()
  }

  render () {
    return <div className='loginWrap'>
      <div id='main-nav-header'>
        <div className='container'>
          <div className='logo'>
            <a href='https://www.iifym.com'>
              <h1>
                <img src='https://www.iifym.com/wp-content/themes/iifym-theme/images/comp/logo.jpg' alt='if it fits your macros' data-rjs='2' />
              </h1>
            </a>
          </div>
          <button className='hamburger hamburger--spin' type='button'>
            <span className='hamburger-box'>
              <span className='hamburger-inner' />
            </span>
          </button>
          <div id='main-nav'>
            <ul>
              <li id='menu-item-2945' className='start-here menu-item menu-item-type-custom menu-item-object-custom menu-item-2945'><a href='http://www.clkmg.com/iifym/start-here'><i className='btm bt-play'></i>Start Here</a></li>
              <li id='menu-item-5467' className='calculators menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-5467'><a href='https://www.iifym.com/diet-exercise-calculators/'><i className='btm bt-bar-chart'></i>Calculators</a>
                <ul className='sub-menu'>
                  <li id='menu-item-2717' className='iifym-calc menu-item menu-item-type-post_type menu-item-object-page menu-item-2717'><a href='https://www.iifym.com/iifym-calculator/'><i className='icon-fitness-nutrition'></i>IIFYM Calculator</a></li>
                  <li id='menu-item-2839' className='tdee menu-item menu-item-type-post_type menu-item-object-page menu-item-2839'><a title='TDEE Calculator' href='https://www.iifym.com/tdee-calculator/'><i className='icon-fitness-shoes'></i>IIFYM TDEE Calculator</a></li>
                  <li id='menu-item-233' className='bmr menu-item menu-item-type-post_type menu-item-object-page menu-item-233'><a href='https://www.iifym.com/bmr-calculator/'><i className='icon-training-mat'></i>BMR Calculator</a></li>
                  <li id='menu-item-231' className='bmi menu-item menu-item-type-post_type menu-item-object-page menu-item-231'><a href='https://www.iifym.com/bmi-calculator/'><i className='icon-fitness-app'></i>BMI Calculator</a></li>
                  <li id='menu-item-229' className='rmr menu-item menu-item-type-post_type menu-item-object-page menu-item-229'><a href='https://www.iifym.com/rmr-calculator/'><i className='icon-fitness-tracker'></i>RMR Calculator</a></li>
                </ul>
              </li>
              <li id='menu-item-4390' className='products menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-4390'><a href='https://www.iifym.com/our-programs/'><i className='btm bt-shopping-cart'></i>Our Programs</a>
                <ul className='sub-menu'>
                <li id='menu-item-4217' className='starter-guide menu-item menu-item-type-custom menu-item-object-custom menu-item-4217'><a href='http://www.iifym.com/products/ultimate-guide'><span><img src='https://s3-us-west-2.amazonaws.com/iifymweb/wp-content/themes/iifym/images/comp/smart-guide-cover.png'></img></span>Ultimate IIFYM Starter Guide</a></li>
                  <li id='menu-item-4216' className='mealplan menu-item menu-item-type-custom menu-item-object-custom menu-item-4216'><a href='http://www.iifym.com/products/iifym-bundle'><span><img src='https://s3-us-west-2.amazonaws.com/iifymweb/wp-content/uploads/2016/08/2Pack-1.png'></img></span>Custom Macro Mealplan</a></li>
                  <li id='menu-item-4215' className='blueprint menu-item menu-item-type-custom menu-item-object-custom menu-item-4215'><a href='http://iifym.com/go/blueprintnav'><span><img src='https://s3-us-west-2.amazonaws.com/iifymweb/wp-content/uploads/2016/08/Blueprint-1.png'></img></span>Custom Macro Blueprint</a></li>
                  <li id='menu-item-4219' className='challenge menu-item menu-item-type-custom menu-item-object-custom menu-item-4219'><a href='https://collovamedia.samcart.com/products/iifym-90-day-weight-loss-challenge/'><span><img src='https://s3-us-west-2.amazonaws.com/iifymweb/wp-content/themes/iifym/images/comp/package-prod.png'></img></span>90 Day IIFYM Challenge</a></li>
                  <li id='menu-item-18113' className='recipes menu-item menu-item-type-custom menu-item-object-custom menu-item-18113'><a href='https://www.iifym.com/products/macro-recipes/'><span><img src='https://s3-us-west-2.amazonaws.com/iifymweb/wp-content/themes/iifym/images/comp/recipe-cover.png'></img></span>Macro Friendly Recipes</a></li>
                </ul>
              </li>
              <li id='menu-item-4391' className='success menu-item menu-item-type-post_type menu-item-object-page menu-item-4391'><a href='https://www.iifym.com/success-stories/'><i className='btm bt-user'></i>Before &amp; After</a></li>
              <li id='menu-item-25631' className='recipes-link menu-item menu-item-type-post_type menu-item-object-page menu-item-25631'><a href='https://www.iifym.com/macro-friendly-recipes/'><i className='btm bt-book-open'></i>Recipes</a></li>
              <li id='menu-item-4220' className='articles menu-item menu-item-type-post_type menu-item-object-page menu-item-4220'><a href='https://www.iifym.com/articles-interviews/'><i className='btm bt-notebook'></i>Articles</a></li>
              <li id='menu-item-4208' className='faq menu-item menu-item-type-taxonomy menu-item-object-category menu-item-4208'><a href='https://www.iifym.com/category/faq/'><i className='btm bt-question-circle'></i>IIFYM FAQ</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className='clear' />
      <div className='login_form-container'>
        <h1>You have to be logged in to access this page</h1>
        <LoginForm onSubmit={this.submit} onSubmitSuccess={this.onSubmitSuccess} />
        <a
          id='pop_forgot'
          className='text-link forgot-password-link'
          href='https://www.iifym.com/customer-reset-password/'>
          Lost password?
        </a>
      </div>
      <section id='footer'>
        <div className='top'>
          <div className='container'>
            <div id='footer-logo'>
              <a href='https://www.iifym.com'>
                <h1>
                  <img src='https://www.iifym.com/wp-content/themes/iifym-theme/images/comp/logo.jpg' alt='if it fits your macros' data-rjs='2' />
                </h1>
              </a>
            </div>
            <div id='footer-nav'>
              <ul>
                <li id='menu-item-5466' className='start-here menu-item menu-item-type-custom menu-item-object-custom menu-item-5466'><a href='http://www.clkmg.com/iifym/start-here'><i className='btm bt-play'></i>Start Here</a></li>
                <li id='menu-item-5468' className='calculators menu-item menu-item-type-post_type menu-item-object-page menu-item-5468'><a href='https://www.iifym.com/diet-exercise-calculators/'><i className='btm bt-bar-chart'></i>Calculators</a></li>
                <li id='menu-item-5469' className='products menu-item menu-item-type-post_type menu-item-object-page menu-item-5469'><a href='https://www.iifym.com/our-programs/'><i className='btm bt-shopping-cart'></i>Our Programs</a></li>
                <li id='menu-item-5470' className='success menu-item menu-item-type-post_type menu-item-object-page menu-item-5470'><a href='https://www.iifym.com/success-stories/'><i className='btm bt-user'></i>Testimonials</a></li>
                <li id='menu-item-25632' className='recipes-link menu-item menu-item-type-post_type menu-item-object-page menu-item-25632'><a href='https://www.iifym.com/macro-friendly-recipes/'><i className='btm bt-book-open'></i>Recipes</a></li>
                <li id='menu-item-5471' className='articles menu-item menu-item-type-post_type menu-item-object-page current_page_parent menu-item-5471'><a href='https://www.iifym.com/articles-interviews/'><i className='btm bt-notebook'></i>Articles</a></li>
                <li id='menu-item-5472' className='faq menu-item menu-item-type-taxonomy menu-item-object-category menu-item-5472'><a href='https://www.iifym.com/category/faq/'><i className='btm bt-question-circle'></i>IIFYM FAQ</a></li>
                <li id='menu-item-5473' className='contact menu-item menu-item-type-custom menu-item-object-custom menu-item-5473'><a href='https://www.iifym.com/contact-us'><i className='btm bt-envelope'></i>Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className='bottom'>
          <div className='container'>
            <div id='footer-social'>
              <ul>
                <li className='facebook'><a href='https://www.facebook.com/groups/iifym/' target='_blank'><i className='fab fab-facebook-alt'></i></a></li>
                <li className='twitter'><a href='https://twitter.com/iifym'><i className='fab fab-twitter'></i></a></li>
                <li className='instagram'><a href='https://www.instagram.com/iifym/'><i className='fab fab-instagram'></i></a></li>
              </ul>
            </div>
            <div id='footer-copy'>
              <p>Copyright © 2017. All rights reserved. | Powered By: <a href='http://pixel8.io'>Pixel8</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  }
}
export default Login
