import './MembershipSettings.scss'
import { Link } from 'react-router'
import { membershipPlansUrl } from 'routes/urlGenerators'

class MembershipSettings extends React.Component {
  static propTypes = {
    userGet: PropTypes.object.isRequired
  }

  render () {
    const { userGet } = this.props

    if (!userGet.data) return null

    const membership = userGet.data.data.attributes.membership

    return <section id='membershipSettings'>
      <h1>Membership</h1>

      <div>
        Your current plan is: {membership}
        <span> <Link to={membershipPlansUrl()}>Membership settings</Link></span>
      </div>
    </section>
  }
}

export default MembershipSettings
