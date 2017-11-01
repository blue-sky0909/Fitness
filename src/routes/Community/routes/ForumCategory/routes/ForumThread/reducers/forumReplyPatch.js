import { apiHelper } from 'utils'
import { initialize, SubmissionError } from 'redux-form'
import { forumRepliesGetRequest } from './forumRepliesGet'

// ------------------------------------
// Constants
// ------------------------------------
export const FORUM_REPLY_PATCH_REQUEST_STARTED = 'FORUM_REPLY_PATCH_REQUEST_STARTED'
export const FORUM_REPLY_PATCH_REQUEST_SUCCESS = 'FORUM_REPLY_PATCH_REQUEST_SUCCESS'
export const FORUM_REPLY_PATCH_REQUEST_FAILURE = 'FORUM_REPLY_PATCH_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: FORUM_REPLY_PATCH_REQUEST_STARTED
  }
}

export function requestSuccess (res) {
  return {
    type: FORUM_REPLY_PATCH_REQUEST_SUCCESS,
    data: res.data
  }
}

export function requestFailure (error) {
  return {
    type: FORUM_REPLY_PATCH_REQUEST_FAILURE,
    error: error
  }
}

export function forumReplyPatchRequest (threadId, replyId, data, page) {
  return (dispatch) => {
    dispatch(requestStarted())

    return apiHelper.authorizedRequest('PATCH', 'forum_replies/' + replyId, {
      body: {
        data: {
          id: replyId * 1,
          type: 'replies',
          attributes: {
            content: data.content,
            thread: threadId * 1
          }
        }
      }
    })
      .then(json => {
        dispatch(requestSuccess(json))
         dispatch(forumRepliesGetRequest(threadId, page))
        return json
      }).catch(json => {
        dispatch(requestFailure(json))
        dispatch(initialize('ForumReplyEdit', data)) // init prev fields values
        return false
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
  [FORUM_REPLY_PATCH_REQUEST_STARTED]: (state, action) => Object.assign({}, state, {
    loading: true,
    loaded: false,
    error: null,
    data: null
  }),
  [FORUM_REPLY_PATCH_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [FORUM_REPLY_PATCH_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
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
export default function forumReplyPatchReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
