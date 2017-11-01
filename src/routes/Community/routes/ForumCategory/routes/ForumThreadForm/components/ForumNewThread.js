import './ForumNewThread.scss'
import Button from 'components/controls/Button'
import { Link } from 'react-router'
import { forumCategoryUrl } from 'routes/urlGenerators'
import ForumThreadForm from './ForumThreadForm'

class ForumNewThread extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      categoryId: PropTypes.string.isRequired
    }),
    // forumThreadPost: PropTypes.object.isRequired,
    forumThreadPostRequest: PropTypes.func.isRequired,
    goToCategoryPage: PropTypes.func.isRequired
  }

  submit = data => {
    const { params: { categoryId }, forumThreadPostRequest } = this.props

    return forumThreadPostRequest(categoryId, data)
  }

  onSubmitSuccess = data => {
    const { params: { categoryId }, goToCategoryPage } = this.props

    goToCategoryPage(categoryId)
  }

  render () {
    const { params: { categoryId } } = this.props

    return (
      <section id='forumNewThread'>
        <div className='container'>
          <Link className='back-button' to={forumCategoryUrl(categoryId)} >
            <Button appearance='bordered' color='grey' rounded>
              Back to Threads <i className='btm bt-angle-left' aria-hidden='true' />
            </Button>
          </Link>
          <div className="new-forum-thread-wrap">
            <h4 className='title'>Create new topic</h4>
            <div className="form-wrap">
              <ForumThreadForm onSubmit={this.submit} onSubmitSuccess={this.onSubmitSuccess} />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ForumNewThread
