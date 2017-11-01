import './ForumReply.scss'
import user from 'auth/user'
import Button from 'components/controls/Button'
// import LikeButton from '../LikeButton'
import Line from 'components/Line'
import ForumReplyEditForm from './ForumReplyEditForm'
import Author from '../Author'
import OptionsDropdown from '../OptionsDropdown'

const ReactToastr = require("react-toastr");
const {ToastContainer} = ReactToastr; 
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class ForumReply extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    }),
    threadId: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onEditCancel: PropTypes.func.isRequired,
    editing: PropTypes.bool.isRequired,
    replyPatchRequest: PropTypes.func.isRequired,
    replyDeleteRequest: PropTypes.func.isRequired,
    initializeReplyForm: PropTypes.func.isRequired,
    threadDate: PropTypes.string.isRequired,
    threadAuthorName: PropTypes.string.isRequired,
    setReplayToThread: PropTypes.func.isRequired,
    replyPatch: PropTypes.object.isRequired,
    replyDelete: PropTypes.object.isRequired,
    userGet: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      loaded: PropTypes.bool.isRequired,
      data: PropTypes.object.isRequired,
      error: PropTypes.any
    }),
    userPatchRequest: PropTypes.func.isRequired,
    forumRepliesGet: PropTypes.object.isRequired,
    repliesGetRequest: PropTypes.func.isRequired
    // like: PropTypes.object.isRequired,
    // likeRequest: PropTypes.func.isRequired,
    // dislike: PropTypes.object.isRequired,
    // dislikeRequest: PropTypes.func.isRequired
  }
 
  get optionsList () {
    return [
      { label: 'Delete Post', clickAction: this.onDelete },
      { label: 'Edit Post', clickAction: this.onEdit },
      { label: 'Ban User', clickAction: this.makeBanUser }
    ]
  }

  submit = data => {
    const { threadId, item: { id }, replyPatchRequest, page } = this.props
    let self = this
    replyPatchRequest(threadId, id, data, page)    
    .then(function(res) {
      if(res == false) {
        self.refs.message.error(
          "",
          "You cant edit this post", {
          timeOut: 5000,
          extendedTimeOut: 5000
        });
        
      } else {
      self.refs.message.success(
        "",
        "Your post data has been uppdated successfully", {
        timeOut: 5000,
        extendedTimeOut: 5000
      });         
      }
    })
    this.props.repliesGetRequest(threadId, page)
  }

  onSubmitSuccess = data => {
    this.props.onEditCancel()
  }

  onEdit = () => {
    const { item, initializeReplyForm, onEdit, threadData } = this.props
    if(threadData.locked == true) {
      this.refs.message.error(
        "",
        "This thread is locked, you can no longer post a reply", {
        timeOut: 5000,
        extendedTimeOut: 5000
      });
    }
    else {
      initializeReplyForm({
        content: item.content
      })
      return onEdit(this.props.item.id) 
    }

  }

  onEditCancel = () => {
    return this.props.onEditCancel()
  }

  onDelete = () => {
    const { replyDeleteRequest, item, threadId, page } = this.props
    let self = this
    replyDeleteRequest(item.id, threadId, page)
    .then(function(res){
      if(res === false) {
        self.refs.message.error(
          "",
          "You cant delete this post", {
          timeOut: 5000,
          extendedTimeOut: 5000
        });
      } else {
        self.refs.message.success(
          "",
          "Your post data has been removed successfully", {
          timeOut: 5000,
          extendedTimeOut: 5000
        });
      }
    })
    this.props.repliesGetRequest(threadId, page)
  }

  makeBanUser = () => {
    this.props.userPatchRequest(this.props.item.author.id)
    let self = this
    self.refs.message.success(
      "",
      "This user is banned successfully ", {
      timeOut: 2000,
      extendedTimeOut: 2000
    });
  }

  renderReplyEditForm = () => {
    return (
      <ForumReplyEditForm
        onSubmit={this.submit}
        onSubmitSuccess={this.onSubmitSuccess}
        onCancel={this.onEditCancel} />
    )
  }

  replay = () =>{
    const { item } = this.props
    this.props.setReplayToThread(item)
    
  }

  renderReply = () => {
    const { item, threadDate, threadAuthorName } = this.props
    const userRole = localStorage.getItem('role')
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div className='date'>Posted {moment(item.created_at).format('LLLL')}</div>
          <a onClick={this.replay} href='#forumReplyForm'>
            <Button className='reply-btn'>
              <p>Reply<i className='btm bt-reply'/></p>
            </Button>
          </a>
        </div>
        
        {
          item.quoted_content &&
          <blockquote className='reply-quoted-content'>
            <div className='reply-origgin'>{ `${threadAuthorName} ${moment(threadDate).format('LLLL')}` }</div>
            <div className='reply-content'>
              { item.quoted_content }
            </div>
          </blockquote>
        }
        {
          item.deleted == true ?
            <div className='text' style={{fontStyle: 'italic'}} >This post has been removed by admin</div>
          : <div className='text'>{item.content}</div>
        }
        
        {
          userRole == 2 ?
            <div className='options'>
              <OptionsDropdown optionsList={this.optionsList} />
            </div>
          : null
        }
        <div className='controls'>
          { /* <LikeButton
            liked={item.liked}
            likeCount={item.like_count}
            className='thread-like-button'
            like={like}
            likeRequest={likeRequest}
            dislike={dislike}
            dislikeRequest={dislikeRequest} /> */ }

          {
            
            user.id === item.author.id || userRole == 2 ?
              <Button
                appearance='simple'
                color='grey'
                onClick={this.onEdit}>
                Edit <i className='btm bt-edit' aria-hidden='true' />
              </Button>   
            : null   
          }
        </div>
      </div>
    )
  }

  render () {
    const { item, editing, data, threadData } = this.props
    return <article className='forum-reply'>
      <div className='reply'>
        <ToastContainer ref="message"
            toastMessageFactory={ToastMessageFactory}
            className="toast-top-right" />
        <Author author={item.author} />
        <div className='content'>
          {
            editing ? this.renderReplyEditForm() : this.renderReply()
          }
        </div>
      </div>
      <Line />
    </article>
  }
}

const mapStateToProps = (state) => ({
  data: state.forumReplyPatch.data ? state.forumReplyPatch.data.attributes : null
})


export default ReactRedux.connect(mapStateToProps)(ForumReply)
