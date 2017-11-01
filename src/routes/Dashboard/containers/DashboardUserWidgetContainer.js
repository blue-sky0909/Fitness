import { connect } from 'react-redux'
import DashboardUserWidget from '../components/DashboardUserWidget'

const mapDispatchToProps = (dispatch) => ({
})

const mapStateToProps = (state) => ({
  userGet: state.userGet
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardUserWidget)
