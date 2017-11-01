import NotificationsDropdown from '../components/notifications/NotificationsDropdown'
import { notificationsGetRequest } from 'store/notificationsGet'
import { notificationsReadPostRequest } from 'store/notificationsReadPost'
import { selectUnReadMessageIdRequest } from 'store/selectUnReadMessageId'
// import { browserHistory } from 'react-router'

const mapDispatchToProps = (dispatch) => ({
  notificationsGetRequest: () => dispatch(notificationsGetRequest()),
  notificationsReadPostRequest: (notifiactionId) => dispatch(notificationsReadPostRequest(notifiactionId)),
  selectUnReadMessageIdRequest: (id) => dispatch(selectUnReadMessageIdRequest(id))
})

const mapStateToProps = (state) => ({
  notificationsGet: state.notificationsGet,
  notificationsReadPost: state.notificationsReadPost,
  selectUnReadMessageIdGet: state.selectUnReadMessageIdGet
})

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(NotificationsDropdown)
