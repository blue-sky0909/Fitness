import './OrdersGrid.scss'
import config from 'config'
import LoadingIndicator from 'components/LoadingIndicator'
import ErrorAlert from 'components/ErrorAlert'
import { Link } from 'react-router'
import { orderDetailsUrl } from 'routes/urlGenerators'
import { FaDownload, FaEye } from 'react-icons/lib/fa'
class OrdersGrid extends React.Component {
  static propTypes = {
    ordersGetRequest: PropTypes.func.isRequired,
    ordersGet: PropTypes.shape({
      loaded: PropTypes.bool,
      loading: PropTypes.bool,
      error: PropTypes.any,
      data: PropTypes.object
    })
  }

  componentWillMount () {
    this.props.ordersGetRequest()
  }

  componentWillReceiveProps (nextProps) {

  }

  render () {
    const { ordersGet } = this.props
    console.log("ordersGet===>", ordersGet)
    if (ordersGet.loading) {
      return <LoadingIndicator type='grid' />
    } else if (ordersGet.error) {
      return <ErrorAlert error={ordersGet.error} />
    } else if (ordersGet.loaded) {
      return <div id='ordersGrid' className='row'>
        <div className='table-responsive'>
          <table className='table white dd-shadow custom-style-orders-table'>
            <thead>
              <tr>
                <th>Order Date</th>
                <th>Product Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {
                _.map(ordersGet.data.formattedData, (item) => (
                  
                    item['product-type'] == 'iifym_pro' || item['product-type'] == 'iifym_basic' ? 
                      null
                    :                
                      <tr key={item.id} >
                        <td>{moment(item['created-at']).format(config.dateFormat)}</td>
                        <td> 
                          
                          {item.product}</td>
                        <td>
                          {
                            item['is-customer-complete-action'] ?
                              'Processing'
                            : item.status
                          }
                        </td>
                        <td><Link to={orderDetailsUrl(item.id)}>View order</Link></td>
                      </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    }

    return null
  }
}

export default OrdersGrid
