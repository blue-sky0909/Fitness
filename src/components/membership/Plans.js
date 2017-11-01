import './Plans.scss'
import { Link } from 'react-router'
import { purchaseMealPlanUrl } from 'routes/urlGenerators'
import Button from 'components/controls/Button'
import LoadingIndicator from 'components/LoadingIndicator'
import ErrorAlert from 'components/ErrorAlert'
import { MdCheck, MdClose } from 'react-icons/lib/md'

class Plans extends React.Component {
  static propTypes = {
    userGet: PropTypes.object.isRequired,
    userGetRequest: PropTypes.func.isRequired,
    subscriptionStripeCancel: PropTypes.object.isRequired,
    subscriptionStripeCancelRequest: PropTypes.func.isRequired,
    subscriptionStripeUpdate: PropTypes.object.isRequired,
    subscriptionStripeUpdateRequest: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    downgradePlan: PropTypes.func.isRequired,
    upgradePlan: PropTypes.func.isRequired,
    userPatchRequest: PropTypes.func.isRequired
  }

  constructor ( props ) {
    super(props)

    this.state ={
      downgrade: false,
     // upgrade: false
    }

    this.downgradeToFree = this.downgradeToFree.bind(this)
    this.downgradeToBasic = this.downgradeToBasic.bind(this)
    this.upgradeToBasic = this.upgradeToBasic.bind(this)
    this.upgradeToPro = this.upgradeToPro.bind(this)
  }

  onSubscriptionCancel = () => {
    if ( window.confirm('Are you sure that you want to cancel your subscription?') ) {
      this.props.subscriptionStripeCancelRequest()
    }
  }

  onSubscriptionUpdate ( type ) {
    if ( window.confirm('Are you sure that you want to update your subscription?') ) {
      this.props.subscriptionStripeUpdateRequest(type)
    }
  }

  // upgradeToAdvanced = () => this.onSubscriptionUpdate('advanced')
  // downgradeToBasic = () => this.onSubscriptionUpdate('basic')

  componentDidUpdate ( prevProps ) {
    if ( prevProps.subscriptionStripeCancel.loading && this.props.subscriptionStripeCancel.loaded ) {
      this.props.showNotification({
        message: 'Your subscription has been canceled.',
        kind: 'success',
        dismissAfter: 5000
      })
      this.props.userGetRequest()
    }

    if ( prevProps.subscriptionStripeUpdate.loading && this.props.subscriptionStripeUpdate.loaded ) {
      let message = "Your account has been downgraded"
      if(this.state.downgrade){
        this.props.showNotification({
          message: message,
          kind: 'success',
          dismissAfter: 5000
        })
      }


      this.props.userGetRequest()
    }
  }

  getCurrentPlanName () {
    const { userGet } = this.props
    const membershipBasic = userGet.data.data.attributes[ 'has-iifym-basic' ]
    const membershipPro = userGet.data.data.attributes[ 'has-iifym-pro' ]
    if ( membershipBasic ) {
      return 'Basic'
    }
    if ( membershipPro ) {
      return 'Pro'
    }
    return 'Free'
  }

  /*
    New Code
   */
  downgradeToFree () {
    const { userGet } = this.props
    const customer = userGet.data.data.attributes[ 'first-name' ] + ' ' + userGet.data.data.attributes[ 'last-name' ]
    const title = 'Membership Change Request'
    const new_plan = 'Free'
    const current_plan = this.getCurrentPlanName()
    this.props.downgradePlan(title, customer, current_plan, new_plan, null)
    this.props.userPatchRequest(userGet.data.data.id, {
      has_iifym_basic: false,
      has_iifym_pro: false
    })
    this.setState({downgrade:true})

  }

  downgradeToBasic () {

    const { userGet } = this.props
    const customer = userGet.data.data.attributes[ 'first-name' ] + ' ' + userGet.data.data.attributes[ 'last-name' ]
    const title = 'Membership Change Request'
    const new_plan = 'Basic'
    const current_plan = this.getCurrentPlanName()

    this.props.downgradePlan(title, customer, current_plan, new_plan, null)

    this.props.userPatchRequest(userGet.data.data.id, {
      has_iifym_basic: true,
      has_iifym_pro: false
    })
    this.setState({downgrade:true})
  }

  upgradeToBasic () {

    window.location.href = 'https://collovamedia.samcart.com/products/iifym-basic/'
  }

  upgradeToPro () {
    const { userGet } = this.props
    const customer = userGet.data.data.attributes[ 'first-name' ] + ' ' + userGet.data.data.attributes[ 'last-name' ]
    const title = 'Membership Change Request'
    const new_plan = 'Pro'
    const current_plan = this.getCurrentPlanName()
    this.props.upgradePlan(title, customer, current_plan, new_plan, 'https://collovamedia.samcart.com/products/iifym-pro/')
    //this.setState('upgrade', true)
  }

