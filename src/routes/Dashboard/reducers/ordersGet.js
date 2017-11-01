import { apiHelper } from 'utils'
import user from 'auth/user'

// ------------------------------------
// Constants
// ------------------------------------
export const ORDERS_GET_REQUEST_STARTED = 'ORDERS_GET_REQUEST_STARTED'
export const ORDERS_GET_REQUEST_SUCCESS = 'ORDERS_GET_REQUEST_SUCCESS'
export const ORDERS_GET_REQUEST_FAILURE = 'ORDERS_GET_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: ORDERS_GET_REQUEST_STARTED
  }
}

export function requestSuccess (json) {
  return {
    type: ORDERS_GET_REQUEST_SUCCESS,
    data: json
  }
}

export function requestFailure (error) {
  return {
    type: ORDERS_GET_REQUEST_FAILURE,
    error: error
  }
}

export function ordersGetRequest () {
  return (dispatch) => {
    dispatch(requestStarted())

    return apiHelper.authorizedRequest('GET', 'orders?filter[customer]=' + user.id, {})
      .then(json => {
        json.formattedData = []
        if (json.data) {
          json.formattedData = _.map(json.data, (item) => ({
            id: item.id,
            ...item.attributes
          }))
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
  [ORDERS_GET_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: null
  }),
  [ORDERS_GET_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [ORDERS_GET_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
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
export default function ordersGetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
