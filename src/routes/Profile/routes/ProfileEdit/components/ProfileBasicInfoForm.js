import './ProfileBasicInfoForm.scss'
import { Field, reduxForm } from 'redux-form'
import { Validation } from 'utils'
import TextInput from 'components/form/TextInput'

const validation = new Validation({
  'first-name': [Validation.is.required, Validation.is.string],
  'last-name': [Validation.is.required, Validation.is.string],
  email: [Validation.is.required, Validation.is.email]
})

class ProfileBasicInfoForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  }

  render () {
    const { handleSubmit, error } = this.props
    return (
      <form onSubmit={handleSubmit} className='profile-basic-info-form' autoComplete='off'>
        { error && <div>{error}</div> }
        <Field
          name='first-name'
          label='First Name'
          component={TextInput}
          placeholder='First Name' />
        <Field
          name='last-name'
          label='Last Name'
          component={TextInput}
          placeholder='Last Name' />
        <Field
          name='email'
          label='Email'
          component={TextInput}
          placeholder='Email' />
      </form>
    )
  }
}

export default reduxForm({
  form: 'ProfileBasicInfo',
  validate: (data) => validation.validate(data)
})(ProfileBasicInfoForm)
