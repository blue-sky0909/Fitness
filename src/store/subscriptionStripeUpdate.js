import { apiHelper } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const SUBSCRIPTION_STRIPE_UPDATE_REQUEST_STARTED = 'SUBSCRIPTION_STRIPE_UPDATE_REQUEST_STARTED'
export const SUBSCRIPTION_STRIPE_UPDATE_REQUEST_SUCCESS = 'SUBSCRIPTION_STRIPE_UPDATE_REQUEST_SUCCESS'
export const SUBSCRIPTION_STRIPE_UPDATE_REQUEST_FAILURE = 'SUBSCRIPTION_STRIPE_UPDATE_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: SUBSCRIPTION_STRIPE_UPDATE_REQUEST_STARTED
  }
}

export function requestSuccess ( res ) {
  return {
    type: SUBSCRIPTION_STRIPE_UPDATE_REQUEST_SUCCESS,
    data: res
  }
}

export function requestFailure ( error ) {
  return {
    type: SUBSCRIPTION_STRIPE_UPDATE_REQUEST_FAILURE,
    error: error
  }
}

export function subscriptionStripeUpdateRequest ( type ) {
  return function ( dispatch ) {
    dispatch(requestStarted())

    return apiHelper.authorizedRequest('PATCH', `subscription/stripe`, { body: { type } })
      .then(json => {
        dispatch(requestSuccess(json))
      }).catch(json => {
        dispatch(requestFailure(json))
      })
  }
}

export function downgradePlan ( title, customer, current_plan, new_plan, url ) {
  return function ( dispatch ) {

    dispatch(requestStarted())
    const endpoint = 'tickets'
    const data = {
      type: 'tickets',
      attributes: {
        title,
        details: customer + ' has requested a downgrade from ' + current_plan + ' to ' + new_plan,
        type: 'Downgrade Request',
        status: 'Open',
        severity: 'urgent'
      }
    }
    return apiHelper.authorizedRequest('POST', endpoint, {
      body: {
        data
      }
    }).then(json => {
      dispatch(requestSuccess(json))
      if(url){
        window.location.href = url
      }
    }).catch(json => {
      dispatch(requestFailure(json))
    })
  }
}

export function upgradePlan ( title, customer, current_plan, new_plan, url ) {
  return function ( dispatch ) {

    dispatch(requestStarted())
    const endpoint = 'tickets'
    const data = {
      type: 'tickets',
      attributes: {
        title,
        details: customer + ' has requested a upgrade from ' + current_plan + ' to ' + new_plan,
        type: 'Downgrade Request',
        status: 'Open',
        severity: 'urgent'
      }
    }
    return apiHelper.authorizedRequest('POST', endpoint, {
      body: {
        data
      }
    }).then(json => {
      dispatch(requestSuccess(json))
      if(url){
        window.location.href = url
      }
    }).catch(json => {
      dispatch(requestFailure(json))
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SUBSCRIPTION_STRIPE_UPDATE_REQUEST_STARTED]: ( state, action ) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: state.data
  }),
  [SUBSCRIPTION_STRIPE_UPDATE_REQUEST_SUCCESS]: ( state, action ) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [SUBSCRIPTION_STRIPE_UPDATE_REQUEST_FAILURE]: ( state, action ) => Object.assign({}, state, {
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
export default function subscriptionStripeUpdateReducer ( state = initialState, action ) {
  const handler = ACTION_HANDLERS[ action.type ]

  return handler ? handler(state, action) : state
}
