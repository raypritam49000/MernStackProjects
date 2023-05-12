import { RECEIVE_PRODUCTS } from "../constants/actionTypes";

const iState = {
    products: [],
    symbol: '₹'
};

const productReducer = (state = iState, action) => {
    switch (action.type) {
        case RECEIVE_PRODUCTS:
            return {
                ...state,
                products: action.products

            }
            break;
        default:
            return state;
    }
    return state;
}

export default productReducer;