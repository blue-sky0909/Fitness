import { apiHelper } from 'utils'
import { mealPlansGetRequest } from './mealPlansGet'

// ------------------------------------
// Constants
// ------------------------------------
export const MEAL_PLANS_DELETE_REQUEST_STARTED = 'MEAL_PLANS_DELETE_REQUEST_STARTED'
export const MEAL_PLANS_DELETE_REQUEST_SUCCESS = 'MEAL_PLANS_DELETE_REQUEST_SUCCESS'
export const MEAL_PLANS_DELETE_REQUEST_FAILURE = 'MEAL_PLANS_DELETE_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: MEAL_PLANS_DELETE_REQUEST_STARTED
  }
}

export function requestSuccess (json) {
  return {
    type: MEAL_PLANS_DELETE_REQUEST_SUCCESS,
    data: json
  }
}

export function requestFailure (error) {
  return {
    type: MEAL_PLANS_DELETE_REQUEST_FAILURE,
    error: error
  }
}

export function mealPlanDeleteRequest (mealPlanId) {
  return (dispatch) => {
    dispatch(requestStarted())

    return apiHelper.authorizedRequest('DELETE', `meal_plans/${mealPlanId}`, {})
      .then(json => {
        dispatch(requestSuccess(json))
        dispatch(mealPlansGetRequest())
      }).catch(json => {
        dispatch(requestFailure(json))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MEAL_PLANS_DELETE_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: null
  }),
  [MEAL_PLANS_DELETE_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [MEAL_PLANS_DELETE_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
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
export default function mealPlansGetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
