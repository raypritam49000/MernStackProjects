import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import { getBestSeller } from '../../services'

class NewProduct extends Component {
    render() {
        const { items, symbol } = this.props;
        var arr = [];
        while (items.length > 0) {
            arr.push(items.splice(0, 3));
        }

        return (
            <>
                <div className="theme-card">
                    <h5 className="title-border">new product</h5>
                    <Slider className='offer-slider slider-1'>
                        {
                            arr.map((products, index) => {
                                return (
                                    <div key={index} >
                                        {
                                            products.map((product, index) => {
                                                return (
                                                    <div className="media" key={index} >
                                                        <Link to={`${process.env.PUBLIC_URL}/product/details/${product.id}`} >
                                                            <img className="img-fluid" alt="product image" src={`${product.pictures[0]}`} />
                                                        </Link>
                                                        <div className="media-body align-self-center">
                                                            <div className="rating">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                            </div>
                                                            <Link to={`${process.env.PUBLIC_URL}/product/details/${product.id}`} >
                                                            <h6> {product.name} </h6>
                                                            </Link>
                                                            <h4>{symbol} {product.price -  product.discount}
                                                                <del><span className="money"> {symbol} {product.salePrice}
                                                                </span></del></h4>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div >
            </>
        )
    }
}

function matStateToProps(state) {
    return {
        items: getBestSeller(state.data.products),
        symbol: state.data.symbol
    }
}

export default connect(matStateToProps, null)(NewProduct);