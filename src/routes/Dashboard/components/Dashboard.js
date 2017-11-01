import './Dashboard.scss'
import DashboardUserWidgetContainer from '../containers/DashboardUserWidgetContainer'
import OrdersGridContainer from '../containers/OrdersGridContainer'

class Dashboard extends React.Component {
  render () {
    return <div>
      <DashboardUserWidgetContainer />

      <section id='myOrders'>
        <div className='container'>
          <div className='col-md-12'>
            <h2>My Products</h2>
            <OrdersGridContainer />
          </div>
        </div>
      </section>
    </div>
  }
}

export default Dashboard
