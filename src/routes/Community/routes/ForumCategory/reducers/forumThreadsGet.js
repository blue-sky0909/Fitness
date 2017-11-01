import { apiHelper } from 'utils'
import { browserHistory } from 'react-router'

// ------------------------------------
// Constants
// ------------------------------------
export const FORUM_THREADS_GET_REQUEST_STARTED = 'FORUM_THREADS_GET_REQUEST_STARTED'
export const FORUM_THREADS_GET_REQUEST_SUCCESS = 'FORUM_THREADS_GET_REQUEST_SUCCESS'
export const FORUM_THREADS_GET_REQUEST_FAILURE = 'FORUM_THREADS_GET_REQUEST_FAILURE'
export const FORUM_THREADS_GET_DELETE_SUCCESS = 'FORUM_THREADS_GET_DELETE_SUCCESS'
// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted (categoryId) {
  return {
    type: FORUM_THREADS_GET_REQUEST_STARTED,
    categoryId
  }
}

export function requestSuccess (categoryId, json) {
  return {
    type: FORUM_THREADS_GET_REQUEST_SUCCESS,
    data: json,
    categoryId
  }
}

export function deleteSuccess (categoryId, threadId) {
  return {
    type: FORUM_THREADS_GET_DELETE_SUCCESS,
    categoryId,
    threadId
  }
}

export function requestFailure (categoryId, error) {
  return {
    type: FORUM_THREADS_GET_REQUEST_FAILURE,
    error: error,
    categoryId
  }
}

export function forumThreadsGetRequest (categoryId) {
  return (dispatch) => {
    dispatch(requestStarted(categoryId))

    return apiHelper.authorizedRequest('GET', 'forum_threads/?filter[category]=' + categoryId, {})
      .then(json => {
        json.formattedData = []
        json.included = _.map(json.included, item => {
          if (item.type === 'last_replies') {
            item.author = _.find(json.included, x => x.type === 'authors' && x.id === item.relationships.author.data.id)
          }

          return item
        })
        if (json.data) {
          json.formattedData = _.map(json.data, (item) => ({
            id: item.id,
            ...item.attributes,
            author: _.find(json.included, (x) => x.type === 'authors' && x.id === item.relationships.author.data.id),
            last_reply: item.relationships.last_reply.data
              ? _.find(
                json.included,
                (x) => x.type === 'last_replies' && x.id === item.relationships.last_reply.data.id)
              : null
          }))
        }
        dispatch(requestSuccess(categoryId, json))
      }).catch(json => {
        dispatch(requestFailure(categoryId, json))
      })
  }
}

export function forumThreadDelete (threadId, categoryId) {
  console.log(threadId)
  return (dispatch) => {
    dispatch(requestStarted(categoryId))

    return apiHelper.authorizedRequest('DELETE', 'forum_threads/' + threadId, {})
      .then(json => {
        console.log(json)
        dispatch(forumThreadsGetRequest(categoryId))
        browserHistory.push(`/community/${categoryId}/threads`)
      }).catch(json => {
        console.log(json)
        dispatch(requestFailure(threadId, json))
      })
  }
}

export function forumThreadPinPatchRequest (categoryId, threadId, data) {
  let flag
  if (data.sticky == false)
    flag = true;
  else 
    flag = false
  return (dispatch) => {
    dispatch(requestStarted())

    return apiHelper.authorizedRequest('PATCH', 'forum_threads/' + threadId, {
      body: {
        data: {
          type: 'threads',
          id: threadId,
          attributes: {
            title: data.title,
            content: data.content,
            category: categoryId * 1,
            sticky: flag
          }
        }
      }
    })
      .then(json => {
        dispatch(dispatch(forumThreadsGetRequest(categoryId)))
        return json
      }).catch(json => {
        dispatch(requestFailure(threadId, json))
      })
  }
}

export function forumThreadLock (threadId, categoryId) {
  console.log(categoryId)
  return (dispatch) => {
    dispatch(requestStarted(categoryId))

    return apiHelper.authorizedRequest('PATCH', 'forum_threads/' + threadId, {
      body: {
        data: {
          type: 'threads',
          id: threadId,
          attributes: {
            locked: true
          }
        }
      }
    })
      .then(json => {
        console.log(json)
        dispatch(dispatch(forumThreadsGetRequest(categoryId)))
        browserHistory.push(`/community/${categoryId}/threads`)
      }).catch(json => {
        dispatch(requestFailure(threadId, json))
      })
  }
}

export function forumThreadUnlock (threadId, categoryId) {
  return (dispatch) => {
    dispatch(requestStarted(categoryId))

    return apiHelper.authorizedRequest('PATCH', 'forum_threads/' + threadId, {
      body: {
        data: {
          type: 'threads',
          id: threadId,
          attributes: {
            locked: false
          }
        }
      }
    })
      .then(json => {
        dispatch(dispatch(forumThreadsGetRequest(categoryId)))
        browserHistory.push(`/community/${categoryId}/threads`)
      }).catch(json => {
        dispatch(requestFailure(threadId, json))
      })
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FORUM_THREADS_GET_REQUEST_STARTED]: (state, action) => Object.assign({}, state, {
    [action.categoryId]: {
      loading: true,
      loaded: false,
      error: null,
      data: state[action.categoryId] ? state[action.categoryId].data : null
    }
  }),
  [FORUM_THREADS_GET_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    [action.categoryId]: {
      loading: false,
      loaded: true,
      error: null,
      data: action.data
    }
  }),
  [FORUM_THREADS_GET_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
    [action.categoryId]: {
      loading: false,
      loaded: false,
      error: action.error,
      data: null
    }
  }),
  [FORUM_THREADS_GET_DELETE_SUCCESS]: (state, action) => Object.assign({}, state, {
    [action.categoryId]: {
      loading: false,
      loaded: true,
      error: null,
      threadId: action.threadId
    }
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function forumThreadsGetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
