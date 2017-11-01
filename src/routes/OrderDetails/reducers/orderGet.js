import { apiHelper } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const ORDER_GET_REQUEST_STARTED = 'ORDER_GET_REQUEST_STARTED'
export const ORDER_GET_REQUEST_SUCCESS = 'ORDER_GET_REQUEST_SUCCESS'
export const ORDER_GET_REQUEST_FAILURE = 'ORDER_GET_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted (orderId) {
  return {
    type: ORDER_GET_REQUEST_STARTED,
    orderId
  }
}

export function requestSuccess (orderId, json) {
  return {
    type: ORDER_GET_REQUEST_SUCCESS,
    data: json,
    orderId
  }
}

export function requestFailure (orderId, error) {
  return {
    type: ORDER_GET_REQUEST_FAILURE,
    error: error,
    orderId
  }
}

export function orderGetRequest (orderId) {
  return (dispatch) => {
    dispatch(requestStarted(orderId))

    return apiHelper.authorizedRequest('GET', 'orders/' + orderId, {})
      .then(json => {
        dispatch(requestSuccess(orderId, json))
      }).catch(json => {
        dispatch(requestFailure(orderId, json))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ORDER_GET_REQUEST_STARTED]: (state, action) => Object.assign({}, state, {
    [action.orderId]: {
      loading: true,
      loaded: false,
      error: null,
      data: state[action.orderId] ? state[action.orderId].data : null
    }
  }),
  [ORDER_GET_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    [action.orderId]: {
      loading: false,
      loaded: true,
      error: null,
      data: action.data
    }
  }),
  [ORDER_GET_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
    [action.orderId]: {
      loading: false,
      loaded: false,
      error: action.error,
      data: null
    }
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function orderGetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
