import './ForumThreadForm.scss'
import { Field, reduxForm } from 'redux-form'
import { Validation } from 'utils'
import TextArea from 'components/form/TextArea'
import TextInput from 'components/form/TextInput'
import Button from 'components/controls/Button'

const validation = new Validation({
  content: [Validation.is.required, Validation.is.string],
  title: [Validation.is.required, Validation.is.string]
})

class ForumReplyForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string
  }

  render () {
    const { handleSubmit, submitting, error } = this.props
    return (
      <form onSubmit={handleSubmit} className='forum-thread-form' autoComplete='off'>
        { error && <div>{error}</div> }
        <Field
          name='title'
          label='Title'
          component={TextInput}
          placeholder='' />
        <Field
          name='content'
          label='Content'
          component={TextArea}
          placeholder='' />
        <Button
          type='submit'
          disabled={submitting}
          appearance='with-background'
          color='red'
          layout='block'
          rounded >
          {submitting ? 'Loading...' : 'Create'}
        </Button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'ForumThread',
  validate: (data) => validation.validate(data)
})(ForumReplyForm)
