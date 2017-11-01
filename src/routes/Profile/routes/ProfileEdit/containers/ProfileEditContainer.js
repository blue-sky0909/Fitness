import { connect } from 'react-redux'
import { userPatchRequest } from '../reducers/userPatch'
import { avatarPostRequest } from '../reducers/avatarPost'
import { userGetRequest } from 'store/userGet'
import { changePasswordRequest } from '../reducers/changePassword'
import ProfileEdit from '../components/ProfileEdit'
import { initialize, reset, submit } from 'redux-form'
import { actions as notifActions } from 'redux-notifications'

const mapDispatchToProps = (dispatch) => ({
  userPatchRequest: (userId, data) => dispatch(userPatchRequest(userId, data)),
  avatarPostRequest: (userId, image) => dispatch(avatarPostRequest(userId, image)),
  changePasswordRequest:
    (userId, oldPassword, newPassword) => dispatch(changePasswordRequest(userId, oldPassword, newPassword)),
  userGetRequest: () => dispatch(userGetRequest()),
  setBasicInfoFormData: (data) => dispatch(initialize('ProfileBasicInfo', data)),
  resetPasswordEditForm: () => dispatch(reset('PasswordEdit')),
  submitProfileBasicInfoForm: () => dispatch(submit('ProfileBasicInfo')),
  submitPasswordEditForm: () => dispatch(submit('submitPasswordEditForm')),
  showNotification: data => dispatch(notifActions.notifSend(data))
})

const mapStateToProps = (state) => ({
  userGet: state.userGet,
  userPatch: state.userPatch,
  avatarPost: state.avatarPost,
  changePassword: state.changePassword
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)
