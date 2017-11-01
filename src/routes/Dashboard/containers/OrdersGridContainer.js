import { connect } from 'react-redux'
import { ordersGetRequest } from '../reducers/ordersGet'
import OrdersGrid from '../components/OrdersGrid'

const mapDispatchToProps = (dispatch) => ({
  ordersGetRequest: () => dispatch(ordersGetRequest())
})

const mapStateToProps = (state) => ({
  ordersGet: state.ordersGet
})

export default connect(mapStateToProps, mapDispatchToProps)(OrdersGrid)
