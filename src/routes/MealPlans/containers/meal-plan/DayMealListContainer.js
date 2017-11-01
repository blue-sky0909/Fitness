import { connect } from 'react-redux'
import DayMealList from '../../components/meal-plan/DayMealList'
import { dayMealsGetRequest } from '../../routes/EditMealPlan/reducers/dayMealsGet'
import { addFoodToMeal } from '../../routes/EditMealPlan/reducers/mealGet'
import { foodsGetRequest } from '../../routes/EditMealPlan/reducers/foodsGet'
import { searchFoodsRequest, resetSearchResults } from '../../routes/EditMealPlan/reducers/foodsSearchGet'
import { addMealFoodQty } from '../../routes/EditMealPlan/reducers/mealFoodsQuantities'

const mapStateToProps = state => ({
  dayMealsGet: state.dayMealsGet,
  foodsGet: state.foodsGet,
  foodsSearchGet: state.foodsSearchGet
})

const mapDispatchToProps = dispatch => ({
  getDayMeals: dayId => dispatch(dayMealsGetRequest(dayId)),
  getFoods: page => dispatch(foodsGetRequest(page)),
  searchFoods: (query, page) => dispatch(searchFoodsRequest(query, page)),
  resetSearch: () => dispatch(resetSearchResults()),
  addFoodToMeal: food => dispatch(addFoodToMeal(food)),
  addMealFoodQty: (foodId, qty) => dispatch(addMealFoodQty(foodId, qty))
})

export default connect(mapStateToProps, mapDispatchToProps)(DayMealList)