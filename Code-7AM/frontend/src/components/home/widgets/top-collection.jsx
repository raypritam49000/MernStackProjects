import React, { Component } from 'react'
import Slider from 'react-slick'
import { TopCollectionSlider } from '../../../services/script'
import Product from './product';
import { getTopCollection } from '../../../services'
import { connect } from 'react-redux'
import { addToCart, addToWishlist, addToCompare } from '../../../actions'

class TopCollection extends Component {
    render() {
        const { items, symbol, addToCart, addToWishlist, addToCompare } = this.props;
        return (
            <>
                <div>
                    {/*Paragraph*/}
                    <div className="title1 section-t-space">
                        <h4>special offer</h4>
                        <h2 className="title-inner1">top collection</h2>
                    </div>
                    {/*Paragraph End*/}
                    <section className="section-b-space p-t-0">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <Slider className='product-4 product-m no arrow' {...TopCollectionSlider}  >
                                        {
                                            items.map((product, index) => {
                                                return (
                                                    <Product
                                                        key={index}
                                                        product={product}
                                                        symbol={symbol}
                                                        onAddToCartHandler={() => addToCart(product, 1)}
                                                        onAddToWishlistHandler={() => addToWishlist(product)}
                                                        onAddToCompareHandler={() => addToCompare(product)}
                                                    />
                                                )
                                            })
                                        }
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        items: getTopCollection(state.data.products, props.type),
        symbol: state.data.symbol
    }
}

export default connect(mapStateToProps, { addToCart, addToWishlist, addToCompare })(TopCollection);