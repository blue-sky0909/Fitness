import { apiHelper } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const SUBSCRIPTION_STRIPE_POST_REQUEST_STARTED = 'SUBSCRIPTION_STRIPE_POST_REQUEST_STARTED'
export const SUBSCRIPTION_STRIPE_POST_REQUEST_SUCCESS = 'SUBSCRIPTION_STRIPE_POST_REQUEST_SUCCESS'
export const SUBSCRIPTION_STRIPE_POST_REQUEST_FAILURE = 'SUBSCRIPTION_STRIPE_POST_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: SUBSCRIPTION_STRIPE_POST_REQUEST_STARTED
  }
}

export function requestSuccess (res) {
  return {
    type: SUBSCRIPTION_STRIPE_POST_REQUEST_SUCCESS,
    data: res
  }
}

export function requestFailure (error) {
  return {
    type: SUBSCRIPTION_STRIPE_POST_REQUEST_FAILURE,
    error: error
  }
}

export function subscriptionStripePostRequest (type, token) {
  return function (dispatch) {
    dispatch(requestStarted())

    return apiHelper.authorizedRequest('POST', `subscription/stripe`, { body: { type, token } })
      .then(json => {
        console.log(json)
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
  [SUBSCRIPTION_STRIPE_POST_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: state.data
  }),
  [SUBSCRIPTION_STRIPE_POST_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [SUBSCRIPTION_STRIPE_POST_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
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
export default function subscriptionStripePostReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
