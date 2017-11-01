const PROGRESS_BAR_UPDATE_SUCCESS = 'PROGRESS_BAR_UPDATE_SUCCESS'
const PROGRESS_BAR_UPDATE_REQUEST = 'PROGRESS_BAR_UPDATE_REQUEST'

export function updateRequest () {
  return {
    type: PROGRESS_BAR_UPDATE_REQUEST
  }

}

export function updateDataSuccess (value) {
  return {
    type: PROGRESS_BAR_UPDATE_SUCCESS,
    payload: { value: value }
  }

}

export function showMetric (value) {
  return ( dispatch ) => {
    dispatch(updateRequest())
    dispatch(updateDataSuccess(value))
  }
}
