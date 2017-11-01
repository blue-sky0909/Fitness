import Header from '../components/header/Header'
// import { browserHistory } from 'react-router'

const mapDispatchToProps = (dispatch) => ({
})

const mapStateToProps = (state) => ({
  userGet: state.userGet
})

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Header)