  renderPlans () {
    const { userGet, subscriptionStripeCancel, subscriptionStripeUpdate } = this.props

    if ( !userGet.data ) return null

    // get user's membership
    const membershipBasic = userGet.data.data.attributes[ 'has-iifym-basic' ]
    const membershipPro = userGet.data.data.attributes[ 'has-iifym-pro' ]
    if ( subscriptionStripeCancel.loading || subscriptionStripeUpdate.loading ) {
      return <LoadingIndicator type='spinner'/>
    } else if ( subscriptionStripeCancel.error ) {
      return <ErrorAlert error={subscriptionStripeCancel.error}/>
    } else if ( subscriptionStripeUpdate.error ) {
      return <ErrorAlert error={subscriptionStripeUpdate.error}/>
    } else {
      return <div>
        <div className='row'>
          <div className='col-md-12 text-center'>
            <h1>Upgrade Your Plan</h1>
            <h3>Sorry, you need to upgrade your account to see this content</h3>
          </div>
        </div>
        <div className='row membership-lists'>
          <div className='col-md-4 tight-padding'>
            <div className='pricing-wrap free'>
              <div className='price-wrap'>
                <p>Free</p>
              </div>
              <div className='features-wrap'>
                <ul className='features-list'>
                  <li><span><MdCheck size={20} color='green'/></span><p>Advanced Calculator</p></li>
                  <li><span><MdCheck size={20} color='green'/></span><p> Premium Content</p></li>
                  <li><span><MdCheck size={20} color='green'/></span><p> Fitness App</p></li>
                  <li><span><MdClose size={20} color='red'/></span><p> Community Access</p></li>
                  <li><span><MdClose size={20} color='red'/></span><p> Unlimited Coaching +</p></li>
                  <li><span><MdClose size={20} color='red'/></span><p> Macro Adjustments</p></li>
                  <li><span><MdClose size={20} color='red'/></span><p> 1 New 7 Day Meal Plan per Month</p></li>
                  <li><span><MdClose size={20} color='red'/></span><p> Updated Workouts</p></li>
                  <li><span><MdClose size={20} color='red'/></span><p> Weekly Support Webinar</p></li>
                </ul>
              </div>
              {
                !membershipBasic && !membershipPro ? <div className='current-membership'>
                    <p>Your Current Plan</p>
                  </div>
                  : <span className='button-wrap'>
                    <div className='upgrade-button' onClick={this.downgradeToFree}>
                      <p>Downgrade</p>
                    </div>
                  </span>
              }
            </div>
          </div>
          <div className='col-md-4 tight-padding'>
            <div className='pricing-wrap basic'>
              <div className='price-wrap'>
                <p>$9.99 / month</p>
              </div>
              <div className="memebership-title basic">
                <p>Basic</p>
              </div>
              <div className='features-wrap'>
                <ul className='features-list'>
                  <li><span><MdCheck size={20} color='green'/></span><p>Advanced Calculator</p></li>
                  <li><span><MdCheck size={20} color='green'/></span><p> Premium Content</p></li>
                  <li><span><MdCheck size={20} color='green'/></span><p> Fitness App</p></li>
                  <li><span><MdClose size={20} color='red'/></span><p> Community Access</p></li>
                  <li><span><MdClose size={20} color='red'/></span><p> Unlimited Coaching +</p></li>
                  <li><span><MdClose size={20} color='red'/></span><p> Macro Adjustments</p></li>
                  <li><span><MdClose size={20} color='red'/></span><p> 1 New 7 Day Meal Plan per Month</p></li>
                  <li><span><MdClose size={20} color='red'/></span><p> Updated Workouts</p></li>
                  <li><span><MdClose size={20} color='red'/></span><p> Weekly Support Webinar</p></li>
                </ul>
              </div>
              {
                membershipBasic ? <div className='current-membership'>
                    <p>Your Current Plan</p>
                  </div>
                  : <span className='button-wrap' href="https://collovamedia.samcart.com/products/iifym-basic/">

                      {
                        membershipPro ? <div className='upgrade-button' onClick={this.downgradeToBasic}><p>Downgrade</p></div>
                          : <div className='upgrade-button' onClick={this.upgradeToBasic}><p>Upgrade</p></div>
                      }

                  </span>
              }

            </div>
          </div>
          <div className='col-md-4 tight-padding'>
            <div className='pricing-wrap pro'>
              <div className='price-wrap'>
                <p>$96.99 / month</p>
              </div>
              <div className="memebership-title pro">
                <p>Pro</p>
              </div>
              <div className='features-wrap'>
                <ul className='features-list'>
                  <li><span><MdCheck size={20} color='green'/></span><p>Advanced Calculator</p></li>
                  <li><span><MdCheck size={20} color='green'/></span><p> Premium Content</p></li>
                  <li><span><MdCheck size={20} color='green'/></span><p> Fitness App</p></li>
                  <li><span><MdClose size={20} color='red'/></span><p> Community Access</p></li>
                  <li><span><MdClose size={20} color='red'/></span><p> Unlimited Coaching +</p></li>
                  <li><span><MdClose size={20} color='red'/></span><p> Macro Adjustments</p></li>
                  <li><span><MdClose size={20} color='red'/></span><p> 1 New 7 Day Meal Plan per Month</p></li>
                  <li><span><MdClose size={20} color='red'/></span><p> Updated Workouts</p></li>
                  <li><span><MdClose size={20} color='red'/></span><p> Weekly Support Webinar</p></li>
                </ul>
              </div>
              {
                membershipPro ? <div className='current-membership'>
                    <p>Your Current Plan</p>
                  </div>
                  : <span className='button-wrap' href="https://collovamedia.samcart.com/products/iifym-pro/">
                    <div className='upgrade-button' onClick={this.upgradeToPro}>
                      <p>Upgrade</p>
                    </div>
                  </span>
              }
            </div>
          </div>
        </div>
      </div>
    }
  }

  render () {
    return <section id='mealPlans'>
      <div className='container'>
        {this.renderPlans()}
      </div>
    </section>
  }
}

export default Plans
