import { apiHelper } from 'utils'

export const MEAL_FOOD_CREATE_SUCCESS = 'MEAL_FOOD_CREATE_SUCCESS'
export const MEAL_FOOD_CREATE_FAILURE = 'MEAL_FOOD_CREATE_FAILURE'

export function createMealFoodSuccess (json) {
  return {
    type: MEAL_FOOD_CREATE_SUCCESS,
    data: json
  }
}

export function requestFailure (error) {
  return {
    type: MEAL_FOOD_CREATE_FAILURE,
    error: error
  }
}

export function createMealFood(mealInfos) {
  return(dispatch) => {
    return apiHelper.authorizedRequest('POST', 'meal_foods', {
      body: {
        "data": {
          "type": "meal_foods",
          "attributes": {
            "food": mealInfos.id,
            "meal": mealInfos.mealId,
            "quantity": parseFloat(mealInfos['most-used-serving']),
            "measurement": "Volume"
          }
        } 
      }
    })
    .then(json => {
      let meals
      json.formattedData = {
        data: {
          id: json.data.id,
          ...json.data.attributes
        },
        meals
      }
      console.log(json)
      dispatch(createMealFoodSuccess(json))
      return json
    }).catch(json => {
      dispatch(requestFailure(json))
      return false
    })
  }
}

export function removeMealFood(id) {
  return(dispatch) => {
    return apiHelper.authorizedRequest('DELETE', `meal_foods/${id}`, {})
    .then(json => {
      return true
    }).catch(json => {
      dispatch(requestFailure(json))
      return false
    })
  }
}

export function mealFoodQuantity(id, quantity) {
  return(dispatch) => {
    return apiHelper.authorizedRequest('PATCH', `meal_foods/${id}`, {
      body: {
        "data": {
          "type": "meal_foods",
          "attributes": {
            "quantity": quantity
          }
        }  
      }
    })
    .then(json => {
      return true
    }).catch(json => {
      dispatch(requestFailure(json))
      return false
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MEAL_FOOD_CREATE_FAILURE]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: false,
    error: action.error,
    data: null
  }),
  [MEAL_FOOD_CREATE_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
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
export default function mealFoodsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
