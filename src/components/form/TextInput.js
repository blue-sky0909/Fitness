import './TextInput.scss'

class TextInput extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    type: PropTypes.oneOf(['text', 'password']),
    placeholder: PropTypes.string,
    input: PropTypes.shape({
      value: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired
    }),
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
      warning: PropTypes.string
    }),
    className: PropTypes.string
  }

  render () {
    const { meta: { error, warning, touched }, input, label, placeholder, type, className } = this.props

    const inputClassnames = classnames('input-container', {
      'has-warning': warning,
      'has-error': error
    }, className)

    return <div className={inputClassnames}>
      <label className='control-label'>{label}</label>
      <input type={type} placeholder={placeholder} {...input} />
      { touched && error && <span className='help-block'>{error}</span> }
      { touched && warning && <span className='help-block'>{warning}</span> }
    </div>
  }
}

export default TextInput
