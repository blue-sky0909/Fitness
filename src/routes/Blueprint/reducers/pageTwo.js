export const PAGE_TWO_UPDATE_SUCCESS = 'PAGE_TWO_UPDATE_SUCCESS'
export const PAGE_TWO_UPDATE_REQUEST = 'PAGE_TWO_UPDATE_REQUEST'

const initialState = {
    pageTwoData: {
      activity_level_new: 0
    }
}
const pageTwoReducer = function(state=initialState, action) {
    switch(action.type) {
        case PAGE_TWO_UPDATE_SUCCESS:
            let two = state.pageTwoData
            two[action.field] = action.value
            return Object.assign({}, state, {
                two
            })
        default:
            return state
    }
}

export default pageTwoReducer
