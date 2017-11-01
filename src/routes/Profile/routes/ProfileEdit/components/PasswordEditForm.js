import './PasswordEditForm.scss'
import { Field, reduxForm } from 'redux-form'
import { Validation } from 'utils'
import TextInput from 'components/form/TextInput'

const validation = new Validation({
  'oldPassword': [Validation.is.required, Validation.is.string],
  'newPassword': [Validation.is.required, Validation.is.string]
})

class PasswordEditForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  }

  render () {
    const { handleSubmit, error } = this.props
    return (
      <form onSubmit={handleSubmit} className='password-edit-form' autoComplete='off'>
        { error && <div>{error}</div> }
        <Field
          className='password-edit-form-input'
          name='oldPassword'
          label='Old Password'
          component={TextInput}
          type='password'
          placeholder='Old Password' />
        <Field
          className='password-edit-form-input'
          name='newPassword'
          label='New Password'
          component={TextInput}
          type='password'
          placeholder='New Password' />
      </form>
    )
  }
}

export default reduxForm({
  form: 'PasswordEdit',
  validate: (data) => validation.validate(data)
})(PasswordEditForm)
