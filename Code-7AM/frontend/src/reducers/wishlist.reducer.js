import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../constants/actionTypes";

const wishlistReducer = (state = { list: [] }, action) => {
    switch (action.type) {
        case ADD_TO_WISHLIST:
            const productId = action.product.id;
            if (state.list.findIndex(p => p.id === productId) !== -1) {
                return { ...state };
            }
            const data = { list: [...state.list, action.product] }
            return data;
            break;
        case REMOVE_FROM_WISHLIST:
            const pId = action.productId;
            return { list: state.list.filter(p => p.id !== pId) }
            break;

        default:
    }
    return state;
}

export default wishlistReducer;