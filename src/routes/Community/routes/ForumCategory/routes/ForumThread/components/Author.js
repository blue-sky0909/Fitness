import './Author.scss'
import Avatar from 'components/Avatar'

class Author extends React.Component {
  static propTypes = {
    author: PropTypes.object.isRequired
  }

  render () {
    const { author } = this.props
    const userId = localStorage.getItem('userId')
    const userRole = localStorage.getItem('role')
    return <div className='author'>
      {
        userRole == 2 ?
          <div className='user-level'>
            <p className='level'>Admin</p>
          </div>
        : null

      }      
      <Avatar size='normal' image={author.attributes.avatar} />
      <h5>
        {author.attributes.first_name} {author.attributes.last_name}
      </h5>
      {
        author.attributes.posts_count ?
          <div className='date-joined'>
            <span className='joined'>JOINED:</span>
            <span className='date'>{moment(author.attributes.created_at).format('YYYY')}</span>
            <span className='posts'>POSTS:</span>
            <span className='post-num'>{author.attributes.posts_count? author.attributes.posts_count : 0 }</span>        
          </div>
        : <div className='date-joined'>
            <span className='joined'>JOINED:</span>
            <span className='date'>{moment(author.attributes.created_at).format('YYYY')}</span>                    
          </div>
      }
      
    </div>
  }
}

export default Author
