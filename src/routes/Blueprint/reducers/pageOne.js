export const PAGE_ONE_UPDATE_SUCCESS = 'PAGE_ONE_UPDATE_SUCCESS'
export const PAGE_ONE_UPDATE_REQUEST = 'PAGE_ONE_UPDATE_REQUEST'

const initialState = {
  pageOneData: {
    gender: 'female',
    know_body_fat: 'no',
    fitness_goal: 'Burn fat, lose weight, get toned',
    editing: false,
  }
}
const pageOneReducer = function ( state = initialState, action ) {
  switch ( action.type ) {
    case PAGE_ONE_UPDATE_SUCCESS:
      let one = state.pageOneData
      one[ action.field ] = action.value
      return Object.assign({}, state, {
        one
      })
    default:
      return state
  }
}

export default pageOneReducer
