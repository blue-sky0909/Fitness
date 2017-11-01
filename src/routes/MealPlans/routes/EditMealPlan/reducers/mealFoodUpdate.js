import { apiHelper } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const MEAL_FOOD_UPDATE_REQUEST_STARTED = 'MEAL_FOOD_UPDATE_REQUEST_STARTED'
export const MEAL_FOOD_UPDATE_REQUEST_SUCCESS = 'MEAL_FOOD_UPDATE_REQUEST_SUCCESS'
export const MEAL_FOOD_UPDATE_REQUEST_FAILURE = 'MEAL_FOOD_UPDATE_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: MEAL_FOOD_UPDATE_REQUEST_STARTED
  }
}

export function requestSuccess (json) {
  return {
    type: MEAL_FOOD_UPDATE_REQUEST_SUCCESS,
    data: json
  }
}

export function requestFailure (error) {
  return {
    type: MEAL_FOOD_UPDATE_REQUEST_FAILURE,
    error: error
  }
}

export function mealFoodUpdateRequest (foodId) {
  return (dispatch) => {
    dispatch(requestStarted())
    return apiHelper.authorizedRequest('PATCH', `meal_foods/${foodId}`, {
      "data": {
        "id":"365402",
        "attributes": {
          "food":929,
          "meal":63464,
          "quantity":6
        },
        "relationships": {
          "food-local": {
            "data": {
              "type":"foods","id":"929"
            }
          },
          "meal-local": {
            "data": {
              "type":"meals",
              "id":"63464"
            }
          }
        },
        "type":"meal-foods"
      }
    })
      .then(json => {
        json.formattedData = {
          ...json.data.attributes
        }
        dispatch(requestSuccess(json))
      }).catch(json => {
        dispatch(requestFailure(json))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MEAL_FOOD_UPDATE_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: null
  }),
  [MEAL_FOOD_UPDATE_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [MEAL_FOOD_UPDATE_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: false,
    error: action.error,
    data: null
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
