export const PAGE_THREE_UPDATE_SUCCESS = 'PAGE_THREE_UPDATE_SUCCESS'
export const PAGE_THREE_UPDATE_REQUEST = 'PAGE_THREE_UPDATE_REQUEST'

const initialState = {
  pageThreeData: {
    actively_dieting: 'no_just_started',
    tracking_macros: 'no',
    tracking_calories: 'no'
  }
}
const pageThreeReducer = function ( state = initialState, action ) {
  switch ( action.type ) {
    case PAGE_THREE_UPDATE_SUCCESS:
      let three = state.pageThreeData
      three[ action.field ] = action.value
      return Object.assign({}, state, {
        three
      })
    default:
      return state
  }
}

export default pageThreeReducer
