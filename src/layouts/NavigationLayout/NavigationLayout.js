import './NavigationLayout.scss'
import HeaderContainer from 'containers/HeaderContainer'
import HeaderMenuContainer from 'containers/HeaderMenuContainer'

class MainLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render () {
    const { children } = this.props

    return <div>

      <HeaderContainer />

      <HeaderMenuContainer />

      <main>
        {children}
      </main>
    </div>
  }
}

export default MainLayout
