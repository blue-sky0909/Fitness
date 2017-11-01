import { apiHelper } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const FORUM_CATEGORIES_GET_REQUEST_STARTED = 'FORUM_CATEGORIES_GET_REQUEST_STARTED'
export const FORUM_CATEGORIES_GET_REQUEST_SUCCESS = 'FORUM_CATEGORIES_GET_REQUEST_SUCCESS'
export const FORUM_CATEGORIES_GET_REQUEST_FAILURE = 'FORUM_CATEGORIES_GET_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: FORUM_CATEGORIES_GET_REQUEST_STARTED
  }
}

export function requestSuccess (json) {
  return {
    type: FORUM_CATEGORIES_GET_REQUEST_SUCCESS,
    data: json
  }
}

export function requestFailure (error) {
  return {
    type: FORUM_CATEGORIES_GET_REQUEST_FAILURE,
    error: error
  }
}

export function forumCategoriesGetRequest () {
  return (dispatch) => {
    dispatch(requestStarted())
    return apiHelper.authorizedRequest('GET', 'forum_categories', {})
      .then(json => {
        json.formattedData = []
        if (json.data) {
          json.formattedData = _.map(json.data, (item) => ({
            id: item.id,
            ...item.attributes
          }))
        }
        dispatch(requestSuccess(json))
      }).catch(json => {
        dispatch(requestFailure(json))
      })
  }
}

export function forumupdateCategory (categoryId, title, description, proAccess) {
  console.log(categoryId, title, proAccess)
  return (dispatch) => {
    dispatch(requestStarted())

    return apiHelper.authorizedRequest('PATCH', 'forum_categories/' + categoryId, {
      body: {
        data: {
          id: categoryId,
          type: "forum_categories",
          attributes: {
            title: title,
            description: description,
            order_placement: categoryId,
            is_pro: proAccess
          }
        }  
      }
    })
      .then(json => {        
        dispatch(forumCategoriesGetRequest())
      }).catch(json => {
        dispatch(requestFailure())
      })
  }
}

export function forumCreateCategory (title, description, proAccess) {
  return (dispatch) => {
    dispatch(requestStarted())
    return apiHelper.authorizedRequest('POST', 'forum_categories', {
      body: {
          "data": {
          "type": "categories",
          "attributes": {
            "title": title,
            "description": description,
            is_pro: proAccess
          }
        } 
      }
    })
      .then(json => {
        dispatch(forumCategoriesGetRequest())
      }).catch(json => {
        dispatch(requestFailure(json))
      })
  }
}

export function forumDeleteCategory (id) {
  return (dispatch) => {
    dispatch(requestStarted())
    return apiHelper.authorizedRequest('DELETE', `forum_categories/${id}`, {})
      .then(json => {
        console.log(json)
        dispatch(forumCategoriesGetRequest())
      }).catch(json => {
        console.log(json)
        dispatch(requestFailure(json))
      })
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FORUM_CATEGORIES_GET_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: state.data
  }),
  [FORUM_CATEGORIES_GET_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [FORUM_CATEGORIES_GET_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
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
export default function forumCategoriesGetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
