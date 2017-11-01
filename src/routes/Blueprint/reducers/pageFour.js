export const PAGE_FOUR_UPDATE_SUCCESS = 'PAGE_FOUR_UPDATE_SUCCESS'
export const PAGE_FOUR_UPDATE_REQUEST = 'PAGE_FOUR_UPDATE_REQUEST'
export const CREATE_SUCCESS = 'CREATE_SUCCESS'
export const CREATE_ERROR = 'CREATE_ERROR'
const initialState = {
    pageFourData: {},
    success: false,
    error: false
}
const pageFourReducer = function(state=initialState, action) {
    switch(action.type) {
        case PAGE_FOUR_UPDATE_SUCCESS:
            let four = state.pageFourData
            four[action.field] = action.value
            return Object.assign({}, state, {
                success: false,
                error: false
            })
        case PAGE_FOUR_UPDATE_REQUEST:
            return Object.assign({}, state, {
                success: false,
                error: false
            })
        case CREATE_SUCCESS:
            return Object.assign({}, state, {
                success: true,
                error: false
            })
        case CREATE_ERROR:
            return Object.assign({}, state, {
                success: false,
                error: true
            })
        default:
            return state
    }
}

export default pageFourReducer