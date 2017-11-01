import './MainLayout.scss'

class MainLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render () {
    const { children } = this.props

    return <div>
      {children}
    </div>
  }
}

export default MainLayout
