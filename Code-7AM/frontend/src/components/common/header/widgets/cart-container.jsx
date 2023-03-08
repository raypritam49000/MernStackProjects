import React from 'react'
import { Link } from 'react-router-dom'
import { connect, Connect } from 'react-redux'

import { removeFromCart } from '../../../../actions'
import { getCartTotal } from '../../../../services'
import CartItems from './cart-items'

const CartContainer = ({ cartList, total, symbol, removeFromCart }) => {
    return (
        <>
            <li className="onhover-div mobile-cart">
                <div className="cart-qty-cls"> {cartList.length} </div>
                <Link to={`${process.env.PUBLIC_URL}/cart`} >
                    <img src={`${process.env.PUBLIC_URL}/assets/images/icon/cart.png`} className="img-fluid" alt="cart logo" />
                    <i className="fa fa-shopping-cart"></i>
                </Link>
                <ul className="show-div shopping-cart">
                    {
                        cartList.map((item, index) => {
                            return <CartItems key={index} item={item} symbol={symbol} removeFromCart={() => removeFromCart(item.id)} />
                        })
                    }
                    {
                        (cartList.length > 0) ?
                            <>
                                <li>
                                    <div className="total">
                                        <h5>subtotal : <span>{symbol}{total}</span></h5>
                                    </div>
                                </li>
                                <li>
                                    <div className="buttons">
                                        <Link to={`${process.env.PUBLIC_URL}/cart`} className="view-cart">view cart</Link>
                                        <Link to={`${process.env.PUBLIC_URL}/checkout`} className="checkout">checkout</Link>
                                    </div>
                                </li>
                            </>
                            :
                            <li><h5>Your cart is currently empty.</h5></li>

                    }
                </ul>
            </li>
        </>
    )
}

function matStateToProps(state) {
    return {
        cartList: state.cartList.cart,
        total: getCartTotal(state.cartList.cart),
        symbol: state.data.symbol
    }
}

export default connect(matStateToProps, { removeFromCart })(CartContainer);