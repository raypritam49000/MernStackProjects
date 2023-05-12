import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class ProductDetailsWithPrice extends Component {
    constructor() {
        super();
        this.state = {
            quantity: 1,
            stock: 'InStock'
        };
    }
    minusQty = () => {
        if (this.state.quantity > 1) {
            this.setState({
                quantity: this.state.quantity - 1,
                stock: "InStock"
            });
        }
    }
    plusQty = () => {
        if (this.props.product.stock >= this.state.quantity) {
            this.setState({
                quantity: this.state.quantity + 1,
                stock: "InStock"
            });
        } else {
            this.setState({ stock: 'Out of Stock', quantity: this.state.quantity + 1 });
        }
    }

    changeQty = (e) => {
        if (this.props.product.stock >= parseInt(e.target.value)) {
            this.setState({
                quantity: this.state.quantity + 1,
                stock: "InStock"
            });
        } else {
            this.setState({ stock: 'Out of Stock', quantity: this.state.quantity + 1 });
        }
    }

    render() {
        const { symbol, item, addToCartHandler, BuyNowHandler, addToWishlistHandler } = this.props;

        return (
            <>
                <div className="col-lg-6 rtl-text">
                    <div className="product-right">
                        <h2> {item.name} </h2>
                        <h4>
                            <del> {symbol}{item.price} </del>
                            <span> discount % {item.discount}off</span></h4>
                        <h3>{symbol}{item.price - item.discount} </h3>

                        <div className="product-description border-product">

                            <span className="instock-cls"> {this.state.stock} </span>
                            <h6 className="product-title">quantity</h6>
                            <div className="qty-box">
                                <div className="input-group">
                                    <span className="input-group-prepend">
                                        <button type="button" className="btn quantity-leftminus" onClick={this.minusQty}>
                                            <i className="fa fa-angle-left"></i>
                                        </button>
                                    </span>
                                    <input type="text" name="quantity" className="formcontrol input-number" 
                                    onClick={this.changeQty} value={this.state.quantity} />
                                    <span className="input-group-prepend">
                                        <button type="button" className="btn quantity-right-plus"
                                            onClick={this.plusQty}>
                                            <i className="fa fa-angle-right"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="product-buttons" >
                            <a className="btn btn-solid" onClick={() => addToCartHandler(item, this.state.quantity)} >add to cart</a>
                        <Link  className="btn btn-solid"  to={`${process.env.PUBLIC_URL}/checkout`} onClick={() => BuyNowHandler(item, this.state.quantity)} >Buy Now</Link>
                        </div>
                        <div className="border-product">
                            <h6 className="product-title">product details</h6>
                            <p> {item.shortDetails} </p>
                        </div>
                        <div className="border-product">
                            <div className="product-icon">
                                <button className="wishlist-btn" onClick={() => addToWishlistHandler(item, this.state.quantity)}  ><i
                                    className="fa fa-heart"></i><span
                                        className="title-font">Add To WishList</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
