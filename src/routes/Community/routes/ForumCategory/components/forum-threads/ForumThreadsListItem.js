import { Link } from 'react-router'
import { forumThreadUrl, contactMyCoachUrl } from 'routes/urlGenerators'
import Avatar from 'components/Avatar'
import {FaThumbTack, FaLock} from 'react-icons/lib/fa'
import {TiPinOutline} from 'react-icons/lib/ti'
import {forumThreadPinPatchRequest } from '../../reducers/forumThreadsGet'
import './ForumThreadsList.scss'

class ForumThreadsListItem extends React.Component {
  static propTypes = {
    categoryId: PropTypes.string.isRequired,
    item: PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
      reply_count: PropTypes.number,
      views: PropTypes.views,
      last_activity_at: PropTypes.string
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      checkedPin: false,
      arrs: []
    }       
  }
  
  checkedItem() {
    this.props.dispatch(forumThreadPinPatchRequest(this.props.categoryId, this.props.item.id, this.props.item))  
  }

  showMembership() {
    this.props.showMembership()
  }
  render () {
    const { item, categoryId, userInfo, selectedCategory } = this.props
    const {checkedPin, isOpenMembership} = this.state
    const lastActivity = moment(item.last_activity_at).calendar(null, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'MM/DD/YYYY'
    })
    const basicMembership = userInfo['has-iifym-basic']
    const proMembership = userInfo['has-iifym-pro']
    const fitnessCoaching = userInfo['has-fitness-coaching']
    const is_pro = selectedCategory.data.data.attributes.is_pro
    console.log(basicMembership, proMembership, fitnessCoaching, is_pro)
    const totalPage = Math.ceil(item.reply_count / 20)
    const userRole = localStorage.getItem('role')

    return <li className='forumThreads_item'>
      <div className='post'>
        <div className='left-wrap'>
          <div className="thread-content" >
            <div className="pin-icon">
              {
                userRole == 2 ?
                  item.sticky == true ? < FaThumbTack onClick={this.checkedItem.bind(this)}/> : <TiPinOutline onClick={this.checkedItem.bind(this)}/>
                : null
              }
              
            </div>
            <div className='user-image'>            
              <Avatar image={item.author.attributes.avatar} size='small' />
            </div>
            <div className='title-desc'>
              {
                is_pro && (!basicMembership && !proMembership) ?                  
                  <span onClick={this.showMembership.bind(this)}><h2>{item.title}</h2></span>                 
                : <Link to={forumThreadUrl(categoryId, item.id, totalPage )}>
                    <h2>{item.title}</h2>
                  </Link>
              }
                          
              <p style={{padding: 5, fontSize: 13}}>{item.content.length > 140 ? item.content.substring(0, 140) + "..." : item.content}</p>
              <p>
                <span className='name'>{item.author.attributes.first_name} {item.author.attributes.last_name},</span>
                {' ' + moment(item.created_at).format('lll')}
              </p>
            </div>
          </div>
          {
            item.locked ?
              <FaLock size={30} color="red" style={{marginRight: 15}}/>
            : null
          }
          
        </div>
        <div className='right-wrap'>
          <div className='item-wrap'>
            <div className='replies-wrap'>
              <p className='replies'>Replies:<span className='lgrey'>{item.reply_count}</span></p>
              <p className='views'>Views:<span className='lgrey'>{item.views}</span></p>
            </div>
            <div className='activity-wrap'>
              <div className='words'>
                <p className='user'>
                  {
                    item.last_reply
                    ? `${item.last_reply.author.attributes.first_name} ${item.last_reply.author.attributes.last_name}`
                    : `${item.author.attributes.first_name} ${item.author.attributes.last_name}`
                  }
                </p>
                <p className='date-time'>{lastActivity}</p>
              </div>
              <div className='img-wrap'>
                <Avatar
                  image={item.last_reply ? item.last_reply.author.attributes.avatar : item.author.attributes.avatar}
                  size='small' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  }
}

function mapDispatchToProps(dispatch) {
  return {dispatch}
}

export default ReactRedux.connect(mapDispatchToProps)(ForumThreadsListItem)
