import { apiHelper } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const CONVERSATIONS_GET_REQUEST_STARTED = 'CONVERSATIONS_GET_REQUEST_STARTED'
export const CONVERSATIONS_GET_REQUEST_SUCCESS = 'CONVERSATIONS_GET_REQUEST_SUCCESS'
export const CONVERSATIONS_GET_REQUEST_FAILURE = 'CONVERSATIONS_GET_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function requestStarted () {
  return {
    type: CONVERSATIONS_GET_REQUEST_STARTED
  }
}

export function requestSuccess (json) {
  return {
    type: CONVERSATIONS_GET_REQUEST_SUCCESS,
    data: json
  }
}

export function requestFailure (error) {
  return {
    type: CONVERSATIONS_GET_REQUEST_FAILURE,
    error: error
  }
}

export function conversationsGetRequest () {
  return (dispatch) => {
    dispatch(requestStarted())

    return apiHelper.authorizedRequest('GET', 'conversations', {})
      .then(json => {
        json.formattedData = []
        if (json.data) {
          json.formattedData = _.map(json.data, (item) => ({
            id: item.id,
            coach:
              item.relationships.coach.data &&
              _.find(json.included, x => x.type === 'coaches' && x.id === item.relationships.coach.data.id),
            customer:
              item.relationships.customer.data &&
              _.find(
                json.included,
                x => x.type === 'customers' && x.id === item.relationships.customer.data.id),
            lastMessage:
              item.relationships['last-message'].data &&
              _.find(
                json.included,
                x => x.type === 'last-messages' && x.id === item.relationships['last-message'].data.id),
            ...item.attributes
          }))
        }
        dispatch(requestSuccess(json))
      }).catch(json => {
        dispatch(requestFailure(json))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CONVERSATIONS_GET_REQUEST_STARTED]: (state, action) => Object.assign({}, state, action.data, {
    loading: true,
    loaded: false,
    error: null,
    data: state.data
  }),
  [CONVERSATIONS_GET_REQUEST_SUCCESS]: (state, action) => Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: action.data
  }),
  [CONVERSATIONS_GET_REQUEST_FAILURE]: (state, action) => Object.assign({}, state, {
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
export default function conversationsGetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
