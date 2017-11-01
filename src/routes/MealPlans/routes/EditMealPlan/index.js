import { injectReducer } from 'store/reducers'

export default (store) => ({
  path        : ':mealPlanId',
  indexRoute  : indexRoute(store),
  childRoutes: []
})

function indexRoute (store) {
  return {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const mealPlanGet = require('./reducers/mealPlanGet').default
        injectReducer(store, {
          key: 'mealPlanGet',
          reducer: mealPlanGet
        })

        const dayMealsGet = require('./reducers/dayMealsGet').default
        injectReducer(store, {
          key: 'dayMealsGet',
          reducer: dayMealsGet
        })

        const mealGet = require('./reducers/mealGet').default
        injectReducer(store, {
          key: 'mealGet',
          reducer: mealGet
        })

        const mealFoodsQuantities = require('./reducers/mealFoodsQuantities').default
        injectReducer(store, {
          key: 'mealFoodsQuantities',
          reducer: mealFoodsQuantities
        })

        const foodsGet = require('./reducers/foodsGet').default
        injectReducer(store, {
          key: 'foodsGet',
          reducer: foodsGet
        })

        const foodsSearchGet = require('./reducers/foodsSearchGet').default
        injectReducer(store, {
          key: 'foodsSearchGet',
          reducer: foodsSearchGet
        })

        const MealPlanContainer = require('../../containers/meal-plan/MealPlanContainer').default
        cb(null, MealPlanContainer)
      }, 'meal-plan')
    }
  }
}
