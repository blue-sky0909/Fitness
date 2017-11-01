import { connect } from 'react-redux'
import MealPlan from '../../components/meal-plan/MealPlan'
import { mealPlanGetRequest, getMealFoods } from '../../routes/EditMealPlan/reducers/mealPlanGet'
import { mealPlanCreate} from '../../routes/EditMealPlan/reducers/mealPlanCreate'
import { foodsAllGet, searchFoods } from '../../routes/EditMealPlan/reducers/foodsGet'
import { createMealFood, removeMealFood, mealFoodQuantity } from '../../routes/EditMealPlan/reducers/mealFoods'
import { saveMealTitle, saveMealPlanTitle } from '../../routes/EditMealPlan/reducers/mealTitleUpdate'
import { saveCalculator } from '../../routes/EditMealPlan/reducers/mealMarcoSet'
import { mealPlanMacrosGet } from '../../routes/EditMealPlan/reducers/mealPlanMacrosGet'
import { userGetRequest } from 'store/userGet'

const mapStateToProps = state => ({
  mealPlanGet: state.mealPlanGet,
  mealPlanCreate: state.mealPlanCreate,
  foodsGet: state.foodsGet,
  userGet: state.userGet,
  mealTitle: state.mealTitle,
  mealMarco: state.mealMarco
})

const mapDispatchToProps = dispatch => ({
  userGetRequest: () => dispatch(userGetRequest()),
  getMealPlan: mealPlanId => dispatch(mealPlanGetRequest(mealPlanId)),
  createMealPlan: () => dispatch(mealPlanCreate()),
  foodsAllGet: (pageNum) => dispatch(foodsAllGet(pageNum)),
  searchFoods: (name) => dispatch(searchFoods(name)),
  createMealFood: (mealPlans) =>dispatch(createMealFood(mealPlans)),
  removeMealFood: (mealFoodId) => dispatch(removeMealFood(mealFoodId)),
  saveMealTitle: (id, title, sort) => dispatch(saveMealTitle(id, title, sort)),
  saveMealPlanTitle: (id, title) => dispatch(saveMealPlanTitle(id, title)),
  getMealFoods: (id) => dispatch(getMealFoods(id)),
  mealFoodQuantity: (id, name) => dispatch(mealFoodQuantity(id, name)),
  saveCalculator: (val, index, mealPlanId) => dispatch(saveCalculator(val, index, mealPlanId)),
  mealPlanMacrosGet: (mealPlanId) => dispatch(mealPlanMacrosGet(mealPlanId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MealPlan)