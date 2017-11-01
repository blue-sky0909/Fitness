import './ProfileEdit.scss'
import user from 'auth/user'
import Button from 'components/controls/Button'
import ProfileBasicInfoForm from './ProfileBasicInfoForm'
import LoadingIndicator from 'components/LoadingIndicator'
import ErrorAlert from 'components/ErrorAlert'
import AvatarEdit from './AvatarEdit'
import PasswordEditForm from './PasswordEditForm'
import MembershipSettingsContainer from '../containers/MembershipSettingsContainer'

class ProfileEdit extends React.Component {
  static propTypes = {
    userGet: PropTypes.object.isRequired,
    userGetRequest: PropTypes.func.isRequired,
    userPatchRequest: PropTypes.func.isRequired,
    setBasicInfoFormData: PropTypes.func.isRequired,
    avatarPost: PropTypes.object.isRequired,
    avatarPostRequest: PropTypes.func.isRequired,
    changePasswordRequest: PropTypes.func.isRequired,
    resetPasswordEditForm: PropTypes.func.isRequired,
    userPatch: PropTypes.object.isRequired,
    changePassword: PropTypes.object.isRequired,
    showNotification: PropTypes.func.isRequired
  }

  state = {
    passwordUpdated: false
  }

  onUpdateButtonClick = () => {
    if (this.passwordEditForm.dirty) {
      this.passwordEditForm.submit()
    }

    if (this.basicInfoForm.dirty) {
      this.basicInfoForm.submit()
    }

    if (this.avatarEditor.dirty) {
      this.avatarEditor.submit()
    }
  }

  submitBasicInfoForm = data => {
    const { userPatchRequest, userGet } = this.props

    return userPatchRequest(user.id, _.assign({}, userGet.data.data.attributes, data))
  }

  onBasicInfoSubmitSuccess = data => {
    this.props.userGetRequest()
    this.props.showNotification({
      message: 'Profile data has been updated.',
      kind: 'success',
      dismissAfter: 5000
    })
  }

  onAvatarUpdate = () => {
    this.props.userGetRequest()
    this.props.showNotification({
      message: 'Profile image has been updated.',
      kind: 'success',
      dismissAfter: 5000
    })
  }

  submitPasswordForm = data => {
    return this.props.changePasswordRequest(user.id, data.oldPassword, data.newPassword)
  }

  onPasswordSubmitSuccess = () => {
    this.props.resetPasswordEditForm()
    this.setState({
      passwordUpdated: true
    })
    this.props.showNotification({
      message: 'Password has been updated.',
      kind: 'success',
      dismissAfter: 5000
    })
  }

  componentWillMount () {
    this.setBasicInfoFormData(this.props.userGet.data)
  }

  componentDidUpdate (prevProps) {
    if (!prevProps) return

    const { userGet } = prevProps

    if (!userGet.loaded &&
      this.props.userGet.loaded) {
      this.setBasicInfoFormData(this.props.userGet.data)
    }
  }

  setBasicInfoFormData (data) {
    const { setBasicInfoFormData } = this.props

    setBasicInfoFormData({
      'first-name': data.data.attributes['first-name'],
      'last-name': data.data.attributes['last-name'],
      'email': data.data.attributes['email']
    })
  }

  avatarEditorRef = form => { this.avatarEditor = form }
  passwordEditFormRef = form => { this.passwordEditForm = form }
  basicInfoFormRef = form => { this.basicInfoForm = form }

  renderForm () {
    const { userGet, avatarPost, avatarPostRequest, userPatch, changePassword } = this.props

    if (userGet.loading && !userGet.data) {
      return <LoadingIndicator type='spinner' />
    } else if (userGet.error) {
      return <ErrorAlert error={userGet.error} />
    } else if (userGet.loaded || userGet.data) {
      const submitting = userPatch.loading || changePassword.loading || avatarPost.loading

      return <div className='profileEdit_container'>
        <h4 className='profileEdit_title'>General Info</h4>
        <div className='profileEdit_first-row'>
          <AvatarEdit
            ref={this.avatarEditorRef}
            avatarPost={avatarPost}
            avatarPostRequest={avatarPostRequest}
            avatar={userGet.data.data.attributes.avatar}
            onAvatarChange={this.onAvatarUpdate} />

          <ProfileBasicInfoForm
            ref={this.basicInfoFormRef}
            onSubmit={this.submitBasicInfoForm}
            onSubmitSuccess={this.onBasicInfoSubmitSuccess} />
        </div>

        <h4 className='profileEdit_title profileEdit_password-change-title'>
          Edit Password
        </h4>

        <PasswordEditForm
          ref={this.passwordEditFormRef}
          onSubmit={this.submitPasswordForm}
          onSubmitSuccess={this.onPasswordSubmitSuccess} />

        <Button
          onClick={this.onUpdateButtonClick}
          appearance='with-background'
          color='red'
          className='profileEdit_update-button'
          size='big'
          disabled={submitting} >
          {submitting ? 'Loading...' : 'UPDATE'}
        </Button>

        <MembershipSettingsContainer />
      </div>
    }

    return null
  }

  render () {
    return <section id='profileEdit'>
      <div className='container'>
        {this.renderForm()}
      </div>
    </section>
  }
}

export default ProfileEdit
