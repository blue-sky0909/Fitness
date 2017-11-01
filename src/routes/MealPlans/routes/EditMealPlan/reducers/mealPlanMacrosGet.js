import { apiHelper } from 'utils'

export const MEAN_PLAN_MACROS_GET_SUCCESS = 'MEAN_PLAN_MACROS_GET_SUCCESS'
export const MEAN_PLAN_MACROS_GET_FAILURE = 'MEAN_PLAN_MACROS_GET_FAILURE'

export function requestSuccess() {
  return {
    type: MEAN_PLAN_MACROS_GET_SUCCESS
  }
}
export function requestFailure() {
  return {
    type: MEAN_PLAN_MACROS_GET_FAILURE
  }
}

export function mealPlanMacrosGet(mealPlanId) {
  return (dispatch) => {
    return apiHelper.authorizedRequest('POST', `meal_plans/${mealPlanId}/re_calc_macros`, {})
    .then(json => {
      dispatch(requestSuccess())
    })
    .catch(json => {
      dispatch(requestFailure())
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MEAN_PLAN_MACROS_GET_SUCCESS]: (state, action) => 
  Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
  }),
  [MEAN_PLAN_MACROS_GET_FAILURE]: (state, action) => {
    return Object.assign({}, state, {
      loading: false,
      loaded: true,
      error: true
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading: false,
  loaded: true,
  error: null,
}
export default function mealPlanMacrosGetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
