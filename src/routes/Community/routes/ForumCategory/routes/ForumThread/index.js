import { injectReducer } from 'store/reducers'

export default (store) => ({
  path        : ':threadId/page/:page',
  indexRoute  : indexRoute(store)
})

function indexRoute (store) {
  return {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const forumRepliesGet = require('./reducers/forumRepliesGet').default
        injectReducer(store, {
          key: 'forumRepliesGet',
          reducer: forumRepliesGet
        })

        const forumReplyLike = require('./reducers/forumReplyLike').default
        injectReducer(store, {
          key: 'forumReplyLike',
          reducer: forumReplyLike
        })

        const forumReplyDislike = require('./reducers/forumReplyDislike').default
        injectReducer(store, {
          key: 'forumReplyDislike',
          reducer: forumReplyDislike
        })

        const forumReplyPost = require('./reducers/forumReplyPost').default
        injectReducer(store, {
          key: 'forumReplyPost',
          reducer: forumReplyPost
        })

        const forumReplyPatch = require('./reducers/forumReplyPatch').default
        injectReducer(store, {
          key: 'forumReplyPatch',
          reducer: forumReplyPatch
        })

        const forumReplyDelete = require('./reducers/forumReplyDelete').default
        injectReducer(store, {
          key: 'forumReplyDelete',
          reducer: forumReplyDelete
        })

        const forumThreadGet = require('./reducers/forumThreadGet').default
        injectReducer(store, {
          key: 'forumThreadGet',
          reducer: forumThreadGet
        })

        const ForumThreadContainer = require('./containers/ForumThreadContainer').default
        cb(null, ForumThreadContainer)
      }, 'forum-thread')
    }
  }
}
