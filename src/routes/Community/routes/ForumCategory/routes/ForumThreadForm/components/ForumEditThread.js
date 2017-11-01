import './ForumEditThread.scss'
import Button from 'components/controls/Button'
import { Link } from 'react-router'
import { forumThreadUrl } from 'routes/urlGenerators'
import ForumThreadForm from './ForumThreadForm'
import LoadingIndicator from 'components/LoadingIndicator'
import ErrorAlert from 'components/ErrorAlert'

class ForumEditThread extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      categoryId: PropTypes.string.isRequired,
      threadId: PropTypes.string.isRequired
    }),
    forumThreadGet: PropTypes.object.isRequired,
    forumThreadGetRequest: PropTypes.func.isRequired,
    forumThreadPatchRequest: PropTypes.func.isRequired,
    goToThreadPage: PropTypes.func.isRequired,
    setFormData: PropTypes.func.isRequired
  }

  submit = data => {
    const { params: { categoryId, threadId }, forumThreadPatchRequest } = this.props

    return forumThreadPatchRequest(categoryId, threadId, data)
  }

  onSubmitSuccess = data => {
    const { params: { categoryId, threadId }, goToThreadPage } = this.props

    goToThreadPage(categoryId, threadId)
  }

  componentWillMount () {
    const { params: { threadId }, forumThreadGet, forumThreadGetRequest } = this.props

    if (!forumThreadGet[threadId] || !forumThreadGet[threadId].data) {
      forumThreadGetRequest(threadId)
    }
  }

  componentDidMount () {
    const { forumThreadGet, params: { threadId } } = this.props

    if (forumThreadGet[threadId] && forumThreadGet[threadId].data) {
      this.setFormData(forumThreadGet[threadId].data)
    }
  }

  componentDidUpdate (prevProps) {
    if (!prevProps) return

    const { params: { threadId }, setFormData, forumThreadGet } = prevProps

    if ((!forumThreadGet[threadId] || !forumThreadGet[threadId].data) &&
      this.props.forumThreadGet[threadId] && this.props.forumThreadGet[threadId].data) {
      setFormData(this.props.forumThreadGet[threadId].data)
    }
  }

  setFormData (data) {
    const { setFormData } = this.props

    setFormData({
      content: data.formattedData.content,
      title: data.formattedData.title
    })
  }

  renderForm () {
    const { params: { categoryId, threadId }, forumThreadGet } = this.props

    if (forumThreadGet[threadId] && forumThreadGet[threadId].loading) {
      return <LoadingIndicator type='spinner' />
    } else if (forumThreadGet[threadId] && forumThreadGet[threadId].error) {
      return <ErrorAlert error={forumThreadGet.error} />
    } else if (forumThreadGet[threadId] && forumThreadGet[threadId].data) {
      return <div>
        <Link className='back-button' to={forumThreadUrl(categoryId, threadId)} >
          <Button appearance='bordered' color='grey'>
            Back to topic <i className='btm bt-angle-left' aria-hidden='true' />
          </Button>
        </Link>
        <h4 className='title'>Edit topic</h4>
        <ForumThreadForm onSubmit={this.submit} onSubmitSuccess={this.onSubmitSuccess} />
      </div>
    }

    return null
  }

  render () {
    return <section id='forumEditThread'>
      <div className='container'>
        {this.renderForm()}
      </div>
    </section>
  }
}

export default ForumEditThread
