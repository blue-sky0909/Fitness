import { apiHelper } from 'utils'
import { dashboardUrl } from '../../urlGenerators'
import { browserHistory } from 'react-router'

const CUSTOM_MEAL_PLAN_UPDATE_SUCCESS = 'CUSTOM_MEAL_PLAN_UPDATE_SUCCESS'
const CUSTOM_MEAL_PLAN_UPDATE_REQUEST = 'CUSTOM_MEAL_PLAN_UPDATE_REQUEST'
const CREATE_SUCCESS = 'CREATE_SUCCESS'
const CREATE_ERROR = 'CREATE_ERROR'

export function updateRequest () {
  return {
    type: CUSTOM_MEAL_PLAN_UPDATE_REQUEST
  }

}

export function updateDataSuccess ( field, value ) {
  return {
    type: CUSTOM_MEAL_PLAN_UPDATE_SUCCESS,
    field: field,
    value: value
  }
}

export function updateData ( field, value ) {
  return ( dispatch ) => {
    dispatch(updateRequest())
    dispatch(updateDataSuccess(field, value))
  }
}

export function createSuccess ( res ) {
  return {
    type: CREATE_SUCCESS,
    data: res
  }
}

export function createFailure ( res ) {
  return {
    type: CREATE_ERROR,
    error: res
  }
}

export function setAllData ( customMealPlan ) {
  const orderId = localStorage.getItem('orderId')
  const  data  = customMealPlan
  return ( dispatch ) => {
    dispatch(updateRequest())

    const info = [

      { 'key': 'foods_you_are_allergic', 'value': data.foods_you_are_allergic },
      { 'key': 'specific_lifestyle', 'value': JSON.stringify(data.specific_lifestyle) },
      { 'key': 'breakfast_choices', 'value': JSON.stringify(data.breakfast_choices) },
      { 'key': 'lunch', 'value': JSON.stringify(data.lunch_choices) },
      { 'key': 'dinner', 'value': JSON.stringify(data.dinner_choices) },
      { 'key': 'snacks', 'value': JSON.stringify(data.snacks_choices) },
    ]
    if ( data.hasOwnProperty('protein_powder') && data.protein_powder ) {
      info.push({ 'key': 'protein_powder', 'value': data.protein_powder })
    }

    let method = 'POST'
    let endpoint = 'infos'
    if ( customMealPlan.editing ) {
      method = 'PATCH'
      endpoint = 'infos/' + orderId
    }

    return apiHelper.authorizedRequest(method, endpoint, {
      body: {
        'order': orderId,
        'info': info
      }
    }).then(json => {
      dispatch(createSuccess(json))
      browserHistory.push(dashboardUrl())
    }).catch(json => {
      dispatch(createFailure(json))
      browserHistory.push(dashboardUrl())
    })
  }
}
