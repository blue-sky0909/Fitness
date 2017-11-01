import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as notifReducer } from 'redux-notifications'

import userGet from './userGet'
import notificationsGet from './notificationsGet'
import notificationsReadPost from './notificationsReadPost'
import subscriptionStripePost from './subscriptionStripePost'
import subscriptionStripeCancel from './subscriptionStripeCancel'
import subscriptionStripeUpdate from './subscriptionStripeUpdate'
import selectUnReadMessageIdGet from './selectUnReadMessageId'
import forumReplyPatch from '../routes/Community/routes/ForumCategory/routes/ForumThread/reducers/forumReplyPatch'
import login from '../routes/Login/reducers/login'
import pageOneReducer from '../routes/Blueprint/reducers/pageOne'
import pageTwoReducer from '../routes/Blueprint/reducers/pageTwo'
import pageThreeReducer from '../routes/Blueprint/reducers/pageThree'
import pageFourReducer from '../routes/Blueprint/reducers/pageFour'
import progressBarReducer from '../routes/Blueprint/reducers/progressBar'
import mealPlanGet from '../routes/MealPlans/routes/EditMealPlan/reducers/mealPlanGet'
import mealPlanCreate from '../routes/MealPlans/routes/EditMealPlan/reducers/mealPlanCreate'
import foodsGet from '../routes/MealPlans/routes/EditMealPlan/reducers/foodsGet'
import mealTitle from '../routes/MealPlans/routes/EditMealPlan/reducers/mealTitleUpdate'
import mealMarco from '../routes/MealPlans/routes/EditMealPlan/reducers/mealMarcoSet'
import mealFoods from '../routes/MealPlans/routes/EditMealPlan/reducers/mealFoods'
import customMealPlanReducer from '../routes/CustomMealPlan/reducers/customMealPlan'

export const makeRootReducer = ( asyncReducers ) => {

  return combineReducers({
    form: formReducer,
    notifs: notifReducer,
    login,
    customMealPlanReducer,
    userGet,
    notificationsGet,
    notificationsReadPost,
    subscriptionStripePost,
    subscriptionStripeCancel,
    subscriptionStripeUpdate,
    selectUnReadMessageIdGet,
    forumReplyPatch,
    pageOneReducer,
    pageTwoReducer,
    pageThreeReducer,
    pageFourReducer,
    progressBarReducer,
    mealPlanGet,
    mealPlanCreate,
    foodsGet,
    mealTitle,
    mealMarco,
    mealFoods,
    ...asyncReducers
  })
}

export const injectReducer = ( store, { key, reducer } ) => {
  if ( Object.hasOwnProperty.call(store.asyncReducers, key) ) return

  store.asyncReducers[ key ] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
