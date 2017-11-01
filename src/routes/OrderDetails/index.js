import { injectReducer } from 'store/reducers'

export default (store) => ({
  path        : 'order/:orderId',
  indexRoute  : indexRoute(store)
})

function indexRoute (store) {
  return {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const orderGet = require('./reducers/orderGet').default
        injectReducer(store, {
          key: 'orderGet',
          reducer: orderGet
        })

        const OrderDetailsContainer = require('./containers/OrderDetailsContainer').default
        cb(null, OrderDetailsContainer)
      }, 'order-details')
    }
  }
}
