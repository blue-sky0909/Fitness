import { injectReducer } from 'store/reducers'

export default (store) => ({
  childRoutes: [
    {
      path: 'contact-my-coach',
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          const conversationsGet = require('./reducers/conversationsGet').default
          injectReducer(store, {
            key: 'conversationsGet',
            reducer: conversationsGet
          })

          const messagesGet = require('./reducers/messagesGet').default
          injectReducer(store, {
            key: 'messagesGet',
            reducer: messagesGet
          })

          const messagePost = require('./reducers/messagePost').default
          injectReducer(store, {
            key: 'messagePost',
            reducer: messagePost
          })

          const conversationPost = require('./reducers/conversationPost').default
          injectReducer(store, {
            key: 'conversationPost',
            reducer: conversationPost
          })

          const ContactMyCoach = require('./components/ContactMyCoach').default
          cb(null, ContactMyCoach)
        }, 'contactmycoach')
      },
      childRoutes: [{
        path: 'new-conversation',
        getComponent (nextState, cb) {
          require.ensure([], (require) => {
            const NewConversationPopupContainer = require('./containers/NewConversationPopupContainer').default
            cb(null, NewConversationPopupContainer)
          }, 'contactmycoach')
        }
      }]
    }
  ]
})
