import './OrderDetails.scss'
import LoadingIndicator from 'components/LoadingIndicator'
import ErrorAlert from 'components/ErrorAlert'
import Button from 'components/controls/Button'
import { Link } from 'react-router'
import { dashboardUrl } from 'routes/urlGenerators'
import config from 'config'

class OrderDetails extends React.Component {
  static propTypes = {
    orderGet: PropTypes.object.isRequired,
    orderGetRequest: PropTypes.func.isRequired,
    params: PropTypes.shape({
      orderId: PropTypes.string.isRequired
    })
  }

  componentWillMount () {
    const { params: { orderId }, orderGetRequest } = this.props
    orderGetRequest(orderId)
  }

  renderOrder () {
    const { params: { orderId }, orderGet } = this.props

    if ( orderGet[ orderId ] && orderGet[ orderId ].loading && !orderGet[ orderId ].data ) {
      return <LoadingIndicator type='spinner'/>
    } else if ( orderGet[ orderId ] && orderGet[ orderId ].error ) {
      return <ErrorAlert error={orderGet.error}/>
    } else if ( orderGet[ orderId ] &&
      (orderGet[ orderId ].loaded || orderGet[ orderId ].data) ) {
      const data = orderGet[ orderId ].data

      return <div className='container'>
        <Link className='orderDetails_back-button' to={dashboardUrl()}>
          <Button appearance='bordered' color='grey'>
            <i className='btm bt-angle-left' aria-hidden='true'/> Back to dashboard
          </Button>
        </Link>

        <h1 className='orderDetails_title'>Order summary</h1>

        <ul className='orderDetails_attributes'>
          <li><b>Product Name:</b> {data.data.attributes.product}</li>
          <li><b>Status:</b> {data.data.attributes.status}</li>
          <li><b>Order created at: </b> {moment(data.data.attributes[ 'created-at' ]).format('l')}</li>
        </ul>

        {this.renderOrederActions()}
      </div>
    }

    return null
  }

  renderOrederActions () {
    const { params: { orderId }, orderGet } = this.props
    const data = orderGet[ orderId ].data
    localStorage.setItem('orderId', orderId)

    if ( data.data.attributes.status === 'Received' && data.data.attributes[ 'is-customer-complete-action' ] === false ) {
      if ( data.data.attributes[ 'product-type' ] === 'blueprint' ) {
        return <Link className='orderDetails_action-button' to='/blueprint/page-one'>
          <Button appearance='bordered' color='grey'>
            COMPLETE QUETIONNAIRE
          </Button>
        </Link>
      } else if ( data.data.attributes[ 'product-type' ] === 'custom_meal_plan' && data.data.attributes[ 'is-customer-complete-action' ] === false ) {
        return <Link className='orderDetails_action-button' to='/custom-meal-plan/meal-plan-form'>
          <Button appearance='bordered' color='grey'>
            COMPLETE QUETIONNAIRE
          </Button>
        </Link>
      }

    } else if ( data.data.attributes[ 'is-customer-complete-action' ] === true ) {
      if ( data.data.attributes[ 'product-type' ] === 'blueprint' ) {
        return <Link className='orderDetails_action-button' to='/blueprint/page-one'>
          <Button appearance='bordered' color='grey'>
            VIEW QUESTIONNAIRE ANSWERS
          </Button>
        </Link>
      } else {
        return <Link className='orderDetails_action-button' to='/custom-meal-plan/meal-plan-form'>
          <Button appearance='bordered' color='grey'>
            VIEW QUESTIONNAIRE ANSWERS
          </Button>
        </Link>
      }

    }

    const uploads = _.filter(data.included, x => x.type === 'uploads')   
    const fileName = uploads[0].attributes.url.substring(uploads[0].attributes.url.lastIndexOf('/') + 1, uploads[0].attributes.url.length - 4)
    console.log(uploads)
  //  const url = config.apiHost/downloads/id-filename
    if ( data.data.attributes.status === 'Completed' && uploads.length ) {

      return _.map(uploads,
        x => <a className='orderDetails_action-button' href={`${config.apiHost}/downloads/${x.id}-${fileName}`} key={x.id} target='_blank'>
          <Button appearance='bordered' color='grey'>
          <i className='btm bt-download' aria-hidden='true'/> Download {x.attributes.name}
          </Button>
        </a>)
    }

    return null
  }

  render () {
    return <section id='orderDetails'>
      {this.renderOrder()}
    </section>
  }
}

export default OrderDetails
