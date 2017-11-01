import { apiHelper } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const MESSAGES_GET_REQUEST_STARTED = 'MESSAGES_GET_REQUEST_STARTED'
export const MESSAGES_GET_REQUEST_SUCCESS = 'MESSAGES_GET_REQUEST_SUCCESS'
export const MESSAGES_GET_REQUEST_FAILURE = 'MESSAGES_GET_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted (conversationId, fromTimer) {
  return {
    type: MESSAGES_GET_REQUEST_STARTED,
    conversationId,
    fromTimer
  }
}

export function requestSuccess (conversationId, json, fromTimer) {
  return {
    type: MESSAGES_GET_REQUEST_SUCCESS,
    data: json,
    conversationId,
    fromTimer
  }
}

export function requestFailure (conversationId, error, fromTimer) {
  return {
    type: MESSAGES_GET_REQUEST_FAILURE,
    error: error,
    conversationId,
    fromTimer
  }
}

export function messagesGetRequest (conversationId, createdAt = null, fromTimer = false) {
  return (dispatch) => {
  //  dispatch(requestStarted(conversationId, fromTimer))

    return apiHelper.authorizedRequest(
      'GET',
      'messages?filter[conversation]=' + conversationId + (createdAt ? `&filter[created_at][lt]=${createdAt}` : ''), {})
      .then(json => {
        json.formattedData = []
        if (json.data) {
          json.formattedData = _.map(_.reverse(json.data), (item) => ({
            id: item.id,
            ...item.attributes,
            author: _.find(json.included, x => x.type === 'authors' && x.id === item.relationships.author.data.id)
          }))
        }
        dispatch(requestSuccess(conversationId, json, fromTimer))
      }).catch(json => {
        dispatch(requestFailure(conversationId, json, fromTimer))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MESSAGES_GET_REQUEST_STARTED]: (state, action) => Object.assign({}, state, {
    [action.conversationId]: {
      loading: !action.fromTimer,
      loadingFromTimer: action.fromTimer,
      loaded: false,
      error: null,
      noMoreMessages: state[action.conversationId] && state[action.conversationId].noMoreMessages,
      data: state[action.conversationId] ? state[action.conversationId].data : null
    }
  }),
  [MESSAGES_GET_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    [action.conversationId]:{
      loading: false,
      loadingFromTimer: false,
      loaded: true,
      error: null,
      noMoreMessages:
        (state[action.conversationId] && state[action.conversationId].noMoreMessages) ||
        (action.data.formattedData.length === 0),
      data:
        state[action.conversationId] && state[action.conversationId].data && state[action.conversationId].data.length
        ? _.sortBy(
            _.unionBy(action.data.formattedData, state[action.conversationId].data, 'id'),
            (x) => moment(x['created-at']).valueOf())
        : action.data.formattedData
    }
  }),
  [MESSAGES_GET_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
    [action.conversationId]: {
      loading: false,
      loadingFromTimer: false,
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
export default function messagesGetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
