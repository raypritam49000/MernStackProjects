import React, { Component } from 'react'
import Breadcrumb from '../common/breadcrumb'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeFromCompare, addToCart } from '../../actions'
import Slider from 'react-slick'

class Compare extends Component {

  render() {

    var settings = {
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 586,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }

    const { symbol, items, removeFromCompare, addToCart } = this.props;
    return (
      <>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Sahosoft Mall | Compare List</title>
          <meta name='description' content='Sahosoft Mall | Compare List' />
        </Helmet>
        <Breadcrumb title='Compare' />
        {
          items.length > 0 ?
            <section className="compare-section section-b-space">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <Slider {...settings} className="slide-4">
                      {/* Slider start */}
                      {
                        items.map((item, index) =>
                          <div key={index} >
                            <div className="compare-part">
                              <button type="button" className="close-btn" onClick={() => removeFromCompare(item.id)}>
                                <span aria-hidden="true">×</span>
                              </button>
                              <div className="img-secton">
                                <Link to={`${process.env.PUBLIC_URL}/products/details/${item.id}`} >
                                  <img src={item.pictures[0]} className="img-fluid" alt="product image" />
                                </Link>
                                <h5>{item.name}</h5>
                                <h5>{symbol}{item.price - item.discount}<del><span className="money"> {symbol}{item.price} </span></del></h5>
                              </div>
                              <div className="detail-part">
                                <div className="title-detail">
                                  <h5>discription</h5>
                                </div>
                                <div className="inner-detail">
                                  <p> {item.shortDetails} </p>
                                </div>
                              </div>
                              <div className="detail-part">
                                <div className="title-detail">
                                  <h5>Brand Name</h5>
                                </div>
                                <div className="inner-detail">
                                  <p> {item.tags} </p>
                                </div>
                              </div>
                              <div className="detail-part">
                                <div className="title-detail">
                                  <h5>size</h5>
                                </div>
                                <div className="inner-detail">
                                  <p>{item.size}</p>
                                </div>
                              </div>
                              <div className="detail-part">
                                <div className="title-detail">
                                  <h5>color</h5>
                                </div>
                                <div className="inner-detail">
                                  <p>{item.colors}</p>
                                </div>
                              </div>
                              <div className="detail-part">
                                <div className="title-detail">
                                  <h5>availability</h5>
                                </div>
                                <div className="inner-detail">
                                  <p>{item.stock}</p>
                                </div>
                              </div>
                              <div className="btn-part">
                                <a href="javascript:void(0)" className="btn btn-solid" onClick={() => addToCart(item,1)} >add to
                                  cart</a>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      {/* Slider end */}
                    </Slider>
                  </div>
                </div>
              </div>
            </section>
            :
            <section className="cart-section section-b-space">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <div >
                      <div className="col-sm-12 empty-cart-cls text-center">
                        <img className="img-fluid mb-4" alt="no compare list"
                          src={`${process.env.PUBLIC_URL}/assets/images/empty-compare.png`} />
                        <h3>
                          <strong>Compare List is Empty</strong>
                        </h3>
                        <h4>Explore more shortlist some items.</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        }
      </>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    items: state.compare.item,
    symbol: state.data.symbol
  }
}
export default connect(mapStateToProps, { removeFromCompare, addToCart })(Compare)