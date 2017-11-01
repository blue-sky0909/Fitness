import { connect } from 'react-redux'
import PaidContent from 'components/membership/PaidContent'

const mapDispatchToProps = (dispatch) => ({})

const mapStateToProps = (state) => ({
  userGet: state.userGet
})

export default connect(mapStateToProps, mapDispatchToProps)(PaidContent)
