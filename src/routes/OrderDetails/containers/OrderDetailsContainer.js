import { connect } from 'react-redux'
import { orderGetRequest } from '../reducers/orderGet'
import OrderDetails from '../components/OrderDetails'

const mapDispatchToProps = (dispatch) => ({
  orderGetRequest: (orderId) => dispatch(orderGetRequest(orderId))
})

const mapStateToProps = (state) => ({
  orderGet: state.orderGet,
  flag: state.pageFourReducer.success
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails)
