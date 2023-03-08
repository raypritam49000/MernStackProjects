import { FILTER_BRAND, FILTER_COLOR, FILTER_PRICE } from "../constants/actionTypes";

const iState = {
    brand: ['nike', 'lifestyle'],
    value: { min: 0, max: 1000 }
};

const filterReducer = (state = iState, action) => {
    switch (action.type) {
        case FILTER_BRAND:
            return {
                ...state,
                brand: action.brand
            }
        case FILTER_COLOR:
            return {
                ...state,
                color: action.color
            }
        case FILTER_PRICE:
            return {
                ...state,
                value: { min: action.price.value.min, max: action.price.value.max }
            }
        default:
            return state;
    }

}

export default filterReducer;