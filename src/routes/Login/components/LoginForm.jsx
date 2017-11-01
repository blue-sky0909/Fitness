import { Field, reduxForm } from 'redux-form'
import { Validation } from 'utils'
import TextInput from 'components/form/TextInput'

const validation = new Validation({
  username: [Validation.is.required, Validation.is.email],
  password: [Validation.is.required]
})

class LoginForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string
  }

  render () {
    const { handleSubmit, submitting, error } = this.props
    return (
      <form onSubmit={handleSubmit} autoComplete='off'>
        { error && <div>{error}</div> }
        <Field
          name='username'
          component={TextInput}
          placeholder='Email Address'
          required='Required' />
        <Field
          name='password'
          type='password'
          component={TextInput}
          placeholder='Password' />
        <button
          type='submit'
          disabled={submitting}
          className='btn btn-default' >
          {submitting ? 'Loading...' : 'Login'}
        </button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'Login',
  validate: (data) => validation.validate(data)
})(LoginForm)
