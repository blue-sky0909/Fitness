import HeaderMenu from '../components/navigation/HeaderMenu'
// import { browserHistory } from 'react-router'

const mapDispatchToProps = (dispatch) => ({
})

const mapStateToProps = (state) => ({
  userGet: state.userGet
})

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(HeaderMenu)
