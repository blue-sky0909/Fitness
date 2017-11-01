// ------------------------------------
// Constants
// ------------------------------------
export const MEAL_FOOD_ADD = 'MEAL_FOOD_ADD'
export const MEAL_FOODS_ADD = 'MEAL_FOODS_ADD'
export const MEAL_FOOD_QTY_CHANGE = 'MEAL_FOOD_QTY_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------

export function addMealFoodQty (foodId, qty) {
  return {
    type: MEAL_FOOD_ADD,
    foodId,
    qty
  }
}

export function addMealFoods (foods) {
  return {
    type: MEAL_FOODS_ADD,
    foods
  }
}

export function mealFoodQtyChange (foodId, qty) {
  return {
    type: MEAL_FOOD_QTY_CHANGE,
    foodId,
    qty
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MEAL_FOOD_ADD]: (state, action) => ({
    ...state,
    data: [
      ...state.data,
      {
        id: action.foodId,
        qty: action.qty
      }
    ]
  }),
  [MEAL_FOODS_ADD]: (state, action) => ({
    ...state,
    data: [...action.foods]
  }),
  [MEAL_FOOD_QTY_CHANGE]: (state, action) => ({
    ...state,
    data: state.data.map(food => food.id == action.foodId ?
      { ...food, qty: action.qty } :
      food
    )
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: []
}
export default function dayMealsGetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
