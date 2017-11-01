import { apiHelper } from 'utils'
import { initialize, SubmissionError } from 'redux-form'

// ------------------------------------
// Constants
// ------------------------------------
export const FORUM_REPLY_POST_REQUEST_STARTED = 'FORUM_REPLY_POST_REQUEST_STARTED'
export const FORUM_REPLY_POST_REQUEST_SUCCESS = 'FORUM_REPLY_POST_REQUEST_SUCCESS'
export const FORUM_REPLY_POST_REQUEST_FAILURE = 'FORUM_REPLY_POST_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: FORUM_REPLY_POST_REQUEST_STARTED
  }
}

export function requestSuccess (res) {
  return {
    type: FORUM_REPLY_POST_REQUEST_SUCCESS,
    data: res.data
  }
}

export function requestFailure (error) {
  return {
    type: FORUM_REPLY_POST_REQUEST_FAILURE,
    error: error
  }
}

// ------------------------------------
// Helpers
// ------------------------------------
function hasQuote(string) {
  return string.indexOf('[quote]') !== -1 && string.indexOf('[/quote]') !== -1
}

function getQuotedContent(string) {
  const quoteContentStartIndex = string.indexOf(']')
  const quoteContentEndIndex = string.indexOf('[/quote]')

  return string.substring(quoteContentStartIndex + 1, quoteContentEndIndex)
}

export function forumReplyPostRequest (threadId, data) {
  return (dispatch) => {
    dispatch(requestStarted())

    let content, quotedContent = null
    if (hasQuote(data.content)) {
      const quoteEndIndex = data.content.indexOf('\n')
      content = data.content.substring(quoteEndIndex + 1)
      quotedContent = getQuotedContent(data.content.substring(0, quoteEndIndex))
    } else {
      content = data.content
    }

    return apiHelper.authorizedRequest('POST', 'forum_replies', {
      body: {
        data: {
          type: 'replies',
          attributes: {
            content: content,
            thread: threadId * 1,
            quoted_content: quotedContent
          }
        }
      }
    })
      .then(json => {
        dispatch(requestSuccess(json))
        return json
      }).catch(json => {
        dispatch(requestFailure(json))
        dispatch(initialize('ForumReply', data)) // init prev fields values
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
  [FORUM_REPLY_POST_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: null
  }),
  [FORUM_REPLY_POST_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [FORUM_REPLY_POST_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
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
export default function forumReplyPostReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
