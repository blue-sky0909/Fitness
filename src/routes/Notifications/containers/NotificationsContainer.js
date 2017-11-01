import Notifications from '../components/Notifications'
import { notificationsReadPostRequest } from 'store/notificationsReadPost'
// import { browserHistory } from 'react-router'

const mapDispatchToProps = (dispatch) => ({
  notificationsReadPostRequest: (notificationId) => dispatch(notificationsReadPostRequest(notificationId))
})

const mapStateToProps = (state) => ({
  notificationsGet: state.notificationsGet,
  notificationsReadPost: state.notificationsReadPost
})

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Notifications)
