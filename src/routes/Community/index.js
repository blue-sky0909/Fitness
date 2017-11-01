import { injectReducer } from 'store/reducers'
import ForumCategory from './routes/ForumCategory'

export default (store) => ({
  path        : 'community',
  indexRoute  : indexRoute(store),
  childRoutes: [
    ForumCategory(store)
  ]
})

function indexRoute (store) {
  return {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const forumCategoriesGet = require('./reducers/forumCategoriesGet').default
        injectReducer(store, {
          key: 'forumCategoriesGet',
          reducer: forumCategoriesGet
        })

        const Community = require('./components/Community').default
        cb(null, Community)
      }, 'community')
    }
  }
}
