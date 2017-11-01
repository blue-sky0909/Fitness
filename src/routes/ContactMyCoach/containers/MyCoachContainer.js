import { connect } from 'react-redux'
import MyCoach from '../components/MyCoach'

const mapDispatchToProps = (dispatch) => ({
})

const mapStateToProps = (state) => ({
  userGet: state.userGet
})

export default connect(mapStateToProps, mapDispatchToProps)(MyCoach)
