import { apiHelper } from 'utils'
import { SubmissionError } from 'redux-form'

// ------------------------------------
// Constants
// ------------------------------------
export const CONVERSATION_POST_REQUEST_STARTED = 'CONVERSATION_POST_REQUEST_STARTED'
export const CONVERSATION_POST_REQUEST_SUCCESS = 'CONVERSATION_POST_REQUEST_SUCCESS'
export const CONVERSATION_POST_REQUEST_FAILURE = 'CONVERSATION_POST_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: CONVERSATION_POST_REQUEST_STARTED
  }
}

export function requestSuccess (res) {
  return {
    type: CONVERSATION_POST_REQUEST_SUCCESS,
    data: res.data
  }
}

export function requestFailure (error) {
  return {
    type: CONVERSATION_POST_REQUEST_FAILURE,
    error: error
  }
}

export function conversationPostRequest (coachId, customerId, data) {
  return (dispatch) => {
    dispatch(requestStarted())

    return apiHelper.authorizedRequest('POST', 'conversations', {
      body: {
        data: {
          type: 'conversations',
          attributes: {
            title: data.title,
            content: data.content,
            coach: coachId * 1,
            customer: customerId * 1
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
  [CONVERSATION_POST_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: null
  }),
  [CONVERSATION_POST_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [CONVERSATION_POST_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
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
export default function convsrsationPostReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
