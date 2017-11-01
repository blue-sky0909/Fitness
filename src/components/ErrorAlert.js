class ErrorAlert extends React.Component {
  static propTypes = {
    error: PropTypes.any
  }

  render () {
    let error = this.props.error
    if (error.errors) {
      error = error.errors[0].description
    }

    return <div>
      Error: {error}
    </div>
  }
}

export default ErrorAlert
