import { ADD_TO_COMPARE, REMOVE_FROM_COMPARE } from "../constants/actionTypes";

const compareReducer = (state = { item: [] }, action) => {
    switch (action.type) {
        case ADD_TO_COMPARE:
            const productId = action.product.id;
            if (state.item.findIndex(p => p.id === productId) !== -1) {
                return { ...state };
            }
            const data = { item: [...state.item, action.product] }
            return data;
            break;
        case REMOVE_FROM_COMPARE:
            const pId = action.productId;
            return { item: state.item.filter(p => p.id !== pId) }
            break;

        default:
    }
    return state;
}

export default compareReducer;