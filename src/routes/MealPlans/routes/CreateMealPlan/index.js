// import { injectReducer } from 'store/reducers'

export default (store) => ({
  path        : 'create',
  indexRoute  : indexRoute(store),
  childRoutes: []
})

function indexRoute (store) {
  return {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const MealPlanContainer = require('../../containers/meal-plan/MealPlanContainer').default
        cb(null, MealPlanContainer)
      }, 'create-meal-plan')
    }
  }
}
