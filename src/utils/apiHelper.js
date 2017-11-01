import config from 'config'
import user from 'auth/user'

function extendOptions (method, options, token = false) {
  options.body && (options.body = JSON.stringify(options.body))

  const headers = {
    'Content-Type': 'application/json'
  }

  if (token) {
    headers['Authorization'] = 'Bearer ' + user.token
  }

  return _.assign({}, options, { method, headers })
}

export default {
  anonimousRequest (method, path, options) {
    return fetch(`${config.apiHost}/${path}`, extendOptions(method, options))
      .then(response => {
        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json)
        })
      })
  },

  authorizedRequest (method, path, options) {
    return fetch(`${config.apiHost}/${path}`, extendOptions(method, options, true))
      .then(response => {
        if (response.status === 401) {
          return Promise.reject(new Error('Unauthorized'))
        }

        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json)
        })
      })
  }
}
