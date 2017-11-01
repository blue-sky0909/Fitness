import { injectReducer } from 'store/reducers'

export default (store) => ({
  childRoutes: [
    newThreadRoute(store),
    editThreadRoute(store)
  ]
})

function newThreadRoute (store) {
  return {
    path: 'new',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        reducers(store)

        const ForumNewThreadContainer = require('./containers/ForumNewThreadContainer').default
        cb(null, ForumNewThreadContainer)
      }, 'forum-thread-form')
    }
  }
}

function editThreadRoute (store) {
  return {
    path: ':threadId/edit',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        reducers(store)

        const ForumEditThreadContainer = require('./containers/ForumEditThreadContainer').default
        cb(null, ForumEditThreadContainer)
      }, 'forum-thread-form')
    }
  }
}

function reducers (store) {
  const forumThreadPost = require('./reducers/forumThreadPost').default
  injectReducer(store, {
    key: 'forumThreadPost',
    reducer: forumThreadPost
  })

  const forumThreadGet = require('../ForumThread/reducers/forumThreadGet').default
  injectReducer(store, {
    key: 'forumThreadGet',
    reducer: forumThreadGet
  })

  const forumThreadPatch = require('./reducers/forumThreadPatch').default
  injectReducer(store, {
    key: 'forumThreadPatch',
    reducer: forumThreadPatch
  })
}
