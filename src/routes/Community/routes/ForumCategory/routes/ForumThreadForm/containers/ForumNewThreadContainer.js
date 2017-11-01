import { connect } from 'react-redux'
import { forumThreadPostRequest } from '../reducers/forumThreadPost'
import ForumNewThread from '../components/ForumNewThread'
import { forumCategoryUrl } from 'routes/urlGenerators'
import { browserHistory } from 'react-router'

const mapDispatchToProps = (dispatch) => ({
  forumThreadPostRequest: (categoryId, data) => dispatch(forumThreadPostRequest(categoryId, data)),
  goToCategoryPage: (categoryId) => browserHistory.push(forumCategoryUrl(categoryId))
})

const mapStateToProps = (state) => ({
  forumThreadPost: state.forumThreadPost
})

export default connect(mapStateToProps, mapDispatchToProps)(ForumNewThread)
