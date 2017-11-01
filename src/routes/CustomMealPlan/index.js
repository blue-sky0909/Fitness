import MealPlanForm from './components/MealPlanForm';
import { mealPlanFormURL } from 'routes/urlGenerators';

export default (store) => ({
  path        : '/custom-meal-plan',
  indexRoute  : indexRoute(store),
  childRoutes : [
	formPage()
  ]
})

function indexRoute (store) {
  return {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const CustomMealPlan = require('./CustomMealPlan').default
        cb(null, CustomMealPlan)
      }, 'custom-meal-plan')
    }
  }
}

function formPage (store) {
	return {
	  path: 'meal-plan-form',
	  getComponent (nextState, cb) {
	    require.ensure([], (require) => {
	      const FormPage = require('./components/MealPlanForm').default
	      cb(null, FormPage)
	    }, 'formpage')
	  }
	}
}