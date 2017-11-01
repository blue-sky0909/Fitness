import './LoadingIndicator.scss'

class LoadingIndicator extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['spinner', 'small-spinner', 'grid']),
    className: PropTypes.string
  }

  render () {
    const { type, className } = this.props

    if (type === 'spinner') {
      return <div className={classnames('spinner', className)} />
    } else if (type === 'small-spinner') {
      return <div className={classnames('small-spinner', className)} />
    } else if (type === 'grid') {
      return <div className={classnames('loading-indicator_grid', className)} >
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    }
  }
}

export default LoadingIndicator
