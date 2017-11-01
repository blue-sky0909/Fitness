import { connect } from 'react-redux'
import MealItem from '../../components/meal-plan/MealItem'
import { mealGetRequest } from '../../routes/EditMealPlan/reducers/mealGet'
import { mealFoodQtyChange } from '../../routes/EditMealPlan/reducers/mealFoodsQuantities'

const mapStateToProps = state => ({
  foodsData: state.mealGet,
  foodsQtys: state.mealFoodsQuantities
})

const mapDispatchToProps = dispatch => ({
  getMealFood: mealId => dispatch(mealGetRequest(mealId)),
  changeMealFoodQty: (foodId, qty) => dispatch(mealFoodQtyChange(foodId, qty))
})

export default connect(mapStateToProps, mapDispatchToProps)(MealItem)