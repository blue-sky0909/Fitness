import LoadingIndicator from 'components/LoadingIndicator'
import ForumReply from '../../containers/ForumReplyContainer'
import Pagination from 'components/controls/Pagination'
import { forumThreadUrl } from 'routes/urlGenerators'
import ForumReplyForm from './ForumReplyForm'
class ForumReplies extends React.Component {
  static propTypes = {
    replies: PropTypes.object.isRequired,
    categoryId: PropTypes.string.isRequired,
    threadId: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
    // replyPatch: PropTypes.object.isRequired,
    repliesGetRequest: PropTypes.func.isRequired,
    initializeReplyForm: PropTypes.func.isRequired,
    threadDate: PropTypes.string.isRequired,
    threadAuthorName: PropTypes.string.isRequired,
    setReplayToThread: PropTypes.func
  }

  state = {
    editing: null
  }

  onReplyEdit = (replyId) => {
    this.setState({ editing: replyId })
  }

  onReplyEditCancel = () => {
    this.props.repliesGetRequest(this.props.threadId, this.props.page)
    this.setState({ editing: null })
  }

  componentWillMount () {
  }

  render () {
    const { replies, threadId, categoryId, page,
      initializeReplyForm, threadDate, threadAuthorName, threadData } = this.props
    if (replies[page] && replies[page].loading && !replies[page].data) {
      return <LoadingIndicator type='grid' />
    } else if (replies[page] && (replies[page].loaded || replies[page].data)) {
      const { editing } = this.state

      const paginationUrlGenerator = (page) => forumThreadUrl(categoryId, threadId, page)
      return <div id='forumReplies'>
        <Pagination
          pagesCount={replies[page].data.meta.pageCount}
          currentPage={page * 1}
          urlGenerator={paginationUrlGenerator} />
        {
          _.map(
            replies[page].data.formattedData,
            (item) => <ForumReply
              onEdit={this.onReplyEdit}
              onEditCancel={this.onReplyEditCancel}
              editing={editing === item.id}
              item={item}
              threadId={threadId}
              threadDate={threadDate}
              threadData={this.props.threadData}
              threadAuthorName={threadAuthorName}
              page={page}
              initializeReplyForm={initializeReplyForm}
              key={item.id} 
              setReplayToThread={this.props.setReplayToThread}
              repliesGetRequest={this.props.repliesGetRequest}/>)
        }
        <Pagination
          pagesCount={replies[page].data.meta.pageCount}
          currentPage={page * 1}
          urlGenerator={paginationUrlGenerator} />
       
      </div>
    }

    return null
  }
}

export default ForumReplies
