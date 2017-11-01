import { injectReducer } from 'store/reducers'
import CreateMealPlan from './routes/CreateMealPlan'
import EditMealPlan from './routes/EditMealPlan'

export default (store) => ({
  path        : '/meal-plans',
  indexRoute  : indexRoute(store),
  childRoutes: [
    CreateMealPlan(store),
    EditMealPlan(store)
  ]
})

function indexRoute (store) {
  return {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const mealPlansGet = require('./reducers/mealPlansGet').default
        injectReducer(store, {
          key: 'mealPlansGet',
          reducer: mealPlansGet
        })

        const mealPlanDelete = require('./reducers/mealPlanDelete').default
        injectReducer(store, {
          key: 'mealPlanDelete',
          reducer: mealPlanDelete
        })

        const MealPlans = require('./components/MealPlans').default
        cb(null, MealPlans)
      }, 'mealplans')
    }
  }
}
