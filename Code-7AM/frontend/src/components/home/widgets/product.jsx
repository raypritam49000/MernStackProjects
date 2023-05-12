import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default class Product extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            stock: 'InStock',
            quantity: 1,
            image: ''
        };
    }
    imgHandler = (img) => {
        this.setState({ image: img });
    }
    onOpenModal = () => {
        this.setState({ open: true });
    }
    onCloseModal = () => {
        this.setState({ open: false });
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
        const { product, symbol, onAddToCartHandler, onAddToWishlistHandler, onAddToCompareHandler } = this.props;
        let RatingStarts = [];
        for (let i = 0; i < 5; i++) {
            RatingStarts.push(<i key={i} className='fa fa-star' ></i>);
        }
        return (
            <>
                <div className="product-box">
                    <div className="img-wrapper">
                        <div className="lable-block">
                            {product.isNew === true ? <span className="lable3">new</span> : ''}
                            {product.isSale === true ? <span className="lable4">on sale</span> : ''}
                        </div>
                        <div className="front">
                            <Link to={`${process.env.PUBLIC_URL}/products/details/${product.id}`} >
                                <img src={this.state.image ? this.state.image : product.pictures[0]}
                                    className="img-fluid" alt="product image" />
                            </Link>
                        </div>
                        <div className="cart-info cart-wrap">
                            <button title="Add to cart" onClick={onAddToCartHandler} >
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                            </button>
                            <a href="javascript:void(0)" title="Add to Wishlist" onClick={onAddToWishlistHandler} >
                                <i className="fa fa-heart" aria-hidden="true"></i>
                            </a>
                            <a href="javascript:void(0)" data-toggle="modal"
                                data-target="#quick-view"
                                title="Quick View"
                                onClick={this.onOpenModal}
                            ><i className="fa fa-search" aria-hidden="true"></i></a>
                            <a href="javascript:void(0)" title='Add to Compare' onClick={onAddToCompareHandler}  >
                                <i className="fa fa-refresh" aria-hidden="true"></i>
                            </a>
                        </div>
                        {
                            product.variants ?
                                <ul className='product-thumb-list' >
                                    {
                                        product.variants.map((vari, i) => {
                                            return (
                                                <li key={i} className={`grid_thumb_img ${vari.images === this.state.image ? 'active' : ''}`} >
                                                    <img src={`${vari.images}`} onClick={() => this.imgHandler(vari.images)} />
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                : ''
                        }

                    </div>
                    <div className="product-detail">
                        <div>
                            <div className="rating">
                                {RatingStarts}
                            </div>
                            <h6>{product.name}</h6>

                            <h4>{symbol}{product.price - product.discount}
                                <del><span className="money">{product.price}</span></del>
                            </h4>

                        </div>
                    </div>
                    <Modal open={this.state.open} onClose={this.onCloseModal} center >
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content quick-view-modal">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-6 col-xs-12">
                                            <div className="quick-view-img">
                                                <img src={this.state.image ? this.state.image : product.pictures[0]}
                                                    alt="product image" className="img-fluid" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 rtl-text">
                                            <div className="product-right">
                                                <h2>{product.name}</h2>
                                                <h3>{symbol}{product.price - product.discount}
                                                    <del><span className="money">{product.price}</span></del>
                                                </h3>
                                                <div className="border-product">
                                                    <h6 className="product-title">product details</h6>
                                                    <p> {product.shortDetails} </p>
                                                </div>
                                                <div className="product-description border-product">

                                                    <h6 className="product-title">quantity</h6>
                                                    <div className="qty-box">
                                                        <div className="input-group">
                                                            <span className="input-group-prepend">
                                                                <button type="button" className="btn quantity-left-minus"
                                                                    onClick={this.minusQty}>
                                                                    <i className="fa fa-angle-left"></i>
                                                                </button>
                                                            </span>
                                                            <input type="text" name="quantity" className="form-control input-number"
                                                                onChange={this.changeQty} value={this.state.quantity} />
                                                            <span className="input-group-prepend">
                                                                <button type="button" className="btn quantity-right-plus"
                                                                    onClick={this.plusQty}>
                                                                    <i className="fa fa-angle-right"></i>
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <h8 className='product-title' >Avaliablity : {product.stock}</h8>
                                                </div>
                                                <div className="product-buttons">
                                                    <button className="btn btn-solid" onClick={() => onAddToCartHandler(product, this.state.quantity)} >add to cart</button>
                                                    <Link to={`${process.env.PUBLIC_URL}/products/details/${product.id}`}
                                                        className='btn btn-solid'>View Details</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </>
        )
    }
}
