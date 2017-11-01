import './Button.scss'

class Button extends React.Component {
  static propTypes = {
    appearance: PropTypes.oneOf(['bordered', 'simple', 'with-background']),
    color: PropTypes.oneOf(['red', 'grey', 'light-grey', 'white']),
    size: PropTypes.oneOf(['normal', 'big']),
    rounded: PropTypes.bool,
    layout: PropTypes.oneOf(['normal', 'block']),
    className: PropTypes.string,
    children: PropTypes.any
  }

  render () {
    const { appearance, color, size, rounded, layout, className, children, ...other } = this.props

    const buttonClass =
      classnames(className, 'button_button', 'button_' + appearance,
        'button_' + color, 'button_' + size, `button_${rounded ? 'rounded' : ''}`, 'button_' + layout)

    return <button className={buttonClass} {...other} >
      {children}
    </button>
  }
}

export default Button
