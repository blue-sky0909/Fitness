import './Profile.scss'
import { Link } from 'react-router'
import { profileEditUrl } from 'routes/urlGenerators'
import Button from 'components/controls/Button'

class Profile extends React.Component {
  render () {
    return <section id='profile' >
      <div className='container' >
        <h1>Profile</h1>
        <Link to={profileEditUrl()} >
          <Button appearance='bordered' color='red'>
            Edit Profile
          </Button>
        </Link>
      </div>
    </section>
  }
}

export default Profile
