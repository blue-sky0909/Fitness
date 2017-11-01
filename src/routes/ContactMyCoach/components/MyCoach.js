import './MyCoach.scss'
import Avatar from 'components/Avatar'
import { Link } from 'react-router'
import { newConversationUrl } from 'routes/urlGenerators'

class MyCoach extends React.Component {
  static propTypes = {
    userGet: PropTypes.object.isRequired
  }

  render () {
    const { userGet } = this.props
    console.log(userGet)
  //  if (!userGet.data || !userGet.data.coach) return null

    return <div className='row' id='myCoach'>
      {/* <div className='col-md-2'>
        <div className='user-image'>
          <Avatar image={userGet.data.coach.attributes.avatar} size='big' />
        </div>
      </div>
      <div className='col-md-7'>
        <div className='name-wrap'>
          <h1>My Coach</h1>
          <p>{userGet.data.coach.attributes['first-name']} {userGet.data.coach.attributes['last-name']}</p>
        </div>
      </div> */}
      <Link to={newConversationUrl()} className='new-conversation' href='#'>New Conversation</Link>
    </div>
  }
}

export default MyCoach
