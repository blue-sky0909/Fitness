import './ContactMyCoach.scss'
import MyCoachContainer from '../containers/MyCoachContainer'
import ConversationsContainer from '../containers/ConversationsContainer'
import PaidContentContainer from 'containers/PaidContentContainer'

class ContactMyCoach extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }

  render () {
    return <PaidContentContainer requiredPlan='basic'>
      <section id='contactMyCoach' >
        <div className='container'>
          <MyCoachContainer />  
          <ConversationsContainer /> 
        </div>
        {this.props.children}
      </section>
    </PaidContentContainer>
  }
}

export default ContactMyCoach
