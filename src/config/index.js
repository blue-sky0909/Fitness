export default {
  apiHost: 'http://apidevelopinstance.us-west-2.elasticbeanstalk.com',
  // apiHost: 'http://localhost:3001',
  dateFormat: 'L',
  messagesUpdateInterval: 5000,
  notificationsUpdateInterval: 5000,
  plans: {
    'basic': {
      coast: 1
    },
    'advanced': {
      coast: 2
    }
  },
  stripeKey: 'pk_test_GiWMBXM28feMixQguajmw3Gn',
  bucketName: 'iifym-customer-dashboard'
}
