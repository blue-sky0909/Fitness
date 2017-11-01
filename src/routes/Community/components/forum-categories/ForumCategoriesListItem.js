import './ForumCategoriesListItem.scss'
import { Link } from 'react-router'
import { forumCategoryUrl, contactMyCoachUrl } from 'routes/urlGenerators'
import {FaPencil, FaTrashO} from 'react-icons/lib/fa'
import Modal from './Modal'
import {forumDeleteCategory} from '../../reducers/forumCategoriesGet'

const ReactToastr = require("react-toastr");
const {ToastContainer} = ReactToastr; 
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class ForumCategoriesListItem extends React.Component {
  static propTypes = {
    category: PropTypes.shape({
      id: PropTypes.any.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      is_pro: PropTypes.bool,
      thread_count: PropTypes.any,
      order_placement: PropTypes.number
    })
  }
  
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
    this.deleteCateory = this.deleteCateory.bind(this)
  }

  close() {
    this.setState({isModalOpen: false})
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  deleteCateory(id) {
    console.log(id)
    this.props.dispatch(forumDeleteCategory(id))  
		
    this.refs.message.success(
    "",
    "Category is deleted successfully", {
      timeOut: 5000,
      extendedTimeOut: 5000
    });
	
  }

  render () {
    const { category: { id, title, description, thread_count, is_pro }, userRole, userInfo } = this.props
    /* eslint-disable */
    const threadCount = thread_count
    const basicMembership = userInfo['has-iifym-basic']
    const proMembership = userInfo['has-iifym-pro']
    const fitnessCoaching = userInfo['has-fitness-coaching']
    /* eslint-enable */
    return <li className='forumCategory_post'>
      <ToastContainer ref="message"
						toastMessageFactory={ToastMessageFactory}
						className="toast-top-right" />
      <div className='post'>
        <div className="category"> 
          <div className='category-title'>
            <Link to={forumCategoryUrl(id)}>
              <h2>{title}</h2>
            </Link>
            {
              userRole == 2 ?
                <div className="icons">
                  <span><FaPencil onClick={this.toggleModal}/></span>
                  <span><FaTrashO onClick={this.deleteCateory.bind(this, id)}/></span>
                </div> 
              : null
            }                           
          </div>               
          {/* {
            //user membership
            (basicMembership || proMembership || fitnessCoaching) ?          
              <div className='category-title'>
                <Link to={forumCategoryUrl(id)}>
                  <h2>{title}</h2>
                </Link>
                {
                  userRole == 2 ?
                    <div className="icons">
                      <span><FaPencil onClick={this.toggleModal}/></span>
                      <span><FaTrashO onClick={this.deleteCateory.bind(this, id)}/></span>
                    </div> 
                  : null
                }
                            
              </div>          
            : 
            <div className='category-title'>
              {
                  (is_pro != true) ?
                    <Link to={forumCategoryUrl(id)}>
                      <h2>{title}</h2>
                    </Link>
                  : <Link to={contactMyCoachUrl()}>
                      <h2>{title}</h2>
                    </Link>
              }
                
                {
                  userRole == 2 ?
                    <div className="icons">
                      <span><FaPencil onClick={this.toggleModal}/></span>
                      <span><FaTrashO onClick={this.deleteCateory.bind(this, id)}/></span>
                    </div>
                  : null
                }
              </div>          
          }  */}
          
          <div className='category-description'>
            <p>
              {description}            
            </p>
          </div>
        </div>
        <div className='category-counts'>
          
          {
            is_pro ?
              <span className="category-pro-access">PREMIUM</span>
            : null
          }
          
          <p>{threadCount} Topics</p>
        </div>
        <Modal show={this.state.isOpen}
          onClose={this.toggleModal}
          title={title}
          id={id}
          description={description}>
        </Modal>
      </div>
    </li>
  }
}

function mapDispatchToProps(dispatch) {
  return{
    dispatch
  }
}

export default ReactRedux.connect(mapDispatchToProps)(ForumCategoriesListItem)
