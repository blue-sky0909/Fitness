import './ForumCategoriesList.scss'
import LoadingIndicator from 'components/LoadingIndicator'
import ErrorAlert from 'components/ErrorAlert'
import ForumCategoriesListItem from './ForumCategoriesListItem'
import Modal from './Modal'
class ForumCategoriesList extends React.Component {
  static propTypes = {
    forumCategoriesGet: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      loaded: PropTypes.bool.isRequired,
      data: PropTypes.object,
      error: PropTypes.any
    }),
    forumCategoriesGetRequest: PropTypes.func.isRequired,
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
      isOpen: false
    }
  }

  componentWillMount () {
    this.props.forumCategoriesGetRequest()
  }

  renderCategories () {
    const { forumCategoriesGet: { data }, userGet } = this.props

    return _.map(
      data.formattedData,
      (item) =>
        <ForumCategoriesListItem 
          key={item.id} 
          category={item}
          userRole={userGet.data.data.relationships.roles.data[0].id}
          userInfo={userGet.data.data.attributes}
        />)
  }
  
  showModal() {
    this.setState({isModalOpen:  true})
  }

  close() {
    this.setState({isModalOpen: false})
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render () {
    const { forumCategoriesGet, userGet } = this.props
    const userRole = userGet.data.data.relationships.roles.data[0].id
    if (forumCategoriesGet.loading && !forumCategoriesGet.data) {
      return <LoadingIndicator type='spinner' />
    } else if (forumCategoriesGet.error) {
      return <ErrorAlert error={forumCategoriesGet.error} />
    } else if (forumCategoriesGet.loaded || forumCategoriesGet.data) {
      return <div className="col-sm-12">
        {
          // user role is Admin
          userRole == 2 ? 
            <button className="btn btn-danger" style={{float: 'right'}} onClick={this.toggleModal}>Create New Caterory</button>
          : null
        }        
        <ul className='forumCategoryList_list'>
          {this.renderCategories()}
        </ul>
        <Modal show={this.state.isOpen}
          onClose={this.toggleModal}>         
        </Modal>
      </div>
    }

    return null
  }
}

export default ForumCategoriesList
