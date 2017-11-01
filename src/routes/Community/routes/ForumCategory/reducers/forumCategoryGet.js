import { apiHelper } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const FORUM_CATEGORY_GET_REQUEST_STARTED = 'FORUM_CATEGORY_GET_REQUEST_STARTED'
export const FORUM_CATEGORY_GET_REQUEST_SUCCESS = 'FORUM_CATEGORY_GET_REQUEST_SUCCESS'
export const FORUM_CATEGORY_GET_REQUEST_FAILURE = 'FORUM_CATEGORY_GET_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted (categoryId) {
  return {
    type: FORUM_CATEGORY_GET_REQUEST_STARTED,
    categoryId
  }
}

export function requestSuccess (categoryId, json) {
  return {
    type: FORUM_CATEGORY_GET_REQUEST_SUCCESS,
    data: json,
    categoryId
  }
}

export function requestFailure (categoryId, error) {
  return {
    type: FORUM_CATEGORY_GET_REQUEST_FAILURE,
    error: error,
    categoryId
  }
}

export function forumCategoryGetRequest (categoryId) {
  return (dispatch) => {
    dispatch(requestStarted(categoryId))

    return apiHelper.authorizedRequest('GET', 'forum_categories/' + categoryId, {})
      .then(json => {
        dispatch(requestSuccess(categoryId, json))
      }).catch(json => {
        dispatch(requestFailure(categoryId, json))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FORUM_CATEGORY_GET_REQUEST_STARTED]: (state, action) => Object.assign({}, state, {
    [action.categoryId]: {
      loading: true,
      loaded: false,
      error: null,
      data: state[action.categoryId] ? state[action.categoryId].data : null
    }
  }),
  [FORUM_CATEGORY_GET_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    [action.categoryId]: {
      loading: false,
      loaded: true,
      error: null,
      data: action.data
    }
  }),
  [FORUM_CATEGORY_GET_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
    [action.categoryId]: {
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
export default function forumCategoryGetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
