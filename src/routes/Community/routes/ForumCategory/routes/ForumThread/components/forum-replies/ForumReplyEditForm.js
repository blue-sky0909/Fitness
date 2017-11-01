import './ForumReplyEditForm.scss'
import { Field, reduxForm } from 'redux-form'
import { Validation } from 'utils'
import TextArea from 'components/form/TextArea'
import Button from 'components/controls/Button'

const validation = new Validation({
  content: [Validation.is.required, Validation.is.string]
})

class ForumReplyEditForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    error: PropTypes.string
  }

  render () {
    const { handleSubmit, submitting, error, onCancel } = this.props
    return (
      <form onSubmit={handleSubmit} className='forum-reply-edit-form' autoComplete='off'>
        { error && <div>{error}</div> }
        <Field
          name='content'
          component={TextArea}
          placeholder='Type your comment here' />
        <Button
          type='submit'
          disabled={submitting}
          className='submit-button'
          appearance='bordered' >
          {submitting ? 'Loading...' : 'Save'}
        </Button>
        <Button
          type='button'
          disabled={submitting}
          className='cancel-button'
          onClick={onCancel}
          appearance='bordered' >
          Cancel
        </Button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'ForumReplyEdit',
  validate: (data) => validation.validate(data)
})(ForumReplyEditForm)
