import Authorized from '../components/Authorized'
import { browserHistory } from 'react-router'
import { loginUrl } from 'routes/urlGenerators'
import { userGetRequest } from 'store/userGet'

const mapDispatchToProps = (dispatch) => ({
  userGetRequest: () => dispatch(userGetRequest()),
  goToLoginPage: () => browserHistory.push(loginUrl())
})

const mapStateToProps = (state) => ({
  userGet: state.userGet
})

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Authorized)
