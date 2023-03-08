import React from 'react'
import { Link } from 'react-router-dom'

const CartItems = ({ item, symbol, removeFromCart }) => {
    return (
        <>
            <li>
                <div className="media">
                    <Link to={`${process.env.PUBLIC_URL}/product/details/${item.id}`} >
                        <img alt="product image" className="mr-3" src={`${item.pictures[0]}`} />
                    </Link>
                    <div className="media-body">
                        <Link to={`${process.env.PUBLIC_URL}/product/details/${item.id}`} >
                            <h4>{item.name}</h4>
                        </Link>
                        <h4><span>{item.qty} X {symbol}{item.price - item.discount}</span></h4>
                    </div>
                </div>
                <div className="close-circle"  >
                    <a href={null} onClick={removeFromCart}><i className="fa fa-times"></i></a>
                </div>
            </li>
        </>
    )
}

export default CartItems;