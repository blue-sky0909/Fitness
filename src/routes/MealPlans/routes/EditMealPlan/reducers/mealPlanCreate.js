import { apiHelper } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const MEAL_PLAN_CREATE_REQUEST_STARTED = 'MEAL_PLAN_CREATE_REQUEST_STARTED'
export const MEAL_PLAN_CREATE_SUCCESS = 'MEAL_PLAN_CREATE_SUCCESS'
export const MEAL_PLAN_CREATE_FAILURE = 'MEAL_PLAN_CREATE_FAILURE'
export const MEAL_DAY_ID_SUCCESS = 'MEAL_DAY_ID_SUCCESS'
export const MEAL_DAY_ID_FAILURE = 'MEAL_DAY_ID_FAILURE'
export const MEAL_IDS_GET_SUCCESS = 'MEAL_IDS_GET_SUCCESS'
export const MEAL_IDS_GET_FAILURE = 'MEAL_IDS_GET_FAILURE'
// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: MEAL_PLAN_CREATE_REQUEST_STARTED
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

export function mealPlanCreateSucess (json) {
  return {
    type: MEAL_PLAN_CREATE_SUCCESS,
    data: json
  }
}

export function mealPlanCreateFailure (error) {
  return {
    type: MEAL_PLAN_CREATE_FAILURE,
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

export function mealPlanCreate() {
  const userId = localStorage.getItem('userId')
  return (dispatch) => {
    dispatch(requestStarted())
    return apiHelper.authorizedRequest('POST', 'meal_plans', {
      body: {
        "data": {
          "type": "meal_plans",
          "attributes": {
            "user": userId
          }
        }  
      }
    })
    .then(json => {
      dispatch(mealPlanCreateSucess(json))
      dispatch(getmealDayId(json.data.id))
    })
    .catch(json => {
      dispatch(mealPlanCreateFailure(json))
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
      dispatch(getMealIdsSuccess(json))
    })
    .catch(json => {
      dispatch(getMealIdsFailure(json))
    })
  }

}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MEAL_PLAN_CREATE_REQUEST_STARTED]: (state, action) => Object.assign({}, state, {
    loading: true,
    loaded: false,
    error: null,
    mealPlanId: null
  }),
  [MEAL_PLAN_CREATE_FAILURE]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: false,
    error: action.error,
    mealPlanId: null
  }),
  [MEAL_PLAN_CREATE_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: true,
    loaded: false,
    error: null,
    mealPlanId: action.data
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
    loading: false,
    loaded: true,
    error: null,
    mealIds: action.data
  }),
  [MEAL_IDS_GET_FAILURE]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: false,
    error: action.error,
    mealIds: null
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loaded: false,
  loading: false,
  error: null,
  mealPlanId: null,
  getMealDayInfo: null,
  mealIds: null
}
export default function mealPlanCreateReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
