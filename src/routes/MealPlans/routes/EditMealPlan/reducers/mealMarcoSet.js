
export const UPDATE_MACROS_VALUE_SUCCESS = 'UPDATE_MACROS_VALUE_SUCCESS'
export const UPDATE_MACROS_VALUE_REQUEST = 'UPDATE_MACROS_VALUE_REQUEST'

export function saveCalculatorRequest() {
  return {
    type: UPDATE_MACROS_VALUE_REQUEST
  }
}
export function saveCalculatorSuccess(val, index) {
  return {
    type: UPDATE_MACROS_VALUE_SUCCESS,
    data: val,
    index: index
  }
}

let id = 0
export function saveCalculator(val, index, mealPlanId) {
  return(dispatch) => {
    if(id != mealPlanId) {
      dispatch(saveCalculatorRequest())
      id = mealPlanId
    }    
    dispatch(saveCalculatorSuccess(val, index))
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_MACROS_VALUE_REQUEST]: (state, action) => 
  Object.assign({}, state, {
    loading: false,
    loaded: true,
    error: null,
    data: _.times(4, _.constant({}))
  }),
  [UPDATE_MACROS_VALUE_SUCCESS]: (state, action) => {
    let data = state.data
    data[action.index] = action.data
    return Object.assign({}, state, {
      loading: false,
      loaded: true,
      error: null,
      data: data
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: _.times(4, _.constant({}))
}
export default function mealMarcoSetReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
