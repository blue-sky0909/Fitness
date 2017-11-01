import { connect } from 'react-redux'
import { forumCategoryGetRequest } from '../reducers/forumCategoryGet'
import { forumThreadsGetRequest } from '../reducers/forumThreadsGet'
import ForumCategory from '../components/ForumCategory'
import { userGetRequest } from 'store/userGet'

const mapDispatchToProps = (dispatch) => ({
  forumCategoryGetRequest: (categoryId) => dispatch(forumCategoryGetRequest(categoryId)),
  forumThreadsGetRequest: (categoryId) => dispatch(forumThreadsGetRequest(categoryId)),
  userGetRequest: () => dispatch(userGetRequest())
})

const mapStateToProps = (state) => ({
  forumCategoryGet: state.forumCategoryGet,
  forumThreadsGet: state.forumThreadsGet,
  userGet: state.userGet
})

export default connect(mapStateToProps, mapDispatchToProps)(ForumCategory)
