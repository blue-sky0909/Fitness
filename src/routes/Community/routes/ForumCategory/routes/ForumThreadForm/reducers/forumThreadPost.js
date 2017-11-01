import { apiHelper } from 'utils'
import { SubmissionError } from 'redux-form'

// ------------------------------------
// Constants
// ------------------------------------
export const FORUM_THREAD_POST_REQUEST_STARTED = 'FORUM_THREAD_POST_REQUEST_STARTED'
export const FORUM_THREAD_POST_REQUEST_SUCCESS = 'FORUM_THREAD_POST_REQUEST_SUCCESS'
export const FORUM_THREAD_POST_REQUEST_FAILURE = 'FORUM_THREAD_POST_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: FORUM_THREAD_POST_REQUEST_STARTED
  }
}

export function requestSuccess (res) {
  return {
    type: FORUM_THREAD_POST_REQUEST_SUCCESS,
    data: res.data
  }
}

export function requestFailure (error) {
  return {
    type: FORUM_THREAD_POST_REQUEST_FAILURE,
    error: error
  }
}

export function forumThreadPostRequest (categoryId, data) {
  return (dispatch) => {
    dispatch(requestStarted())

    return apiHelper.authorizedRequest('POST', 'forum_threads', {
      body: {
        data: {
          type: 'threads',
          attributes: {
            title: data.title,
            content: data.content,
            category: categoryId * 1,
            sticky: false
          }
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
  [FORUM_THREAD_POST_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: null
  }),
  [FORUM_THREAD_POST_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [FORUM_THREAD_POST_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
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
export default function forumThreadPostReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
