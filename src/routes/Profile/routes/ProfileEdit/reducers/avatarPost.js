import { apiHelper } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const AVATAR_POST_REQUEST_STARTED = 'AVATAR_POST_REQUEST_STARTED'
export const AVATAR_POST_REQUEST_SUCCESS = 'AVATAR_POST_REQUEST_SUCCESS'
export const AVATAR_POST_REQUEST_FAILURE = 'AVATAR_POST_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: AVATAR_POST_REQUEST_STARTED
  }
}

export function requestSuccess (res) {
  return {
    type: AVATAR_POST_REQUEST_SUCCESS,
    data: res.data
  }
}

export function requestFailure (error) {
  return {
    type: AVATAR_POST_REQUEST_FAILURE,
    error: error
  }
}

export function avatarPostRequest (userId, image) {
  return (dispatch) => {
    dispatch(requestStarted())

    return apiHelper.authorizedRequest('POST', `users/${userId}/avatar`, {
      body: {
        avatar: image
      }
    })
      .then(json => {
        dispatch(requestSuccess(json))
        return json
      }).catch(json => {
        dispatch(requestFailure(json))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [AVATAR_POST_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: null
  }),
  [AVATAR_POST_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [AVATAR_POST_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
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
export default function avatarPostReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
