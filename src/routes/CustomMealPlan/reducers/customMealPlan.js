const CUSTOM_MEAL_PLAN_UPDATE_SUCCESS = 'CUSTOM_MEAL_PLAN_UPDATE_SUCCESS'


const initialState = {
  customMealPlan: {}
}
const customMealPlanReducer = function ( state = initialState, action ) {
  switch ( action.type ) {
    case CUSTOM_MEAL_PLAN_UPDATE_SUCCESS:
      let data = state.customMealPlan
      data[ action.field ] = action.value
      return Object.assign({}, state, {
        data
      })
    default:
      return state
  }
}

export default customMealPlanReducer
