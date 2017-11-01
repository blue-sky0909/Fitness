import {Link } from 'react-router';
import { orderDetailsUrl } from '../../../../urlGenerators'

class CompleteButton extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      orderId: localStorage.getItem('orderId')
    }
  }
  render() {
    localStorage.setItem('flag', false)
    return (
      <div className="button-wrap complete">
        {/* The link will obviously need to be changed. This will include form submission as well */}
         <Link to={orderDetailsUrl(this.state.orderId)}>{this.props.label}</Link> 
      </div>
    )
  }
  
}

export default CompleteButton;