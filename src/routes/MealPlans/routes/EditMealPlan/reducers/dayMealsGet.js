import { apiHelper } from 'utils'
// import { mealGetRequest } from './mealGet'

// ------------------------------------
// Constants
// ------------------------------------
export const DAY_MEALS_GET_REQUEST_STARTED = 'DAY_MEALS_GET_REQUEST_STARTED'
export const DAY_MEALS_GET_REQUEST_SUCCESS = 'DAY_MEALS_GET_REQUEST_SUCCESS'
export const DAY_MEALS_GET_REQUEST_FAILURE = 'DAY_MEALS_GET_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: DAY_MEALS_GET_REQUEST_STARTED
  }
}

export function requestSuccess (json) {
  return {
    type: DAY_MEALS_GET_REQUEST_SUCCESS,
    data: json
  }
}

export function requestFailure (error) {
  return {
    type: DAY_MEALS_GET_REQUEST_FAILURE,
    error: error
  }
}

export function dayMealsGetRequest (dayId) {
  return (dispatch) => {
    dispatch(requestStarted())
    return apiHelper.authorizedRequest('GET', `days/${dayId}`, {})
      .then(json => {
        json.formattedData = []
        if (json.included.length) {
          json.formattedData = _.filter(json.included, item => item.type === 'meals')
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
  [DAY_MEALS_GET_REQUEST_STARTED]: (state, action) => Object.assign({}, state, {
    loading: true,
    loaded: false,
    error: null,
    data: null
  }),
  [DAY_MEALS_GET_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [DAY_MEALS_GET_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
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
