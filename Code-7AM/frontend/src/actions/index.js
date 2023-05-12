import * as types from '../constants/actionTypes'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dataService } from '../services/data.service';

export const changeloggedIn = (isLoggedIn, user) => {
    return (dispatch) => {
        dispatch({
            type: types.userActionTypes.LOGIN_SUCCESS,
            payload: { isLoggedIn: isLoggedIn, userData: user }
        })
    }
}

export const getAllProducts = () => (dispatch) => {
    dataService.getAllProductList()
        .then(products => {
            dispatch(receiveProducts(products));
        }, err => {
            toast.error("Something went wrong");
        })
}

const receiveProducts = products => {
    return {
        type: types.RECEIVE_PRODUCTS,
        products
    }
}

export const addToCart = (product, qty) => (dispatch) => {
    toast.success("Item added to cart !!", "Cart List");
    dispatch(addToCartData(product,qty));
}

export const addToCartData = (product, qty) => {
    return {
        type: types.ADD_TO_CART,
        product,
        qty
    }
}


export const addToWishlist = (product) => (dispatch) => {
    toast.success("Item added to wishlist !!", "Wishlist");
    dispatch(addToWishlistData(product));
}

export const addToWishlistData = (product) => {
    return {
        type: types.ADD_TO_WISHLIST,
        product
    }
}


export const addToCompare = (product) => (dispatch) => {
    toast.success("Item added to wishcompare listlist !!", "Compare List");
    dispatch(addToCompareData(product));
}

export const addToCompareData = (product) => {
    return {
        type: types.ADD_TO_COMPARE,
        product
    }
}

export const addToCartAndRemoveFromWishlist = (product,qty) => (dispatch) => {
    dispatch(addToCartData(product,qty));
    dispatch(removeFromWishlist(product.id));
}

export const removeFromWishlist = (pId) => (dispatch) => {
    dispatch({
        type : types.REMOVE_FROM_WISHLIST,
        productId : pId
    })
}

export const removeFromCart = (pId) => (dispatch) => {
    dispatch({
        type : types.REMOVE_FROM_CART,
        productId : pId
    })
}

export const removeFromCompare = (pId) => (dispatch) => {
    dispatch({
        type : types.REMOVE_FROM_COMPARE,
        productId : pId
    })
}

export const incrementQty = (product,qty) => (dispatch) => {
    dispatch(addToCartData(product,qty))
}

export const decrementQty = (product,qty) => (dispatch) => {
    dispatch(addToCartData(product,-qty))
}

export const filterBrandAction = brand => (dispatch) => {
    dispatch({
        type : types.FILTER_BRAND,
        brand
    })
}

export const filterColorAction = color => (dispatch) => {
    dispatch({
        type : types.FILTER_COLOR,
        color
    })
}

export const filterPriceAction = price => (dispatch) => {
    dispatch({
        type : types.FILTER_PRICE,
        price
    })
}