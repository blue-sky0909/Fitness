import { connect } from 'react-redux'
import { messagesGetRequest } from '../reducers/messagesGet'
import { messagePostRequest } from '../reducers/messagePost'
import { notificationsGetRequest } from 'store/notificationsGet'
import { notificationsReadPostRequest } from 'store/notificationsReadPost'
import { removedselectUnReadMessageIdRequest } from 'store/selectUnReadMessageId'
import Chat from '../components/Chat'

const mapDispatchToProps = (dispatch) => ({
  messagesGetRequest:
    (conversationId, createdAt = null, fromTimer = false) =>
      dispatch(messagesGetRequest(conversationId, createdAt, fromTimer)),
  messagePostRequest:
    (requestId, conversationId, content) => dispatch(messagePostRequest(requestId, conversationId, content)),
  notificationsGetRequest: () => dispatch(notificationsGetRequest()),
  notificationsReadPostRequest: (notifiactionId) => dispatch(notificationsReadPostRequest(notifiactionId)),
  removedselectUnReadMessageIdRequest: () => dispatch(removedselectUnReadMessageIdRequest())
})

const mapStateToProps = (state) => ({
  messagesGet: state.messagesGet,
  messagePost: state.messagePost,
  userGet: state.userGet,
  notificationsGet: state.notificationsGet,
  notificationsReadPost: state.notificationsReadPost
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
