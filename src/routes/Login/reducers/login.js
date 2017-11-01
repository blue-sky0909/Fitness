import { initialize, SubmissionError } from 'redux-form'
import { apiHelper } from 'utils'
import user from 'auth/user'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_REQUEST_STARTED = 'LOGIN_REQUEST_STARTED'
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS'
export const LOGIN_REQUEST_FAILURE = 'LOGIN_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: LOGIN_REQUEST_STARTED
  }
}

export function requestSuccess (res) {
  return {
    type: LOGIN_REQUEST_SUCCESS,
    data: res.data
  }
}

export function requestFailure (error) {
  return {
    type: LOGIN_REQUEST_FAILURE,
    error: error
  }
}

export function loginRequest (data) {
  return (dispatch) => {
    dispatch(requestStarted())

    return apiHelper.anonimousRequest('POST', 'auth', { body: data })
      .then(json => {
        user.authorize(json.access_token, json.user.id, json.user.role)
        dispatch(requestSuccess(json))
        return json
      }).catch(json => {
        dispatch(requestFailure(json))
        dispatch(initialize('Login', data)) // init prev fields values
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
  [LOGIN_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: null
  }),
  [LOGIN_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [LOGIN_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
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
export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
