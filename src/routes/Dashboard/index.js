import { injectReducer } from 'store/reducers'

export default function (store) {
  return {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const Dashboard = require('./components/Dashboard').default
        const reducer = require('./reducers/ordersGet').default
        injectReducer(store, { key: 'ordersGet', reducer })
        cb(null, Dashboard)
      }, 'dashboard')
    }
  }
}
