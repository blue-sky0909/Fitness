import { connect } from 'react-redux'
import { loginRequest } from '../reducers/login'
import { browserHistory } from 'react-router'
import { dashboardUrl } from 'routes/urlGenerators'
import Login from '../components/Login'

const mapDispatchToProps = (dispatch) => ({
  loginRequest: (data) => dispatch(loginRequest(data)),
  goToDashboard: () => browserHistory.push(dashboardUrl())
})

const mapStateToProps = (state) => ({
  login: state.login
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
