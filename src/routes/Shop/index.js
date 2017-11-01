// import { injectReducer } from 'store/reducers'

export default (store) => ({
  path        : '/shop',
  indexRoute  : indexRoute(store),
  childRoutes : [
    pageRoute(store, 1),
    pageRoute(store, 2),
    pageRoute(store, 3),
    pageRoute(store, 4),
  ]
})

function indexRoute (store) {
  return {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const Shop = require('./components/Shop').default
        cb(null, Shop)
      }, 'shop')
    }
  }
}

function pageRoute (store, number) {
  var page = '';
  var PAGE = '';
  switch(number) {
    case 1: 
      page = 'buy';
      PAGE = 'ProductBuy';
      break;
  }

  return {
    path: page,
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const FormPage = require('./components/' + PAGE).default
        cb(null, FormPage)
      }, 'formpage')
    }
  }
}