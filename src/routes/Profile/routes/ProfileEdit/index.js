import { injectReducer } from 'store/reducers'

export default (store) => ({
  path        : 'edit',
  indexRoute  : indexRoute(store)
})

function indexRoute (store) {
  return {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const userPatch = require('./reducers/userPatch').default
        injectReducer(store, {
          key: 'userPatch',
          reducer: userPatch
        })

        const avatarPost = require('./reducers/avatarPost').default
        injectReducer(store, {
          key: 'avatarPost',
          reducer: avatarPost
        })

        const changePassword = require('./reducers/changePassword').default
        injectReducer(store, {
          key: 'changePassword',
          reducer: changePassword
        })

        const ProfileEditContainer = require('./containers/ProfileEditContainer').default
        cb(null, ProfileEditContainer)
      }, 'profile-edit')
    }
  }
}
