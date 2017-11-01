import './ForumThread.scss'
// import user from 'auth/user'
import LoadingIndicator from 'components/LoadingIndicator'
import ErrorAlert from 'components/ErrorAlert'
import ForumReplies from './forum-replies/ForumReplies'
import Button from 'components/controls/Button'
import Avatar from 'components/Avatar'
import { Link } from 'react-router'
import { forumCategoryUrl } from 'routes/urlGenerators' /* forumEditThreadUrl */
import ForumReplyForm from './forum-replies/ForumReplyForm'
import Author from './Author'
import ShareButton from './ShareButton'
import SearchButton from './SearchButton'
import ThreadControlBtn from './ThreadControlBtn'
import {connect} from 'react-redux'

class ForumThread extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      categoryId: PropTypes.string.isRequired,
      threadId: PropTypes.string.isRequired,
      page: PropTypes.string.isRequired
    }),
    forumThreadGet: PropTypes.object.isRequired,
    forumThreadGetRequest: PropTypes.func.isRequired,
    forumRepliesGet:  PropTypes.object.isRequired,
    forumRepliesGetRequest: PropTypes.func.isRequired,
    forumReplyPostRequest: PropTypes.func.isRequired,
    initializeReplyForm: PropTypes.func.isRequired,
    resetReplyForm: PropTypes.func.isRequired,
    goToFirstPage: PropTypes.func.isRequired,
    quoteThread: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    
    this.state = {
      userRole: null,
      userId: -1
    }
  }
  componentWillMount () {
    const { params: { threadId, page }, forumThreadGetRequest, forumRepliesGetRequest, forumRepliesGet } = this.props

    forumThreadGetRequest(threadId)
    forumRepliesGetRequest(threadId, page)
    this.setState({userRole: localStorage.getItem('role')})
    this.setState({userId: localStorage.getItem('userId')})
  }
  
  componentWillReceiveProps (nextProps) {
    if (nextProps.params.page !== this.props.params.page) {
      this.props.forumRepliesGetRequest(nextProps.params.threadId, nextProps.params.page)
    }
  }

  submit = data => {
    const { params: { threadId }, forumReplyPostRequest } = this.props

    return forumReplyPostRequest(threadId, data)
  }

  onSubmitSuccess = data => {
    const {
      params: { categoryId, threadId, page }, forumRepliesGetRequest,
      resetReplyForm, goToFirstPage } = this.props

    // if (page !== '1') {
    //   goToFirstPage(categoryId, threadId)
    // } else {
    //   forumRepliesGetRequest(threadId, 1)
    // }
    forumRepliesGetRequest(threadId, page)   
    resetReplyForm()
  }

  replyToThread = e => {
    const { params: { threadId }, forumThreadGet, quoteThread } = this.props
    const threadData = forumThreadGet[threadId].data.formattedData

    e.preventDefault()
    quoteThread(`[quote]${threadData.content}[/quote]\n`)
    this.formContainer.scrollIntoView({
      behavior: 'smooth'
    })
  }

  setReplayToThread = (item) => {
    const { quoteThread } = this.props
    quoteThread(`[quote]${item.content}[/quote]\n`)
    this.formContainer.scrollIntoView({
      behavior: 'smooth'
    })
  }

  formContainerRef = el => { this.formContainer = el }

  renderTitleAndReplies () {
    const { params: { threadId, categoryId, page }, forumThreadGet,
    forumRepliesGet, initializeReplyForm, forumRepliesGetRequest, userGet } = this.props
    if (forumThreadGet[threadId] && forumThreadGet[threadId].loading && !forumThreadGet[threadId].data) {
      return <LoadingIndicator type='spinner' />
    } else if (forumThreadGet[threadId] && forumThreadGet[threadId].error) {
      return <ErrorAlert error={forumThreadGet.error} />
    } else if (forumThreadGet[threadId] && (forumThreadGet[threadId].loaded || forumThreadGet[threadId].data)) {
      const threadData = forumThreadGet[threadId].data.formattedData     
      return <div className='container'>
        <div className='top-wrap'>
          <Link to={forumCategoryUrl(categoryId)} >
            <Button className='back-button'>
              Back to Threads<i className='btm bt-angle-left' aria-hidden='true' />
            </Button>
          </Link>
          {
            this.state.userRole == 2 ? 
              <ThreadControlBtn threadId={threadId} categoryId={categoryId} threadData={threadData}/>
            : null
          }
          
          <SearchButton />
        </div>

        <div className='title-wrap'>
          <div className='left-side'>
            <div className='user-image'>
              <Avatar image={threadData.author.attributes.avatar} size='small' />
              <img src='https://placeholdit.co//i/60x60?' />
            </div>
            <div className='title-name'>
              <h1>{threadData.title}</h1>
              <p>
                <span>
                  By {threadData.author.attributes.first_name} {threadData.author.attributes.last_name}.
                </span>{' '}
                Posted on {' '}
                <span>{moment(threadData.created_at).format('lll')}</span>
                {' '} in {threadData.category.attributes.title}
              </p>
            </div>
          </div>
          <div className='right-side'>
            <ShareButton title={threadData.title} description={threadData.content} />
            <div className='reply-button'>
              <a className='hide' onClick={this.replyToThread} href='#forumReplyForm'>
                <Button className='reply'>
                  <p><i className='btm bt-reply' />Reply</p>
                </Button>
              </a>
            </div>
          </div>
        </div>

        {
          // (user.id === threadData.author.id || user.isAdmin) &&
          // <Link className='edit-thread-button' to={forumEditThreadUrl(categoryId, threadId)} >
          //   <Button appearance='bordered' color='red'>
          //     <i className='btm bt-edit' aria-hidden='true' /> Edit topic
          //   </Button>
          // </Link>
        }

        <article className='forum-thread'>
          <Author author={threadData.author} id={threadData.author.id} />
          <div className='content'>
            <div className='date'>Posted {moment(threadData.created_at).format('LLLL')}</div>
            <div className='reply-section'>
              <a onClick={this.replyToThread} href='#forumReplyForm'>
                <Button className='reply'>
                  <p>Reply<i className='btm bt-reply' /></p>
                </Button>
              </a>
            </div>
            <div className='text'>{threadData.content}</div>
          </div>
        </article>

        { forumRepliesGet[threadId] &&
          <ForumReplies
            initializeReplyForm={initializeReplyForm}
            replies={forumRepliesGet[threadId]}
            threadId={threadId}
            threadDate={threadData.created_at}
            threadData={threadData}
            threadAuthorName={`${threadData.author.attributes.first_name} ${threadData.author.attributes.last_name}`}
            categoryId={categoryId}
            page={page}
            repliesGetRequest={forumRepliesGetRequest} 
            setReplayToThread={this.setReplayToThread}/> }

        <div className='reply-form-wrap' ref={this.formContainerRef} id='forumReplyForm'>
          <div className='author-avatar'>
            <Avatar size='normal' image={userGet.data.data.attributes.avatar} />  
          </div>
          <ForumReplyForm onSubmit={this.submit} onSubmitSuccess={this.onSubmitSuccess} threadData={threadData} />
        </div>
      </div>
    }
  }

  render () {
    return <section id='forumThread'>
      {this.renderTitleAndReplies()}
    </section>
  }
}

let mapStateToProps = (state) => {
  return {
    account: state.login.data
  }
}
export default connect(mapStateToProps)(ForumThread)
