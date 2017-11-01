import { apiHelper } from 'utils'
import { SubmissionError } from 'redux-form'

// ------------------------------------
// Constants
// ------------------------------------
export const USER_PATCH_REQUEST_STARTED = 'USER_PATCH_REQUEST_STARTED'
export const USER_PATCH_REQUEST_SUCCESS = 'USER_PATCH_REQUEST_SUCCESS'
export const USER_PATCH_REQUEST_FAILURE = 'USER_PATCH_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: USER_PATCH_REQUEST_STARTED
  }
}

export function requestSuccess (res) {
  return {
    type: USER_PATCH_REQUEST_SUCCESS,
    data: res.data
  }
}

export function requestFailure (error) {
  return {
    type: USER_PATCH_REQUEST_FAILURE,
    error: error
  }
}

export function userPatchRequest (userId, data) {
  return (dispatch) => {
    dispatch(requestStarted())

    return apiHelper.authorizedRequest('PATCH', 'users/' + userId, {
      body: {
        data: {
          type: 'users',
          id: userId,
          attributes: data
        }
      }
    })
      .then(json => {
        dispatch(requestSuccess(json))
        return json
      }).catch(json => {
        dispatch(requestFailure(json))
        throw new SubmissionError({
          _error: json.message
        })
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_PATCH_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: null
  }),
  [USER_PATCH_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [USER_PATCH_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
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
export default function userPatchReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
