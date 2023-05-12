import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

import { addToCart, addToWishlist, addToCompare } from '../../../actions'
import { getVisibleproducts } from '../../../services'
import Product from '../../home/widgets/product'


class ProductListing extends Component {
    constructor() {
        super();
        this.state = {
            limit: 5,
            hasMoreItems: true
        };
    }

    componentWillMount() {
        this.fetchMoreItems();
    }

    fetchMoreItems = () => {
        if (this.state.limit >= this.props.products.length) {
            this.setState({
                hasMoreItems: false
            });
        }

        setTimeout(() => {
            this.setState({
                limit: this.state.limit + 5,
            });
        }, 3000);

    }
    render() {
        const { products, symbol, addToCart, addToCompare, addToWishlist, colSize } = this.props;
        // alert(colSize);
        return (
            <>
                <div className="product-wrapper-grid">
                    <div className="container-fluid">
                        {
                            products.length > 0 ?
                                <InfiniteScroll
                                    dataLength={this.state.limit} //This is important field to rende
                                    next={this.fetchMoreItems}
                                    hasMore={this.state.hasMoreItems}
                                    loader={<h4>Loading...</h4>}
                                    endMessage={
                                        <p style={{ textAlign: 'center' }}>
                                            <b>Yay! You have seen it all</b>
                                        </p>
                                    }
                                >
                                    <div className="row">
                                        {
                                            products.slice(0, this.state.limit).map((product, index) => {
                                                return (
                                                    <div className='col-xl-3 col-grid-box'  key={index}>
                                                        <Product
                                                            product={product}
                                                            symbol={symbol}
                                                            onAddToCartHandler={() => addToCart(product, 1)}
                                                            onAddToWishlistHandler={() => addToWishlist(product)}
                                                            onAddToCompareHandler={() => addToCompare(product)}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </InfiniteScroll>
                                :
                                <div className="row">
                                    <div className="col-sm-12 text-center section-b-space mt-5 no-found" >
                                        <img className="img-fluid mb-4" />
                                        <h3>Sorry! Couldn't find the product you were looking
                                            For!!! </h3>
                                        <p>Please check if you have misspelt something or try
                                            searching with other words.</p>
                                        <Link to={`${process.env.PUBLIC_URL}/`} >continue shopping</Link>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        products: getVisibleproducts(state.data, state.filters, props.category),
        symbol: state.data.symbol
    }
}
export default connect(mapStateToProps, { addToCart, addToWishlist, addToCompare })(ProductListing);