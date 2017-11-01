import PlansContainer from 'containers/PlansContainer'

class PaidContent extends React.Component {
  static propTypes = {
    userGet: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired,
    requiredPlan: PropTypes.oneOf(['basic', 'advanced']).isRequired
  }

  render () {
    const { userGet, children, requiredPlan } = this.props

    if (!userGet.data) return null

    const userPlan = userGet.data.data.attributes.membership
    const fitnessCoaching = userGet.data.data.attributes['has-fitness-coaching']
    const proPlan = userGet.data.data.attributes['has-iifym-pro']

    if (fitnessCoaching || proPlan) return children

    return <PlansContainer />
  }
}

export default PaidContent
