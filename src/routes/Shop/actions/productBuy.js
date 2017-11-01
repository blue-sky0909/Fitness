// import { push } from 'react-router-redux';
import { browserHistory } from 'react-router'
const PRODUCT_BUY_RQUEST = 'PRODUCT_BUY_RQUEST'

export function buyRequest() {
    return{
        type: PRODUCT_BUY_RQUEST
    }
}
export function productBuyRequest() {
    return (dispatch) => {
        dispatch(buyRequest())
       browserHistory.push('/shop/buy')
    }

}