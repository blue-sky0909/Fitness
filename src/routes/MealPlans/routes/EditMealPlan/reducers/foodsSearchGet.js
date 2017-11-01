import { apiHelper } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const FOODS_SEARCH_GET_REQUEST_STARTED = 'FOODS_SEARCH_GET_REQUEST_STARTED'
export const FOODS_SEARCH_GET_REQUEST_SUCCESS = 'FOODS_SEARCH_GET_REQUEST_SUCCESS'
export const FOODS_SEARCH_GET_REQUEST_FAILURE = 'FOODS_SEARCH_GET_REQUEST_FAILURE'
export const FOODS_SEARCH_RESULTS_RESET = 'FOODS_SEARCH_RESULTS_RESET'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: FOODS_SEARCH_GET_REQUEST_STARTED
  }
}

export function requestSuccess (json) {
  return {
    type: FOODS_SEARCH_GET_REQUEST_SUCCESS,
    data: json
  }
}

export function requestFailure (error) {
  return {
    type: FOODS_SEARCH_GET_REQUEST_FAILURE,
    error: error
  }
}

export function resetSearchResults () {
  return {
    type: FOODS_SEARCH_RESULTS_RESET
  }
}

export function searchFoodsRequest (query, page = 1, size = 20, sortBy = 'id') {
  return (dispatch) => {
    dispatch(requestStarted())

    return apiHelper.authorizedRequest('GET',
      `foods?filter[name][like]=%${query}%&page[number]=${page}&page[size]=${size}&sort=${sortBy}`, {})
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

const initialState = {
  loaded: false,
  loading: false,
  error: null,
  data: {
    formattedData: []
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FOODS_SEARCH_GET_REQUEST_STARTED]: (state, action) => Object.assign({}, state, {
    loading: true,
    loaded: false,
    error: null,
    data: state.data
  }),
  [FOODS_SEARCH_GET_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: {
      ...action.data,
      formattedData: [
        ...state.data.formattedData,
        ...action.data.formattedData
      ]
    }
  }),
  [FOODS_SEARCH_GET_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: false,
    error: action.error,
    data: state.data
  }),
  [FOODS_SEARCH_RESULTS_RESET]: (state, action) => Object.assign({}, state, initialState)
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function mealPlansGetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
