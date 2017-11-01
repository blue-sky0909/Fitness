import { apiHelper } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const NOTIFICATIONS_READ_POST_REQUEST_STARTED = 'NOTIFICATIONS_READ_POST_REQUEST_STARTED'
export const NOTIFICATIONS_READ_POST_REQUEST_SUCCESS = 'NOTIFICATIONS_READ_POST_REQUEST_SUCCESS'
export const NOTIFICATIONS_READ_POST_REQUEST_FAILURE = 'NOTIFICATIONS_READ_POST_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted (notificationId) {
  return {
    type: NOTIFICATIONS_READ_POST_REQUEST_STARTED,
    notificationId
  }
}

export function requestSuccess (notificationId, res) {
  return {
    type: NOTIFICATIONS_READ_POST_REQUEST_SUCCESS,
    data: res,
    notificationId
  }
}

export function requestFailure (notificationId, error) {
  return {
    type: NOTIFICATIONS_READ_POST_REQUEST_FAILURE,
    error: error,
    notificationId
  }
}

export function notificationsReadPostRequest (notificationId) {
  return function (dispatch) {
    dispatch(requestStarted(notificationId))

    return apiHelper.authorizedRequest('POST', `notifications/${notificationId}/read`, {})
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
        dispatch(requestSuccess(notificationId, json))
      }).catch(json => {
        dispatch(requestFailure(notificationId, json))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [NOTIFICATIONS_READ_POST_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    [action.notificationId]: {
      loading: true,
      loaded: false,
      error: null,
      data: state.data
    }
  }),
  [NOTIFICATIONS_READ_POST_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    [action.notificationId]: {
      loading: false,
      loaded: true,
      error: null,
      data: action.data
    }
  }),
  [NOTIFICATIONS_READ_POST_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
    [action.notificationId]: {
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
export default function notificationsReadPostReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
