import { Link } from 'react-router'
import { createMealPlanUrl, contactMyCoachUrl } from 'routes/urlGenerators'
import MealPlansListTable from './MealPlansListTable'
import LoadingIndicator from 'components/LoadingIndicator'
import ErrorAlert from 'components/ErrorAlert'
import PlansContainer from 'containers/PlansContainer'

const ReactToastr = require("react-toastr");
const { ToastContainer } = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

export default class MealPlansList extends React.Component {
  static propTypes = {
    mealPlansGet: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      loaded: PropTypes.bool.isRequired,
      data: PropTypes.object,
      error: PropTypes.any
    }),
    getMealPlans: PropTypes.func.isRequired,
    deleteMealPlan: PropTypes.func.isRequired,
    userGetRequest: PropTypes.func,
    userGet: PropTypes.shape({
      loaded: PropTypes.bool,
      loading: PropTypes.bool,
      error: PropTypes.any,
      data: PropTypes.object
    })
  }

  constructor() {
    super()
    this.removeMealPlan = this.removeMealPlan.bind(this)
  }

  componentWillMount() {
    this.props.getMealPlans()
  }

  removeMealPlan(mealPlanId) {
    this.props.deleteMealPlan(mealPlanId)
    this.refs.message.success(
      "",
      "This meal plan has been deleted", {
        timeOut: 2000,
        extendedTimeOut: 2000
      }); 

  }
  
  render() {
    const { mealPlansGet, userGet } = this.props
    console.log(mealPlansGet)
    const coach = userGet.data.data.attributes['has-fitness-coaching']
    const pro_membership = userGet.data.data.attributes['has-iifym-pro']
    const basic_membership = userGet.data.data.attributes['has-iifym-basic']
    if(pro_membership || basic_membership) {
      if (mealPlansGet.loading && !mealPlansGet.data) return <LoadingIndicator type='spinner' />

      if (mealPlansGet.error) return <ErrorAlert error={mealPlansGet.error} />

      if (mealPlansGet.loaded) return (
        <div className='container'>
          <div className='panel mealplans-list'>
            <div className='panel-header container-fluid clearfix'>
              <h2 className='panel-title'>My Mealplans</h2>
              <Link to={createMealPlanUrl()}>
                <span className='create-mealplan-btn'>Create New Mealplan</span>
              </Link>
            </div>
            <div className='panel-body'>
              {
                mealPlansGet.data.formattedData.length ? (
                  <MealPlansListTable
                    mealPlans={mealPlansGet.data.formattedData}
                    onDeleteItem={this.removeMealPlan} />
                ) : (
                  <div className='no-meal-plans text-center'><strong>No meal plans yet</strong></div>
                )
              }
            </div>
          </div>
          {
            coach || pro_membership ?
              null
            : <div className='panel coach-mealplans-list'>
                <div className='panel-header container-fluid clearfix'>
                  <h2 className='panel-title'>Coach Created Mealplans</h2>
                </div>
                <div className='panel-body'>
                  <div className='info-text'>
                    It appears that you do not have a coach to create a mealplan<br />
                    for you. Click the button below to get one now!
                  </div>
                  <div className='text-center'>
                    <Link to={contactMyCoachUrl()}>
                      <span className='get-coach-btn'>Get a Coach</span>
                    </Link>
                  </div>
                </div>
              </div>

          }

          <ToastContainer ref="message"
            toastMessageFactory={ToastMessageFactory}
            className="toast-top-right" />
        </div>
      )

      return null
    } else {
      return <PlansContainer />
    }

  }
}