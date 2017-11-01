// import { injectReducer } from 'store/reducers'

export default (store) => ({
  path        : '/workouts',
  indexRoute  : indexRoute(store)
})

function indexRoute (store) {
  return {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const Workouts = require('./components/Workouts').default
        cb(null, Workouts)
      }, 'workouts')
    }
  }
}
