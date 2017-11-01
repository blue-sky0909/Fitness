import { injectReducer } from 'store/reducers'

export default (store) => ({
  path        : '/login',
  indexRoute  : indexRoute(store)
})

function indexRoute (store) {
  return {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const Login = require('./containers/LoginContainer').default
        const reducer = require('./reducers/login').default
        injectReducer(store, { key: 'login', reducer })
        cb(null, Login)
      }, 'login')
    }
  }
}
