import { apiHelper } from 'utils'
import { addMealFoods } from './mealFoodsQuantities'

// ------------------------------------
// Constants
// ------------------------------------
export const MEAL_GET_REQUEST_STARTED = 'MEAL_GET_REQUEST_STARTED'
export const MEAL_GET_REQUEST_SUCCESS = 'MEAL_GET_REQUEST_SUCCESS'
export const MEAL_GET_REQUEST_FAILURE = 'MEAL_GET_REQUEST_FAILURE'
export const MEAL_ADD_FOOD = 'MEAL_ADD_FOOD'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: MEAL_GET_REQUEST_STARTED
  }
}

export function requestSuccess (json) {
  return {
    type: MEAL_GET_REQUEST_SUCCESS,
    data: json
  }
}

export function requestFailure (error) {
  return {
    type: MEAL_GET_REQUEST_FAILURE,
    error: error
  }
}

export function addFoodToMeal (food) {
  return {
    type: MEAL_ADD_FOOD,
    food
  }
}

export function mealGetRequest (mealId) {
  return (dispatch) => {
    dispatch(requestStarted())
    return apiHelper.authorizedRequest('GET', `meals/${mealId}`, {})
      .then(json => {
        json.formattedData = {}
        if (json.included.length > 1) {
          json.formattedData.foods = _.filter(json.included, item => item.type === 'foods')
            .map(food => ({ id: food.id, ...food.attributes }))
          json.formattedData.foodsAttrs = _.filter(json.included, item => item.type === 'meal_foods')
            .map(meal => ({
              ...meal.attributes,
              mealFoodId: meal.id
            }))
        }
        dispatch(requestSuccess(json))
        const foodsQts = json.formattedData.foodsAttrs.map(food => ({
          id: food.food,
          qty: +food.quantity
        }))
        dispatch(addMealFoods(foodsQts))
      }).catch(json => {
        dispatch(requestFailure(json))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MEAL_GET_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: null
  }),
  [MEAL_GET_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [MEAL_GET_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: false,
    error: action.error,
    data: null
  }),
  [MEAL_ADD_FOOD]: (state, action) => Object.assign({}, state, {
    data: {
      formattedData: {
        foods: [
          ...state.data.formattedData.foods,
          action.food
        ]
      }
    }
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loaded: false,
  loading: false,
  error: null,
  data: null
}
export default function dayMealsGetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
