import { apiHelper } from 'utils'
// import { getMealIds } from './mealPlanCreate'
// ------------------------------------
// Constants
// ------------------------------------
export const MEAL_PLAN_GET_REQUEST_STARTED = 'MEAL_PLAN_GET_REQUEST_STARTED'
export const MEAL_PLAN_GET_REQUEST_SUCCESS = 'MEAL_PLAN_GET_REQUEST_SUCCESS'
export const MEAL_PLAN_GET_REQUEST_FAILURE = 'MEAL_PLAN_GET_REQUEST_FAILURE'
export const MEAL_DAY_ID_SUCCESS = 'MEAL_DAY_ID_SUCCESS'
export const MEAL_DAY_ID_FAILURE = 'MEAL_DAY_ID_FAILURE'
export const MEAL_IDS_GET_SUCCESS = 'MEAL_IDS_GET_SUCCESS'
export const MEAL_IDS_GET_FAILURE = 'MEAL_IDS_GET_FAILURE'
export const MEAL_FOODS_GET_SUCCESS = 'MEAL_FOODS_GET_SUCCESS'
export const MEAL_FOODS_GET_FAILURE = 'MEAL_FOODS_GET_FAILURE'
// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: MEAL_PLAN_GET_REQUEST_STARTED
  }
}

export function requestSuccess (json) {
  return {
    type: MEAL_PLAN_GET_REQUEST_SUCCESS,
    data: json
  }
}

export function requestFailure (error) {
  return {
    type: MEAL_PLAN_GET_REQUEST_FAILURE,
    error: error
  }
}

export function getMealDayIdSuccess(json) {
  return {
    type: MEAL_DAY_ID_SUCCESS,
    data: json
  }
}

export function getMealDayIdFailure(error) {
  return {
    type: MEAL_DAY_ID_FAILURE,
    error: error
  }
}

export function getMealIdsSuccess(json) {
  return {
    type: MEAL_IDS_GET_SUCCESS,
    data: json
  }
}

export function getMealIdsFailure(error) {
  return {
    type: MEAL_IDS_GET_FAILURE,
    error: error
  }
}

export function getMealFoodsSuccess(json) {
  return {
    type: MEAL_FOODS_GET_SUCCESS,
    data: json
  }
}

export function getMealFoodsFailure(error) {
  return {
    type: MEAL_FOODS_GET_FAILURE,
    error: error
  }
}

export function mealPlanGetRequest (mealPlanId) {
  return (dispatch) => {
    dispatch(requestStarted())
    return apiHelper.authorizedRequest('GET', `meal_plans/${mealPlanId}`, {})
      .then(json => { 
        dispatch(requestSuccess(json))
        dispatch(getmealDayId(json.data.id))        
      }).catch(json => {
        dispatch(requestFailure(json))
      })
  }
}

export function getmealDayId(id) {
  return (dispatch) => {
    return apiHelper.authorizedRequest('GET', `days?filter[meal_plan]=${id}`, {})
    .then(json => {
      dispatch(getMealDayIdSuccess(json))
      dispatch(getMealIds(json.data[0].id))
    })
    .catch(json => {
      dispatch(getMealDayIdFailure(json))
    })
  }
}

export function getMealIds(id) {
  return(dispatch) => {
    return apiHelper.authorizedRequest('GET', `days/${id}`, {})
    .then(json => {
      const mealIds = _.filter(json.included, function(item) {
        return item.type == 'meals'
      })
      dispatch(getMealIdsSuccess(json))
      dispatch(getMealFoods(mealIds[0].id))
    })
    .catch(json => {
      dispatch(getMealIdsFailure(json))
    })
  }
}

export function getMealFoods(id) {
  return(dispatch) => {
    return apiHelper.authorizedRequest('GET', `meal_foods?filter[meal]=${id}`, {})
    .then(json => {
      dispatch(getMealFoodsSuccess(json))
      return json
    })
    .catch(json => {
      dispatch(getMealFoodsFailure(json))
    })
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MEAL_PLAN_GET_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: null
  }),
  [MEAL_PLAN_GET_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: true,
    loaded: false,
    error: null,
    data: action.data
  }),
  [MEAL_PLAN_GET_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: false,
    error: action.error,
    data: null
  }),
  [MEAL_DAY_ID_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: true,
    loaded: false,
    error: null,
    getMealDayInfo: action.data
  }),
  [MEAL_DAY_ID_FAILURE]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: false,
    error: action.error,
    getMealDayInfo: null
  }),
  [MEAL_IDS_GET_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: true,
    loaded: false,
    error: null,
    mealIds: action.data
  }),
  [MEAL_IDS_GET_FAILURE]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: false,
    error: action.error,
    mealIds: null
  }),
  [MEAL_FOODS_GET_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    mealFoods: action.data
  }),
  [MEAL_FOODS_GET_FAILURE]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: false,
    error: action.error,
    mealFoods: null
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loaded: false,
  loading: false,
  error: null,
  data: null,
  getMealDayInfo: null,
  mealIds: null,
  mealFoods: null
}
export default function mealPlanGetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
