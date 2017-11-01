import './ForumCategory.scss'
import LoadingIndicator from 'components/LoadingIndicator'
import ErrorAlert from 'components/ErrorAlert'
import ForumThreadsList from './forum-threads/ForumThreadsList'
import { Link } from 'react-router'
import { communityUrl, forumNewThreadUrl } from 'routes/urlGenerators'
import PlansContainer from 'containers/PlansContainer'

class ForumCategory extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      categoryId: PropTypes.string.isRequired
    }),
    forumThreadsGet: PropTypes.object.isRequired,
    forumThreadsGetRequest: PropTypes.func.isRequired,
    forumCategoryGet:  PropTypes.object.isRequired,
    forumCategoryGetRequest: PropTypes.func.isRequired,
    userGetRequest: PropTypes.func,
    userGet: PropTypes.shape({
      loaded: PropTypes.bool,
      loading: PropTypes.bool,
      error: PropTypes.any,
      data: PropTypes.object
    })
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpenMembership: false
    }

    this.showMembership = this.showMembership.bind(this)
  }

  componentWillMount () {
    const { params: { categoryId }, forumThreadsGetRequest, forumCategoryGetRequest } = this.props

    forumCategoryGetRequest(categoryId)
    forumThreadsGetRequest(categoryId)
  }

  showMembership() {
    this.setState({isOpenMembership: true})
  }

  renderTitleAndThreadsList () {
    const { params: { categoryId }, forumThreadsGet, forumCategoryGet, userGetRequest, userGet } = this.props
    const selectedCategory = forumCategoryGet[categoryId]
    if (forumCategoryGet[categoryId] && forumCategoryGet[categoryId].loading && !forumCategoryGet[categoryId].data) {
      return <LoadingIndicator type='spinner' />
    } else if (forumCategoryGet[categoryId] && forumCategoryGet[categoryId].error) {
      return <ErrorAlert error={forumCategoryGet.error} />
    } else if (forumCategoryGet[categoryId] &&
      (forumCategoryGet[categoryId].loaded || forumCategoryGet[categoryId].data)) {
      return <div className='wrap'>
        <div className='forum-top'>
          <div className='container'>
            <div className='left-wrap'>
              <Link to={communityUrl()}>
                <div className='drop-menu'>
                  <p><i className='btm bt-angle-left' />Categories</p>
                </div>
              </Link>
            </div>
            <div className='right-wrap'>
              {
                userGet.data.data.attributes['has-iifym-basic'] || userGet.data.data.attributes['has-iifym-pro'] ?
                  <Link to={forumNewThreadUrl(categoryId)}>
                    <div className='create-topic'>
                      <p>+ Create Topic</p>
                    </div>
                  </Link>
                : <Link>
                    <div className='create-topic' onClick={this.showMembership} >
                      <p>+ Create Topic</p>
                    </div>
                  </Link>
              }
              
            </div>
          </div>
        </div>
        <div className='forum-list'>
          <div className='container'>
            <div className='list-heading'>
              <div className='left-wrap'>
                <div className='topic'>
                  <p>Topic</p>
                </div>
              </div>
              <div className='right-wrap'>
                <div className='replies'>
                  <p>Replies</p>
                </div>
                <div className='activity'>
                  <p>Activity</p>
                </div>
              </div>
            </div>
            <ForumThreadsList
              threads={forumThreadsGet[categoryId]}
              categoryId={this.props.params.categoryId}
              selectedCategory={selectedCategory}
              userInfo={userGet.data.data.attributes}
              showMembership={this.showMembership}/>
          </div>
        </div>
      </div>
    }
  }

  render () {
    const { isOpenMembership } = this.state
    if(isOpenMembership) {
      return <PlansContainer />
    } else {
      return <section id='forumCategory'>
        {this.renderTitleAndThreadsList()}
      </section>
    }

  }
}

const disableStyle = {
  opacity: 0.7,
  cursor: 'not-allowed'
}

export default ForumCategory
