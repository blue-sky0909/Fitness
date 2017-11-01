// import { injectReducer } from 'store/reducers'

export default (store) => ({
  path        : '/notifications',
  indexRoute  : indexRoute(store)
})

function indexRoute (store) {
  return {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const NotificationsContainer = require('./containers/NotificationsContainer').default
        cb(null, NotificationsContainer)
      }, 'notifications')
    }
  }
}
