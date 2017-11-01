import { connect } from 'react-redux'
import { forumRepliesGetRequest } from '../reducers/forumRepliesGet'
import { forumReplyPostRequest } from '../reducers/forumReplyPost'
import { forumThreadGetRequest } from '../reducers/forumThreadGet'
import { browserHistory } from 'react-router'
import { forumThreadUrl } from 'routes/urlGenerators'
import ForumThread from '../components/ForumThread'
import { reset, initialize, change } from 'redux-form'

const mapDispatchToProps = (dispatch) => ({
  forumRepliesGetRequest: (threadId, page) => dispatch(forumRepliesGetRequest(threadId, page)),
  forumReplyPostRequest: (threadId, data) => dispatch(forumReplyPostRequest(threadId, data)),
  forumThreadGetRequest: (threadId) => dispatch(forumThreadGetRequest(threadId)),
  initializeReplyForm: (data) => dispatch(initialize('ForumReplyEdit', data)),
  resetReplyForm: () => dispatch(reset('ForumReply')),
  goToFirstPage: (categoryId, threadId) => browserHistory.push(forumThreadUrl(categoryId, threadId, 1)),
  quoteThread: (content) => dispatch(change('ForumReply', 'content', content))
 
})

const mapStateToProps = (state) => ({
  forumRepliesGet: state.forumRepliesGet,
  forumReplyPost: state.forumReplyPost,
  forumThreadGet: state.forumThreadGet,
  userGet: state.userGet
})

export default connect(mapStateToProps, mapDispatchToProps)(ForumThread)
