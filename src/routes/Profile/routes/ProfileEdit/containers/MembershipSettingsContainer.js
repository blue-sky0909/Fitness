import { connect } from 'react-redux'
import { userGetRequest } from 'store/userGet'
import MembershipSettings from '../components/MembershipSettings'

const mapDispatchToProps = (dispatch) => ({
  userGetRequest: () => dispatch(userGetRequest())
})

const mapStateToProps = (state) => ({
  userGet: state.userGet
})

export default connect(mapStateToProps, mapDispatchToProps)(MembershipSettings)
