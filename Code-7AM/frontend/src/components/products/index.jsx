import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Slider from 'react-slick'
import { connect } from 'react-redux'

import Breadcrumb from '../common/breadcrumb'
import CategoryBlock from '../common/category-block'
import NewProduct from '../common/new-product'
import ProductDetailsWithPrice from '../products/widgets/product-details-with-price'
import ProductDetailsTab from '../products/widgets/product-details-tab'
import { ToastContainer } from 'react-toastify'
import { addToCart, addToWishlist, addToCartData } from '../../actions'
import withRouter from '../../helpers/withRouter'

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  render() {
    const { item, symbol, addToCart, addToCartData, addToWishlist } = this.props;
    var products = {
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      fade: true
    };
    var productsnav = {
      slidesToShow: 3,
      swipeToSlide: true,
      arrows: false,
      dots: false,
      focusOnSelect: true
    };

    return (
      <>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Sahosoft Mall | {item.category} | {item.name}</title>
          <meta name='description' content='Sahosoft Mall | Fashion Store' />
        </Helmet>
        <Breadcrumb parent='Product' title={item.name} />
        {item ?
          <section className="section-b-space">
            <div className="collection-wrapper">
              <div className="container">
                <div className="row">
                  <div className="col-sm-3 collection-filter">
                    <CategoryBlock />
                    <NewProduct />
                  </div>
                  <div className="col-lg-9 col-sm-12 col-xs-12">
                    <div className="">
                      <div className="row">
                        <div className="col-lg-6 product-thumbnail">
                          <Slider {...products}
                            asNavFor={this.state.nav2} className="product-slick"
                            ref={slider => (this.slider1 = slider)}>
                            {
                              item.variants.map((vari, index) =>
                                <div key={index} >
                                  <img src={`${vari.images}`} className="img-fluid image_zoom_cls-0" />
                                </div>
                              )
                            }
                          </Slider>
                          <div className="row">
                            <div className="col-12 p-0">
                              <Slider {...productsnav} className="slider-nav"
                                asNavFor={this.state.nav1}
                                ref={slider => (this.slider2 = slider)}>
                                {
                                  item.variants.map((vari, index) =>
                                    <div key={index} >
                                      <img src={`${vari.images}`} className="img-fluid" />
                                    </div>
                                  )
                                }
                              </Slider>
                            </div>
                          </div>
                        </div>
                        <ProductDetailsWithPrice
                          symbol={symbol}
                          item={item}
                          addToCartHandler={addToCart}
                          BuyNowHandler={addToCartData}
                          addToWishlistHandler={addToWishlist}
                        />
                      </div>
                    </div>
                    <ProductDetailsTab item={item} />
                  </div>
                </div>
              </div>
            </div>
          </section>
          :
          ''
        }
        <ToastContainer />
      </>
    )
  }
}

const mapStateToProps = (state, props) => {
  let productId = props.match.params.id;
  return {
    item: state.data.products.find(el => el.id === parseInt(productId)),
    symbol: state.data.symbol
  }
}

export default withRouter(connect(mapStateToProps, { addToCart, addToWishlist, addToCartData })(ProductDetails));