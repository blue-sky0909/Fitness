import { injectReducer } from 'store/reducers'
import ForumThread from './routes/ForumThread'
import ForumThreadForm from './routes/ForumThreadForm'

export default (store) => ({
  path        : ':categoryId/threads',
  indexRoute  : indexRoute(store),
  childRoutes: [
    ForumThreadForm(store),
    ForumThread(store)
  ]
})

function indexRoute (store) {
  return {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const forumThreadsGet = require('./reducers/forumThreadsGet').default
        injectReducer(store, {
          key: 'forumThreadsGet',
          reducer: forumThreadsGet
        })

        const forumCategoryGet = require('./reducers/forumCategoryGet').default
        injectReducer(store, {
          key: 'forumCategoryGet',
          reducer: forumCategoryGet
        })

        const ForumCategoryContainer = require('./containers/ForumCategoryContainer').default
        cb(null, ForumCategoryContainer)
      }, 'forum-category')
    }
  }
}
