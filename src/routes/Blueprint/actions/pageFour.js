import { apiHelper } from 'utils'
import { dashboardUrl } from '../../urlGenerators'
import { browserHistory } from 'react-router'

const PAGE_FOUR_UPDATE_SUCCESS = 'PAGE_FOUR_UPDATE_SUCCESS'
const PAGE_FOUR_UPDATE_REQUEST = 'PAGE_FOUR_UPDATE_REQUEST'
const CREATE_SUCCESS = 'CREATE_SUCCESS'
const CREATE_ERROR = 'CREATE_ERROR'

export function updateRequest () {
  return {
    type: PAGE_FOUR_UPDATE_REQUEST
  }

}

export function updateDataSuccess ( field, value ) {
  return {
    type: PAGE_FOUR_UPDATE_SUCCESS,
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

export function setAllData ( one, two, three, four, userInfo, unitySystem ) {
  const fullName = userInfo[ 'first-name' ] + ' ' + userInfo[ 'last-name' ]
  const orderId = localStorage.getItem('orderId')
  return ( dispatch ) => {
    dispatch(updateRequest())

    const info = [
      { 'key': 'name', 'value': fullName },
      //{ 'key': 'height', 'value': one.height_cms * 2.54 },
      { 'key': 'email', 'value': userInfo.email },
      { 'key': 'gender', 'value': one.gender },
      { 'key': 'age', 'value': one.age },
      // { 'key': 'current_weight', 'value': one.current_weight_imperial },
      // { 'key': 'target_weight', 'value': one.current_goal_imperial },
      //{"key":"body_fat_percentage","value":one.body_fat_percentage},

      { 'key': 'fitness_goal', 'value': one.fitness_goal },
      { 'key': 'know_body_fat', 'value': one.know_body_fat },
      { 'key': 'session_of_strength_training', 'value': two.activity_level },
      { 'key': 'minutes_per_minute_of_lifting_weights', 'value': two.minutes_per_minute_of_lifting_weights },
      { 'key': 'number_of_cardio_sessions', 'value': two.minutes_per_session_of_cardio },
      { 'key': 'activity_level', 'value': two.activity_level },
      { 'key': 'activity_level_new', 'value': two.activity_level_new },
      { 'key': 'cardioExplination', 'value': JSON.stringify(two.weightCardioType) },
      { 'key': 'WeightTrainingType', 'value': JSON.stringify(two.weightTrainingType) },
      { 'key': 'actively_dieting', 'value': three.actively_dieting },

      { 'key': 'tracking_calories', 'value': three.tracking_calories },
      { 'key': 'tracking_macros', 'value': three.tracking_macros },
      // {"key":"if_tracking_macros_protein","value": three.if_tracking_macros_protein},
      // {"key":"if_tracking_macros_carbohydrates","value": three.if_tracking_macros_carbohydrates},
      // {"key":"if_tracking_macros_fat","value": three.if_tracking_macros_fat},
      // {"key":"if_tracking_macros_kind_of_diet","value": three.if_tracking_macros_kind_of_diet},

      { 'key': 'medical_considerations', 'value': JSON.stringify(four.medical_considerations) }
    ]

    if ( 'yes' === one.know_body_fat ) {
      info.push({ 'key': 'body_fat_percentage', 'value': one.body_fat_percentage })
    }
    if ( 'yes' === three.tracking_calories ) {
      info.push({ 'key': 'how_many_calories_are_you_supposed', 'value': three.how_many_calories_are_you_supposed })
      info.push({
        'key': 'how_many_calories_are_you_actually_hit',
        'value': three.how_many_calories_are_you_actually_hit
      })
    }
    if ( 'yes' === three.tracking_macros ) {
      info.push({ 'key': 'if_tracking_macros_protein', 'value': three.if_tracking_macros_protein })
      info.push({ 'key': 'if_tracking_macros_carbohydrates', 'value': three.if_tracking_macros_carbohydrates })
      info.push({ 'key': 'if_tracking_macros_fat', 'value': three.if_tracking_macros_fat })
    }

    if ( three.if_tracking_macros_kind_of_diet && three.if_tracking_macros_kind_of_diet.length ) {
      info.push({ 'key': 'if_tracking_macros_kind_of_diet', 'value': three.if_tracking_macros_kind_of_diet })
    }

    if ( 'female' === one.gender ) {
      info.push({ 'key': 'are_you_pregnant_or_nursing', 'value': one.are_you_pregnant_or_nursing })
      if ( 'yes_i_am_pregnant' === one.are_you_pregnant_or_nursing ) {
        info.push({ 'key': 'if_pregnant_how_many_months', 'value': one.pregnant_months })
      }
    }

    if ( unitySystem ) {
      info.push({ 'key': 'height', 'value': (parseInt(one.height_cms) * (1 / 2.54)) })
      info.push({ 'key': 'current_weight', 'value': parseInt(one.current_weight_metric) * 2.2046 })
      info.push({ 'key': 'target_weight', 'value': parseInt(one.current_goal_metric) * 2.2046 })
      info.push({ 'key': 'unit_system', 'value': 'metric' })
    } else {
      info.push({ 'key': 'height', 'value': parseInt(one.height_feet) * 12 + parseInt(one.height_inches) })
      info.push({ 'key': 'current_weight', 'value': parseInt(one.current_weight_imperial) })
      info.push({ 'key': 'target_weight', 'value': parseInt(one.current_goal_imperial) })
      info.push({ 'key': 'unit_system', 'value': 'imperial' })
    }

    if ( 'yes_started_already' === three.actively_dieting ) {
      info.push({ 'key': 'how_weeks_dieting_for', 'value': three.how_weeks_dieting_for })
      info.push({ 'key': 'how_have_been_the_results', 'value': three.how_have_been_the_results })
    }

    if ( four.diseases_we_should_know_of ) {
      info.push({ 'key': 'diseases_we_should_know_of', 'value': four.diseases_we_should_know_of })
    }
    if ( four.list_all_prescription ) {
      info.push({ 'key': 'list_all_prescription', 'value': four.list_all_prescription })
    }

    if ( four.list_all_supplements ) {
      info.push({ 'key': 'list_all_supplements', 'value': four.list_all_supplements })
    }

    if ( four.current_injuries ) {
      info.push({ 'key': 'current_injuries', 'value': four.current_injuries })
    }

    if ( four.extra_info ) {
      info.push({ 'key': 'extra_info', 'value': four.extra_info })
    }

    let method = 'POST'
    let endpoint = 'infos'
    if ( one.editing ) {
      method = 'PATCH'
      endpoint = 'infos/' + orderId
    }

    console.log(unitySystem);

    return apiHelper.authorizedRequest(method, endpoint, {
      body: {
        'order': orderId,
        'info': info
      }
    }).then(json => {
      console.log(json)
      dispatch(createSuccess(json))
      browserHistory.push(dashboardUrl())
    }).catch(json => {
      console.log(json)
      dispatch(createFailure(json))
      browserHistory.push(dashboardUrl())
    })
  }
}
