import { apiHelper } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const FORUM_REPLIES_GET_REQUEST_STARTED = 'FORUM_REPLIES_GET_REQUEST_STARTED'
export const FORUM_REPLIES_GET_REQUEST_SUCCESS = 'FORUM_REPLIES_GET_REQUEST_SUCCESS'
export const FORUM_REPLIES_GET_REQUEST_FAILURE = 'FORUM_REPLIES_GET_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted (threadId, page) {
  return {
    type: FORUM_REPLIES_GET_REQUEST_STARTED,
    threadId,
    page
  }
}

export function requestSuccess (threadId, page, json) {
  return {
    type: FORUM_REPLIES_GET_REQUEST_SUCCESS,
    data: json,
    threadId,
    page
  }
}

export function requestFailure (threadId, page, error) {
  return {
    type: FORUM_REPLIES_GET_REQUEST_FAILURE,
    error: error,
    threadId,
    page
  }
}

export function forumRepliesGetRequest (threadId, page) {
  return (dispatch) => {
    dispatch(requestStarted(threadId, page))
    return apiHelper.authorizedRequest(
      'GET',
      `forum_replies/?filter[thread]=${threadId}&page[number]=${page}&page[size]=20&sort=created_at`,
      {})
      .then(json => {
        json.formattedData = []
        if (json.data) {
          json.formattedData = _.map(json.data, (item) => ({
            id: item.id,
            author: _.find(json.included, x => x.type === 'authors' && x.id === item.relationships.author.data.id),
            ...item.attributes
          }))
        }
        dispatch(requestSuccess(threadId, page, json))
        return true
      }).catch(json => {
        dispatch(requestFailure(threadId, page, json))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FORUM_REPLIES_GET_REQUEST_STARTED]: (state, action) => _.assign({}, state, {
    [action.threadId]: _.assign(state[action.threadId] || {}, {
      [action.page]: {
        loading: true,
        loaded: false,
        error: null,
        data: state[action.threadId] && state[action.threadId][action.page]
          ? state[action.threadId][action.page].data
          : null
      }
    })
  }),
  [FORUM_REPLIES_GET_REQUEST_SUCCESS]: (state, action) => _.assign({}, state, {
    [action.threadId]: _.assign(state[action.threadId] || {}, {
      [action.page]: {
        loading: false,
        loaded: true,
        error: null,
        data: action.data
      }
    })
  }),
  [FORUM_REPLIES_GET_REQUEST_FAILURE]: (state, action) => _.assign({}, state, {
    [action.threadId]: _.assign(state[action.threadId] || {}, {
      [action.page]: {
        loading: false,
        loaded: false,
        error: action.error,
        data: null
      }
    })
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function forumRepliesGetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
