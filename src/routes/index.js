// We only need to import the modules necessary for initial render
import MainLayout from 'layouts/MainLayout/MainLayout'
import NavigationLayout from 'layouts/NavigationLayout/NavigationLayout'
import AuthorizedContainer from 'containers/AuthorizedContainer'
import PlansContainer from 'containers/PlansContainer'
import PurchaseMembershipContainer from 'containers/PurchaseMembershipContainer'
import Dashboard from './Dashboard'
import OrderDetails from './OrderDetails'
import Login from './Login'
import Shop from './Shop'
import MealPlans from './MealPlans'
//import Workouts from './Workouts'
import Community from './Community'
import ContactMyCoach from './ContactMyCoach'
import Profile from './Profile'
import Notifications from './Notifications'
import Blueprint from './Blueprint'
import CustomMealPlan from './CustomMealPlan'
import * as urlGenerators from './urlGenerators'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : urlGenerators.homeUrl(),
  component   : MainLayout,
  childRoutes: [
    {
      component: AuthorizedContainer,
      childRoutes: [
        {
          component: NavigationLayout,
          indexRoute: Dashboard(store),
          childRoutes: [
            {
              path: 'membership',
              component: PlansContainer
            },
            {
              path: 'membership/:plan/purchase',
              component: PurchaseMembershipContainer
            },
            OrderDetails(store),
            Shop(store),
            MealPlans(store),
            //Workouts(store),
            Community(store),
            ContactMyCoach(store),
            Profile(store),
            Notifications(store),
            Blueprint(store),
            CustomMealPlan(store)
          ]
        }
      ]
    },
    Login(store)
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
