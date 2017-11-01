import { connect } from 'react-redux'
import { subscriptionStripePostRequest } from 'store/subscriptionStripePost'
import { userGetRequest } from 'store/userGet'

import PurchaseMembership from 'components/membership/PurchaseMembership'

const mapDispatchToProps = (dispatch) => ({
  userGetRequest: () => dispatch(userGetRequest()),
  subscriptionStripePostRequest: (type, token) => dispatch(subscriptionStripePostRequest(type, token))
})

const mapStateToProps = (state) => ({
  userGet: state.userGet,
  subscriptionStripePost: state.subscriptionStripePost
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseMembership)
