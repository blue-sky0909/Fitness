export const PROGRESS_BAR_UPDATE_SUCCESS = 'PROGRESS_BAR_UPDATE_SUCCESS'
export const PROGRESS_BAR_UPDATE_REQUEST = 'PROGRESS_BAR_UPDATE_REQUEST'

const initialState = {
  flag: false
}
const progressBarReducer = function ( state = initialState, action ) {
  switch ( action.type ) {
    case PROGRESS_BAR_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        flag: action.payload.value
      })
    default:
      return state
  }
}

export default progressBarReducer
