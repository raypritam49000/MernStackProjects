import { combineReducers } from 'redux'
import productReducer from './products.reducer'
import cartReducer from './cart.reducer'
import wishlistReducer from './wishlist.reducer'
import compareReducer from './compare.reducer'
import filterReducer from './filters.reducer'
import { IntlReducer as Intl } from 'react-redux-multilingual'

const rootReducer = combineReducers({
    data: productReducer,
    cartList: cartReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
    filters: filterReducer,
    Intl
});

export default rootReducer;