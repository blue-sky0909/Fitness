import { connect } from 'react-redux'
import MealPlansList from '../components/MealPlansList'
import { mealPlansGetRequest } from '../reducers/mealPlansGet'
import { mealPlanDeleteRequest } from '../reducers/mealPlanDelete'
import { userGetRequest } from 'store/userGet'

const mapStateToProps = state => ({
  mealPlansGet: state.mealPlansGet,
  userGet: state.userGet
})

const mapDispatchToProps = dispatch => ({
  getMealPlans: () => dispatch(mealPlansGetRequest()),
  deleteMealPlan: (id) => dispatch(mealPlanDeleteRequest(id)),
  userGetRequest: () => dispatch(userGetRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(MealPlansList)