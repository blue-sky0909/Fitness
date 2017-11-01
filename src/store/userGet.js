import { apiHelper } from 'utils'
import user from 'auth/user'

// ------------------------------------
// Constants
// ------------------------------------
export const USER_GET_REQUEST_STARTED = 'USER_GET_REQUEST_STARTED'
export const USER_GET_REQUEST_SUCCESS = 'USER_GET_REQUEST_SUCCESS'
export const USER_GET_REQUEST_FAILURE = 'USER_GET_REQUEST_FAILURE'

export const ORDER_TOPIC_SUCCESS = 'ORDER_TOPIC_SUCCESS'
export const ORDER_TOPIC_REQUEST = 'ORDER_TOPIC_REQUEST'
// ------------------------------------
// Actions
// ------------------------------------

export function orderRequest() {
  return {
    type: ORDER_TOPIC_REQUEST
  }
}
export function orderSuccess() {
  return {
    type: ORDER_TOPIC_SUCCESS
  }
}
export function orderTopic() {
  return function (dispatch) {
    dispatch(orderSuccess())
  }
}

export function requestStarted () {
  return {
    type: USER_GET_REQUEST_STARTED
  }
}

export function requestSuccess (res) {
  return {
    type: USER_GET_REQUEST_SUCCESS,
    data: res
  }
}

export function requestFailure (error) {
  return {
    type: USER_GET_REQUEST_FAILURE,
    error: error
  }
}

export function userGetRequest () {
  return function (dispatch) {
    dispatch(requestStarted())

    return apiHelper.authorizedRequest('GET', `users/${user.id}`, {})
      .then(json => {
        localStorage.setItem('userInfo', json)
        json.coach = _.find(json.included, (x) => x.type === 'coaches')
        dispatch(requestSuccess(json))
      }).catch(json => {
        dispatch(requestFailure(json))
      })
  }
}

export function userPatchRequest (id) {
  return function (dispatch) {
    dispatch(requestStarted())

    return apiHelper.authorizedRequest('PATCH', `users/${id}`, {
      body: {
        data: {
          type: "users",
          id: id,
          attributes: {
            banned: true
          }
        }
      }
    })
      .then(json => {     
        dispatch(userGetRequest())
      }).catch(json => {
        dispatch(requestFailure(json))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_GET_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: state.data
  }),
  [USER_GET_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [USER_GET_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: false,
    error: action.error,
    data: null
  }),
  [ORDER_TOPIC_SUCCESS]: (state, action) => Object.assign({}, state, {
    orderFlag: true
  }),


}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loaded: false,
  loading: false,
  error: null,
  data: null,
  orderFlag: false
}
export default function userGetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
