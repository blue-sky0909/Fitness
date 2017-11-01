import { showMetric } from '../../../actions/progressBar'
import { orderGetRequest } from '../../../../OrderDetails/reducers/orderGet'

class ProgressBar extends React.Component {

  constructor ( props ) {
    super(props)

    this.toggleClass = this.toggleClass.bind(this)
    this.state = { activeIndex: 0 }
  }

  toggleClass ( index, e ) {

    const should_dispach = this.state.activeIndex !== index

    this.setState({ activeIndex: index })
    if ( should_dispach ) {
      if ( index === 1 ) {
        this.props.showMetric(true)
      } else {
        this.props.showMetric(false)
      }

    }

  }

  componentWillMount () {
    const orderId = localStorage.getItem('orderId')
    this.props.orderGetRequest(orderId)
    this.setState({ orderId: orderId })
  }

  componentDidMount () {
    const orderGet = _.filter(this.props.orderGet[ this.state.orderId ].data.included, function ( item ) {
      return item.type == 'infos'
    })
    if ( orderGet.length > 0 ) {

      const unit_system = _.find(orderGet, function ( item ) {
        return item.attributes.key === 'unit_system'
      })
      if ( unit_system ) {
        const value = unit_system.attributes.value
        if ( value === 'metric' ) {
          this.props.showMetric(true)
          this.setState({ activeIndex: 1 })
        }
      }
    } else {
      const cached_value = this.props.showMetricValue
      if ( cached_value ) {
        this.props.showMetric(true)
        this.setState({ activeIndex: 1 })
      }
    }
  }

  render () {
    return (
      <div className="progress-bar-wrap">
        <div className="text-wrap">
          <p className="personal-details"><span className="progress-number">{this.props.pageNum}/4</span> Enter your personal details</p>
        </div>
        <div className="imperial-metric-selection">
          <div className={this.state.activeIndex == 0 ? 'selection active' : 'selection'} onClick={this.toggleClass.bind(this, 0)}>
            <p>Imperial</p>
          </div>
          <div className={this.state.activeIndex == 1 ? 'selection active' : 'selection'} onClick={this.toggleClass.bind(this, 1)}>
            <p>Metric</p>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps ( dispatch ) {
  return {
    showMetric: ( value ) => dispatch(showMetric(value)),
    orderGetRequest: ( orderId ) => dispatch(orderGetRequest(orderId)),
  }
}

const mapStateToProps = ( state ) => ({
  orderGet: state.orderGet,
  showMetricValue: state.progressBarReducer.flag
})

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ProgressBar)
