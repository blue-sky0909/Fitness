import { connect } from 'react-redux'
import { forumThreadPatchRequest } from '../reducers/forumThreadPatch'
import { forumThreadGetRequest } from '../reducers/forumThreadGet'
import ForumEditThread from '../components/ForumEditThread'
import { initialize } from 'redux-form'
import { forumThreadUrl } from 'routes/urlGenerators'
import { browserHistory } from 'react-router'

const mapDispatchToProps = (dispatch) => ({
  forumThreadPatchRequest: (categoryId, threadId, data) =>
    dispatch(forumThreadPatchRequest(categoryId, threadId, data)),
  forumThreadGetRequest: (threadId) => dispatch(forumThreadGetRequest(threadId)),
  goToThreadPage: (categoryId, threadId) => browserHistory.push(forumThreadUrl(categoryId, threadId)),
  setFormData: (data) => dispatch(initialize('ForumThread', data))
})

const mapStateToProps = (state) => ({
  forumThreadPatch: state.forumThreadPatch,
  forumThreadGet: state.forumThreadGet
})

export default connect(mapStateToProps, mapDispatchToProps)(ForumEditThread)
