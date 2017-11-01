import { connect } from 'react-redux'
import { forumCategoriesGetRequest } from '../reducers/forumCategoriesGet'
import ForumCategoriesList from '../components/forum-categories/ForumCategoriesList'
import { userGetRequest } from 'store/userGet'
const mapDispatchToProps = (dispatch) => ({
  forumCategoriesGetRequest: () => dispatch(forumCategoriesGetRequest()),
  userGetRequest: () => dispatch(userGetRequest())
})

const mapStateToProps = (state) => ({
  forumCategoriesGet: state.forumCategoriesGet,
  userGet: state.userGet
})

export default connect(mapStateToProps, mapDispatchToProps)(ForumCategoriesList)
