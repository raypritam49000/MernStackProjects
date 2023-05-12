import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/actionTypes";

const cartReducer = (state = { cart: [] }, action) => {
   
    switch (action.type) {
        case ADD_TO_CART:
            const productId = action.product.id;
            if (state.cart.findIndex(p => p.id === productId) !== -1) {
                const cart = state.cart.reduce((cartArr, p) => {

                    if (p.id === productId) {
                        cartArr.push({ ...p, qty: (p.qty + action.qty), sum: (p.price - p.discount) * (p.qty + action.qty) });
                    } else {
                        cartArr.push(p);
                    }

                    return cartArr;
                }, []);
                return { cart };
            }

            const data = { cart: [...state.cart, { ...action.product, qty: action.qty, sum: (action.product.price - action.product.discount) * action.qty }] }
            return data;
            break;
        case REMOVE_FROM_CART:
            const pId = action.productId;
            return {
                cart: state.cart.filter(p => p.id !== pId)
            }
            break;

        default:
    }
    return state;
}

export default cartReducer;