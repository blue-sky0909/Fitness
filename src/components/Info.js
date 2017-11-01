import './Info.scss'

class Info extends React.Component {
  static propTypes = {
    message: PropTypes.string,
    className: PropTypes.string
  }

  render () {
    const { message, className } = this.props

    return <div className={classnames('alert alert-success', className)}>
      {message}
    </div>
  }
}

export default Info
