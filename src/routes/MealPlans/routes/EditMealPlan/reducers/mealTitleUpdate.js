import { apiHelper } from 'utils'

export const UPDATE_MEAL_TITLE_SUCCESS = 'UPDATE_MEAL_TITLE_SUCCESS'
export const UPDATE_MEAL_TITLE_FAILURE = 'UPDATE_MEAL_TITLE_FAILURE'
export const UPDATE_MEAL_PLAN_TITLE_SUCCESS = 'UPDATE_MEAL_PLAN_TITLE_SUCCESS'
export const UPDATE_MEAL_PLAN_TITLE_FAILURE = 'UPDATE_MEAL_PLAN_TITLE_FAILURE'

export function updateMealTitleSuccess(res) {
  return {
    type: UPDATE_MEAL_TITLE_SUCCESS,
    data: res
  }
}

export function updateMealTitleFailure(error) {
  return {
    type: UPDATE_MEAL_TITLE_FAILURE,
    error: error
  }
}

export function updateMealPlanTitleSuccess(res) {
  return {
    type: UPDATE_MEAL_PLAN_TITLE_SUCCESS,
    data: res
  }
}

export function updateMealPlanTitleFailure(error) {
  return {
    type: UPDATE_MEAL_PLAN_TITLE_FAILURE,
    error: error
  }
}

export function saveMealTitle(id, title, sort) {
  console.log(parseInt(sort + 1))
  return(dispatch) => {
    return apiHelper.authorizedRequest('PATCH', `meals/${id}`, {
      body: {
        "data": {
          "type": "meals",
          "attributes": {
            "name": title,
            "sort": parseInt(sort + 1)
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
      dispatch(updateMealTitleSuccess(json))
    }).catch(json => {
      dispatch(updateMealTitleFailure(json))      
    })
  }
}

export function saveMealPlanTitle(id, title) {
  return(dispatch) => {
    return apiHelper.authorizedRequest('PATCH', `meal_plans/${id}`, {
      body: {
        "data": {
          "type": "meal_plans",
          "attributes": {
            "title": title
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
      dispatch(updateMealPlanTitleSuccess(json))
      return true
    }).catch(json => {
      dispatch(updateMealPlanTitleFailure(json))   
      return false   
    })
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_MEAL_TITLE_FAILURE]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: false,
    error: action.error,
    mealTitle: null
  }),
  [UPDATE_MEAL_TITLE_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    mealTitle: action.data
  }),
  [UPDATE_MEAL_PLAN_TITLE_FAILURE]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: false,
    error: action.error,
    mealPlanTitle: null
  }),
  [UPDATE_MEAL_PLAN_TITLE_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    mealPlanTitle: action.data    
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loaded: false,
  loading: false,
  error: null,
  mealPlanTitle: null,
  mealTitle: null
}
export default function mealTitleUpdateReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
