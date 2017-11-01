import './ForumReplyForm.scss'
import { Field, reduxForm } from 'redux-form'
import { Validation } from 'utils'
import TextArea from 'components/form/TextArea'
import Button from 'components/controls/Button'

const validation = new Validation({
  content: [Validation.is.required, Validation.is.string]
})

class ForumReplyForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      disabled: true
    }
  }
  render () {
    const { handleSubmit, submitting, error, threadData } = this.props
    console.log(threadData)
    return (
      <form onSubmit={handleSubmit} className='forum-reply-form' autoComplete='off'>
        { error && <div>{error}</div> }
        {
          threadData.locked == true ?            
            <input type="text" className="form-control" readOnly
              placeholder="This thread is locked, you can no longer post a reply"
              style={inputStyle}/>
           
          : <div style={{display: 'flex',justifyContent: 'space-between'}}>
            <div style={{width: '80%'}}>
              <Field
                name='content'
                component={TextArea}
                placeholder='Type your comment here'
                />
            </div>  
            
            <Button
              type='submit'
              disabled={submitting}
              color='white' >
              {submitting ? 'Loading...' : 'POST'}
            </Button>
          </div>
        }
        
      </form>
    )
  }
}

const inputStyle = {
  width: '100%',
  fontStyle: 'italic'
}

export default reduxForm({
  form: 'ForumReply',
  validate: (data) => validation.validate(data)
})(ForumReplyForm)
