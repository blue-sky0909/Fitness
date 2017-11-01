import './NewConversationPopup.scss'
import Popup from 'components/Popup'
import { contactMyCoachUrl } from 'routes/urlGenerators'
import ConversationForm from './ConversationForm'

class NewConversationPopup extends React.Component {
  static propTypes = {
    userGet: PropTypes.object.isRequired,
    conversationPostRequest: PropTypes.func.isRequired,
    messagePostRequest: PropTypes.func.isRequired,
    conversationsGetRequest: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }

  submit = data => {
    const { userGet, conversationPostRequest, messagePostRequest } = this.props
    let coachId = 211
    if(userGet.data.coach && userGet.data.coach.id) {
      coachId = userGet.data.coach.id
    }
    return conversationPostRequest(coachId, userGet.data.data.id, data)
      .then((response) => messagePostRequest(`${response.data.id}_new`, response.data.id, data.content))
  }

  onSubmitSuccess = data => {
    const { goBack, conversationsGetRequest } = this.props
    conversationsGetRequest()
    goBack()
  }

  render () {
    const { userGet } = this.props

  //  if (!userGet.data || !userGet.data.coach) return null

    return <Popup id='newConversationPopup' backUrl={contactMyCoachUrl()}>
      <h4 className='title'>Create new conversation</h4>
      <ConversationForm onSubmit={this.submit} onSubmitSuccess={this.onSubmitSuccess} />
    </Popup>
  }
}

export default NewConversationPopup
