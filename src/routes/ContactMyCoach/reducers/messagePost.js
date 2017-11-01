import { apiHelper } from 'utils'
import user from 'auth/user'

// ------------------------------------
// Constants
// ------------------------------------
export const MESSAGE_POST_REQUEST_STARTED = 'MESSAGE_POST_REQUEST_STARTED'
export const MESSAGE_POST_REQUEST_SUCCESS = 'MESSAGE_POST_REQUEST_SUCCESS'
export const MESSAGE_POST_REQUEST_FAILURE = 'MESSAGE_POST_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted (requestId) {
  return {
    type: MESSAGE_POST_REQUEST_STARTED,
    requestId
  }
}

export function requestSuccess (requestId, res) {
  return {
    type: MESSAGE_POST_REQUEST_SUCCESS,
    data: res.data,
    requestId
  }
}

export function requestFailure (requestId, error) {
  return {
    type: MESSAGE_POST_REQUEST_FAILURE,
    error: error,
    requestId
  }
}

export function messagePostRequest (requestId, conversationId, content) {
  return (dispatch) => {
    dispatch(requestStarted(requestId))

    return apiHelper.authorizedRequest('POST', 'messages', {
      body: {
        data: {
          type: 'messages',
          attributes: {
            conversation: conversationId * 1,
            content: content,
            author: user.id
          }
        }
      }
    })
      .then(json => {
        dispatch(requestSuccess(requestId, json))
        return json
      }).catch(json => {
        dispatch(requestFailure(requestId, json))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MESSAGE_POST_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    [action.requestId]: {
      loading: true,
      loaded: false,
      error: null,
      data: null
    }
  }),
  [MESSAGE_POST_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    [action.requestId]: {
      loading: false,
      loaded: true,
      error: null,
      data: action.data
    }
  }),
  [MESSAGE_POST_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
    [action.requestId]: {
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
export default function messagePostReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
