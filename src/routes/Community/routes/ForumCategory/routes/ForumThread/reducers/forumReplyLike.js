import { apiHelper } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const FORUM_REPLY_LIKE_REQUEST_STARTED = 'FORUM_REPLY_LIKE_REQUEST_STARTED'
export const FORUM_REPLY_LIKE_REQUEST_SUCCESS = 'FORUM_REPLY_LIKE_REQUEST_SUCCESS'
export const FORUM_REPLY_LIKE_REQUEST_FAILURE = 'FORUM_REPLY_LIKE_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted (replyId) {
  return {
    type: FORUM_REPLY_LIKE_REQUEST_STARTED,
    replyId
  }
}

export function requestSuccess (replyId, json) {
  return {
    type: FORUM_REPLY_LIKE_REQUEST_SUCCESS,
    data: json,
    replyId
  }
}

export function requestFailure (replyId, error) {
  return {
    type: FORUM_REPLY_LIKE_REQUEST_FAILURE,
    error: error,
    replyId
  }
}

export function forumReplyLikeRequest (replyId) {
  return (dispatch) => {
    dispatch(requestStarted(replyId))

    return apiHelper.authorizedRequest('POST', `forum_replies/${replyId}/like`, {})
      .then(json => {
        json.formattedData = []
        if (json.data) {
          json.formattedData = _.reverse(_.map(json.data, (item) => ({
            id: item.id,
            author: _.find(json.included, x => x.type === 'authors' && x.id === item.relationships.author.data.id),
            ...item.attributes
          })))
        }
        dispatch(requestSuccess(replyId, json))
      }).catch(json => {
        dispatch(requestFailure(replyId, json))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FORUM_REPLY_LIKE_REQUEST_STARTED]: (state, action) => Object.assign({}, state, {
    [action.replyId]: {
      loading: true,
      loaded: false,
      error: null,
      data: state[action.replyId] ? state[action.replyId].data : null
    }
  }),
  [FORUM_REPLY_LIKE_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    [action.replyId]: {
      loading: false,
      loaded: true,
      error: null,
      data: action.data
    }
  }),
  [FORUM_REPLY_LIKE_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
    [action.replyId]: {
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
export default function forumReplyLikeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
