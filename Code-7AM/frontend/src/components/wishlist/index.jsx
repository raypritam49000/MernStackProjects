import React, { Component } from 'react'
import Breadcrumb from '../common/breadcrumb'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeFromWishlist, addToCartAndRemoveFromWishlist } from '../../actions'

class Wishlist extends Component {
  render() {
    const { items, symbol, removeFromWishlist, addToCartAndRemoveFromWishlist } = this.props;
    return (
      <>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Sahosoft Mall | Wishlist List</title>
          <meta name='description' content='Sahosoft Mall | Wishlist List' />
        </Helmet>
        <Breadcrumb title='Wishlist' />

        {items.length > 0 ?
          <section className="wishlist-section section-b-space">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <table className="table cart-table table-responsive-xs">
                    <thead>
                      <tr className="table-head">
                        <th scope="col">image</th>
                        <th scope="col">product name</th>
                        <th scope="col">price</th>
                        <th scope="col">availability</th>
                        <th scope="col">action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        items.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <Link to={`${process.env.PUBLIC_URL}/products/details/${item.id}`} >
                                  <img src={item.pictures[0]} className="img-fluid" alt="product image" />
                                </Link>
                              </td>
                              <td>
                                <Link to={`${process.env.PUBLIC_URL}/products/details/${item.id}`} >
                                  {item.name}
                                </Link>
                              </td>
                              <td><h2>{symbol}{item.price - item.discount}
                                <del><span className="money">{symbol}{item.price} </span></del></h2></td>
                              <td>
                                <p>{item.stock > 0 ? 'In Stock' : 'Out Of Stock'}</p>
                              </td>
                              <td>
                                <a href="javascript:void(0)" className="icon" onClick={() => removeFromWishlist(item.id)}>
                                  <i className="fa fa-times"></i>
                                </a>
                                <a href="javascript:void(0)" className="cart" onClick={() => addToCartAndRemoveFromWishlist(item, 1)}>
                                  <i className="fa fa-shopping-cart"></i>
                                </a>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row wishlist-buttons">
                <div className="col-6">
                  <Link to={`${process.env.PUBLIC_URL}/home`} className='btn btn-solid' >
                    continue shopping
                  </Link>
                </div>
                <div className="col-6">
                  <Link to={`${process.env.PUBLIC_URL}/checkout`} className='btn btn-solid' >
                    check out
                  </Link>
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
                      <img className="img-fluid mb-4" alt="no wishlist" src={`${process.env.PUBLIC_URL}/assets/images/empty-wishlist.png`} />
                      <h3>
                        <strong>WhishList is Empty</strong>
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
    items: state.wishlist.list,
    symbol: state.data.symbol
  }
}
export default connect(mapStateToProps, { addToCartAndRemoveFromWishlist, removeFromWishlist })(Wishlist)