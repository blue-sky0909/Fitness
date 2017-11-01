import { connect } from 'react-redux'
import { forumReplyPatchRequest } from '../reducers/forumReplyPatch'
import { forumReplyDeleteRequest } from '../reducers/forumReplyDelete'
import { forumReplyLikeRequest } from '../reducers/forumReplyLike'
import { forumReplyDislikeRequest } from '../reducers/forumReplyDislike'
import ForumReply from '../components/forum-replies/ForumReply'
import { userPatchRequest } from 'store/userGet'
import { forumRepliesGetRequest } from '../reducers/forumRepliesGet'

const mapStateToProps = state => ({
  replyLike: state.forumReplyLike,
  replyDislike: state.forumReplyDislike,
  replyPatch: state.forumReplyPatch,
  replyDelete: state.forumReplyDelete,
  userGet: state.userGet,
  forumRepliesGet: state.forumRepliesGet,
})

const mapDispatchToProps = dispatch => ({
  forumRepliesGetRequest: (threadId, page) => dispatch(forumRepliesGetRequest(threadId, page)),
  replyLikeRequest: (replyId) => dispatch(forumReplyLikeRequest(replyId)),
  replyDislikeRequest: (replyId) => dispatch(forumReplyDislikeRequest(replyId)),
  replyPatchRequest: (threadId, replyId, data) => dispatch(forumReplyPatchRequest(threadId, replyId, data)),
  replyDeleteRequest: (replyId, threadId, page) => dispatch(forumReplyDeleteRequest(replyId, threadId, page)),
  userPatchRequest: (userId) => dispatch(userPatchRequest(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ForumReply)