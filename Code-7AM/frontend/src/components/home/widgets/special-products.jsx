import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getBestSeller, getMenWear, getWomenWear } from '../../../services'
import { connect } from 'react-redux'
import { addToCart, addToWishlist, addToCompare } from '../../../actions'
import Product from './product';

class SpecialProducts extends Component {
    render() {
        const { symbol, bestSeller, menWear, womenWear, addToCart, addToWishlist, addToCompare } = this.props;
        return (
            <>
                <div>
                    <div className="title1 section-t-space">
                        <h4>exclusive products</h4>
                        <h2 className="title-inner1">special products</h2>
                    </div>
                    <section className="section-b-space p-t-0">
                        <div className="container">
                            <Tabs className="theme-tab">
                                <TabList className="tabs tab-title">
                                    <Tab>Best Seller</Tab>
                                    <Tab>Mens Wear</Tab>
                                    <Tab>Womens Wear</Tab>
                                </TabList>
                                <TabPanel>
                                    <div className="no-slider row" >
                                        {
                                            bestSeller.map((product, index) => {
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
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="no-slider row" >
                                        {
                                            menWear.map((product, index) => {
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
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="no-slider row" >
                                        {
                                            womenWear.map((product, index) => {
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
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </section >
                </div >
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bestSeller: getBestSeller(state.data.products),
        menWear: getBestSeller(state.data.products),
        womenWear: getBestSeller(state.data.products),
        symbol: state.data.symbol
    }
}
export default connect(mapStateToProps, { addToCart, addToWishlist, addToCompare })(SpecialProducts);