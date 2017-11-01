// import { injectReducer } from 'store/reducers'
import ProfileEdit from './routes/ProfileEdit'

export default (store) => ({
  path        : 'profile',
  indexRoute  : indexRoute(store),
  childRoutes: [
    ProfileEdit(store)
  ]
})

function indexRoute (store) {
  return {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const Profile = require('./components/Profile').default
        cb(null, Profile)
      }, 'profile')
    }
  }
}
