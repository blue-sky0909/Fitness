import { apiHelper } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const FOODS_GET_REQUEST_FORMAT = 'FOODS_GET_REQUEST_FORMAT'
export const FOODS_GET_REQUEST_STARTED = 'FOODS_GET_REQUEST_STARTED'
export const FOODS_GET_REQUEST_SUCCESS = 'FOODS_GET_REQUEST_SUCCESS'
export const FOODS_GET_REQUEST_FAILURE = 'FOODS_GET_REQUEST_FAILURE'
export const FOODS_GET_SEARCH_REQUEST_STARTED = 'FOODS_GET_SEARCH_REQUEST_STARTED'
export const FOODS_GET_SEARCH_REQUEST_SUCCESS = 'FOODS_GET_SEARCH_REQUEST_SUCCESS'
export const FOODS_GET_SEARCH_REQUEST_FAILURE = 'FOODS_GET_SEARCH_REQUEST_FAILURE'
// ------------------------------------
// Actions
// ------------------------------------
export function requestFormat () {
  return {
    type: FOODS_GET_REQUEST_FORMAT
  }
}

export function requestStarted () {
  return {
    type: FOODS_GET_REQUEST_STARTED
  }
}

export function requestSuccess (json) {
  return {
    type: FOODS_GET_REQUEST_SUCCESS,
    data: json
  }
}

export function requestFailure (error) {
  return {
    type: FOODS_GET_REQUEST_FAILURE,
    error: error
  }
}

export function requestSearchStarted () {
  return {
    type: FOODS_GET_SEARCH_REQUEST_STARTED
  }
}

export function requestSearchSuccess (json) {
  return {
    type: FOODS_GET_SEARCH_REQUEST_SUCCESS,
    data: json
  }
}

export function requestSearchFailure (error) {
  return {
    type: FOODS_GET_SEARCH_REQUEST_FAILURE,
    error: error
  }
}

export function foodsGetRequest (page = 1, size = 20, sortBy = 'id') {
  return (dispatch) => {
    dispatch(requestStarted())

    return apiHelper.authorizedRequest('GET', `foods?page[number]=${page}&page[size]=${size}&sort=${sortBy}`, {})
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

export function foodsAllGet (page) {
  return (dispatch) => {
    if(page == 1){
      dispatch(requestFormat())
    }else {
      dispatch(requestStarted())
    }    
    return apiHelper.authorizedRequest('GET', `foods?page[number]=${page}&page[size]=20`, {})
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

export function searchFoods(name) {
  const url = `foods?filter[name][like]=%${decodeURI(name)}%&page[size]=100`
  
  return (dispatch) => {
    dispatch(requestSearchStarted())
    return apiHelper.authorizedRequest('GET', `foods?filter[name][like]=%25${name}%25&page[size]=100`, {})
      .then(json => {
        json.formattedData = []
        if (json.data) {
          json.formattedData = _.map(json.data, (item) => ({
            id: item.id,
            ...item.attributes
          }))
        }
        dispatch(requestSearchSuccess(json))
      }).catch(json => {
        dispatch(requestSearchFailure(json))
      })
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FOODS_GET_REQUEST_FORMAT]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: {
      formattedData: []
    }
  }),
  [FOODS_GET_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: state.data
  }),
  [FOODS_GET_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: {
      ...action.data,
      formattedData: [
        ...state.data.formattedData,
        ...action.data.formattedData
      ]
    },
    foodsPage: action.data.meta.page,
    foodsPageCount: action.data.meta.pageCount
  }),
  [FOODS_GET_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: false,
    error: action.error,
    data: state.data
  }),

   [FOODS_GET_SEARCH_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: {
      formattedData: []
    }
  }),
  [FOODS_GET_SEARCH_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: {
      ...action.data,
      formattedData: [
        ...state.data.formattedData,
        ...action.data.formattedData
      ]
    },
    foodsPage: action.data.meta.page,
    foodsPageCount: action.data.meta.pageCount
  }),
  [FOODS_GET_SEARCH_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: false,
    error: action.error,
    data: {
      formattedData: []
    }
  })

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loaded: false,
  loading: false,
  error: null,
  data: {
    formattedData: []
  }
}
export default function mealPlansGetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
