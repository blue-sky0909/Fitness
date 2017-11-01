import { apiHelper } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const FORUM_THREAD_GET_REQUEST_STARTED = 'FORUM_THREAD_GET_REQUEST_STARTED'
export const FORUM_THREAD_GET_REQUEST_SUCCESS = 'FORUM_THREAD_GET_REQUEST_SUCCESS'
export const FORUM_THREAD_GET_REQUEST_FAILURE = 'FORUM_THREAD_GET_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted (threadId) {
  return {
    type: FORUM_THREAD_GET_REQUEST_STARTED,
    threadId
  }
}

export function requestSuccess (threadId, json) {
  return {
    type: FORUM_THREAD_GET_REQUEST_SUCCESS,
    data: json,
    threadId
  }
}

export function requestFailure (threadId, error) {
  return {
    type: FORUM_THREAD_GET_REQUEST_FAILURE,
    error: error,
    threadId
  }
}

export function forumThreadGetRequest (threadId) {
  return (dispatch) => {
    dispatch(requestStarted(threadId))

    return apiHelper.authorizedRequest('GET', 'forum_threads/' + threadId, {})
      .then(json => {
        json.formattedData = []
        if (json.data) {
          json.formattedData = {
            id: json.data.id,
            ...json.data.attributes,
            author: _.find(json.included, (item) => item.type === 'authors'),
            category: _.find(json.included, (item) => item.type === 'categories')
          }
        }
        dispatch(requestSuccess(threadId, json))
      }).catch(json => {
        dispatch(requestFailure(threadId, json))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FORUM_THREAD_GET_REQUEST_STARTED]: (state, action) => Object.assign({}, state, {
    [action.threadId]: {
      loading: true,
      loaded: false,
      error: null,
      data: state[action.threadId] ? state[action.threadId].data : null
    }
  }),
  [FORUM_THREAD_GET_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    [action.threadId]: {
      loading: false,
      loaded: true,
      error: null,
      data: action.data
    }
  }),
  [FORUM_THREAD_GET_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
    [action.threadId]: {
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
export default function forumThreadGetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
