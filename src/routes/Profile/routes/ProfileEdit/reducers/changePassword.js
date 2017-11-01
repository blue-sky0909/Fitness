import { apiHelper } from 'utils'
import { SubmissionError } from 'redux-form'

// ------------------------------------
// Constants
// ------------------------------------
export const CHANGE_PASSWORD_REQUEST_STARTED = 'CHANGE_PASSWORD_REQUEST_STARTED'
export const CHANGE_PASSWORD_REQUEST_SUCCESS = 'CHANGE_PASSWORD_REQUEST_SUCCESS'
export const CHANGE_PASSWORD_REQUEST_FAILURE = 'CHANGE_PASSWORD_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: CHANGE_PASSWORD_REQUEST_STARTED
  }
}

export function requestSuccess (res) {
  return {
    type: CHANGE_PASSWORD_REQUEST_SUCCESS,
    data: res.data
  }
}

export function requestFailure (error) {
  return {
    type: CHANGE_PASSWORD_REQUEST_FAILURE,
    error: error
  }
}

export function changePasswordRequest (userId, oldPassword, newPassword) {
  return (dispatch) => {
    dispatch(requestStarted())

    return apiHelper.authorizedRequest('POST', `users/${userId}/change_password`, {
      body: {
        old_password: oldPassword,
        new_password: newPassword
      }
    })
      .then(json => {
        dispatch(requestSuccess(json))
        return json
      }).catch(json => {
        dispatch(requestFailure(json))
        throw new SubmissionError({
          _error: 'Wrong password'
        })
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHANGE_PASSWORD_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: null
  }),
  [CHANGE_PASSWORD_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [CHANGE_PASSWORD_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
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
export default function changePasswordReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
