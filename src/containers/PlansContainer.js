import { connect } from 'react-redux'
import { subscriptionStripeCancelRequest } from 'store/subscriptionStripeCancel'
import { subscriptionStripeUpdateRequest, downgradePlan, upgradePlan } from 'store/subscriptionStripeUpdate'
import {userPatchRequest} from '../routes/Profile/routes/ProfileEdit/reducers/userPatch'
import { actions as notifActions } from 'redux-notifications'
import { userGetRequest } from 'store/userGet'
import Plans from 'components/membership/Plans'

const mapDispatchToProps = ( dispatch ) => ({
  userGetRequest: () => dispatch(userGetRequest()),
  subscriptionStripeCancelRequest: () => dispatch(subscriptionStripeCancelRequest()),
  downgradePlan: ( title, customer, current_plan, new_plan, url ) =>
    dispatch(downgradePlan(title, customer, current_plan, new_plan, url)),
  upgradePlan: ( title, customer, current_plan, new_plan, url ) =>
    dispatch(upgradePlan(title, customer, current_plan, new_plan, url)),
  subscriptionStripeUpdateRequest: ( type ) => dispatch(subscriptionStripeUpdateRequest(type)),
  showNotification: data => dispatch(notifActions.notifSend(data)),
  userPatchRequest: (userId, data) => dispatch(userPatchRequest(userId, data))
})

const mapStateToProps = ( state ) => ({
  userGet: state.userGet,
  subscriptionStripeCancel: state.subscriptionStripeCancel,
  subscriptionStripeUpdate: state.subscriptionStripeUpdate
})

export default connect(mapStateToProps, mapDispatchToProps)(Plans)
