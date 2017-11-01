import { connect } from 'react-redux'
import { conversationsGetRequest } from '../reducers/conversationsGet'
import Conversations from '../components/Conversations'
import { notificationsReadPostRequest } from 'store/notificationsReadPost'

const mapDispatchToProps = (dispatch) => ({
  conversationsGetRequest: () => dispatch(conversationsGetRequest()),
  notificationsReadPostRequest: (notifiactionId) => dispatch(notificationsReadPostRequest())
})

const mapStateToProps = (state) => ({
  conversationsGet: state.conversationsGet,
  userGet: state.userGet,
  notificationsGet: state.notificationsGet,
  notificationsReadPost: state.notificationsReadPost
})

export default connect(mapStateToProps, mapDispatchToProps)(Conversations)
