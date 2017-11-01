import './ConversationForm.scss'
import { Field, reduxForm } from 'redux-form'
import { Validation } from 'utils'
import TextArea from 'components/form/TextArea'
import TextInput from 'components/form/TextInput'
import Button from 'components/controls/Button'

const validation = new Validation({
  content: [Validation.is.required, Validation.is.string],
  title: [Validation.is.required, Validation.is.string]
})

class ConversationForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string
  }

  render () {
    const { handleSubmit, submitting, error } = this.props
    return (
      <form onSubmit={handleSubmit} className='conversation-form' autoComplete='off'>
        { error && <div>{error}</div> }
        <Field
          name='title'
          label='Title'
          component={TextInput}
          placeholder='Title' />
        <Field
          name='content'
          component={TextArea}
          placeholder='Message' />
        <Button
          type='submit'
          disabled={submitting}
          appearance='bordered'
          color='grey' >
          {submitting ? 'Loading...' : 'Send'}
        </Button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'ConversationForm',
  validate: (data) => validation.validate(data)
})(ConversationForm)
