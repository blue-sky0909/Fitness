import './TextArea.scss'

class TextInput extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    input: PropTypes.shape({
      value: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired
    }),
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
      warning: PropTypes.string
    })
  }

  render () {
    const { meta: { error, warning, touched }, input, label, placeholder } = this.props

    const inputClassnames = classnames('form-group', 'input-container', {
      'has-warning': warning,
      'has-error': error
    })

    return <div className={inputClassnames}>
      { label && <label className='control-label'>{label}</label> }
      <textarea className='form-control' rows='3' {...input} placeholder={placeholder} />
      { touched && error && <span className='help-block'>{error}</span> }
      { touched && warning && <span className='help-block'>{warning}</span> }
    </div>
  }
}

export default TextInput
