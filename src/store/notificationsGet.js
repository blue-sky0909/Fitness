import { apiHelper } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const NOTIFICATIONS_GET_REQUEST_STARTED = 'NOTIFICATIONS_GET_REQUEST_STARTED'
export const NOTIFICATIONS_GET_REQUEST_SUCCESS = 'NOTIFICATIONS_GET_REQUEST_SUCCESS'
export const NOTIFICATIONS_GET_REQUEST_FAILURE = 'NOTIFICATIONS_GET_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: NOTIFICATIONS_GET_REQUEST_STARTED
  }
}

export function requestSuccess (res) {
  return {
    type: NOTIFICATIONS_GET_REQUEST_SUCCESS,
    data: res
  }
}

export function requestFailure (error) {
  return {
    type: NOTIFICATIONS_GET_REQUEST_FAILURE,
    error: error
  }
}

export function notificationsGetRequest () {
  return function (dispatch) {
    dispatch(requestStarted())

    return apiHelper.authorizedRequest('GET', `notifications`, {})
      .then(json => {
        json.formattedData = _.map(json.data, item => {
          let formattedItem = {
            id: item.id,
            ...item.attributes
          }

          if (item.relationships.author) {
            formattedItem.author =
                _.find(
                  json.included,
                  x => x.type === 'authors' && x.id === item.relationships.author.data.id)
          }

          return formattedItem
        })
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
  [NOTIFICATIONS_GET_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: state.data
  }),
  [NOTIFICATIONS_GET_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [NOTIFICATIONS_GET_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
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
export default function notificationsGetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
