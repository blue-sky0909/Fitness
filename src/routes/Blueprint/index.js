export default (store) => ({
  path        : '/blueprint',
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
        const Blueprint = require('./components/Blueprint').default
        cb(null, Blueprint)
      }, 'blueprint')
    }
  }
}

function pageRoute (store, number) {
  let page = '';
  let PAGE = '';
  switch(number) {
    case 1:
      page = 'page-one';
      PAGE = 'PageOne';
      break;
    case 2:
      page = 'page-two';
      PAGE = 'PageTwo';
      break;
    case 3:
      page = 'page-three';
      PAGE = 'PageThree';
      break;
    case 4:
      page = 'page-four';
      PAGE = 'PageFour';
      break;
  }

  return {
    path: page,
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const FormPage = require('./components/FormPages/' + PAGE).default
        cb(null, FormPage)
      }, 'formpage')
    }
  }
}
