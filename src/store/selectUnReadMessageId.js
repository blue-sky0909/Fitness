import { apiHelper } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const UNREAD_MESSAGE_ID_GET_REQUEST_STARTED = 'UNREAD_MESSAGE_ID_GET_REQUEST_STARTED'
export const UNREAD_MESSAGE_ID_GET_REQUEST_SUCCESS = 'UNREAD_MESSAGE_ID_GET_REQUEST_SUCCESS'
export const UNREAD_MESSAGE_ID_GET_REQUEST_FAILURE = 'UNREAD_MESSAGE_ID_GET_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: UNREAD_MESSAGE_ID_GET_REQUEST_STARTED
  }
}

export function requestSuccess (id) {
  return {
    type: UNREAD_MESSAGE_ID_GET_REQUEST_SUCCESS,
    data: id
  }
}

export function selectUnReadMessageIdRequest (id) {
  return function (dispatch) {
    dispatch(requestStarted())
    dispatch(requestSuccess(id))
  }
}

export function removedselectUnReadMessageIdRequest() {
  return function (dispatch) {
    dispatch(requestStarted())
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UNREAD_MESSAGE_ID_GET_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: null
  }),
  [UNREAD_MESSAGE_ID_GET_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
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
export default function selectUnReadMessageIdReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
