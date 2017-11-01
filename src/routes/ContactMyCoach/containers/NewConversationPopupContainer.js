import { connect } from 'react-redux'
import NewConversationPopup from '../components/new-conversation/NewConversationPopup'
import { conversationPostRequest } from '../reducers/conversationPost'
import { messagePostRequest } from '../reducers/messagePost'
import { conversationsGetRequest } from '../reducers/conversationsGet'
import { browserHistory } from 'react-router'
import { contactMyCoachUrl } from 'routes/urlGenerators'

const mapDispatchToProps = (dispatch) => ({
  conversationPostRequest: (coachId, customerId, data) => dispatch(conversationPostRequest(coachId, customerId, data)),
  messagePostRequest:
    (requestId, conversationId, content) =>
    dispatch(messagePostRequest(requestId, conversationId, content)),
  conversationsGetRequest: () => dispatch(conversationsGetRequest()),
  goBack: () => browserHistory.push(contactMyCoachUrl())
})

const mapStateToProps = (state) => ({
  userGet: state.userGet,
  conversationPost: state.conversationPost
})

export default connect(mapStateToProps, mapDispatchToProps)(NewConversationPopup)
