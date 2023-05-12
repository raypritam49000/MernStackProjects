import React, { Component } from 'react'
import Breadcrumb from '../common/breadcrumb'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCartTotal } from '../../services'
import { removeFromCart, incrementQty, decrementQty } from '../../actions'

class Cart extends Component {
  render() {
    const { cartItems, symbol, total, removeFromCart, incrementQty, decrementQty } = this.props;
    return (
      <>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Sahosoft Mall | Cart List</title>
          <meta name='description' content='Sahosoft Mall | cart List' />
        </Helmet>
        <Breadcrumb title='cart' />
        {
          cartItems.length > 0 ?
            <section className="cart-section section-b-space">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <table className="table cart-table table-responsive-xs">
                      <thead>
                        <tr className="table-head">
                          <th scope="col">image</th>
                          <th scope="col">product name</th>
                          <th scope="col">price</th>
                          <th scope="col">quantity</th>
                          <th scope="col">action</th>
                          <th scope="col">total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          cartItems.map((item, index) => {
                            return (<tr key={index} >
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
                              <td><h2>{symbol}{item.price - item.discount}</h2></td>
                              <td>
                                <div className="qty-box">
                                  <div className="input-group">
                                    <span className="input-group-prepend">
                                      <button type="button" className="btn quantity-left-minus"
                                        onClick={() => decrementQty(item, 1)}
                                        disabled={item.qty === 1 ? true : false}>
                                        <i className="fa fa-angle-left"></i>
                                      </button>
                                    </span>
                                    <input type="text" name="quantity" className="form-control input-number"
                                      readOnly value={item.qty} />
                                    <span className="input-group-prepend">
                                      <button className="btn quantity-right-plus" onClick={() => incrementQty(item, 1)}
                                        disabled={item.qty >= item.stock ? true : false} >
                                        <i className="fa fa-angle-right"></i>
                                      </button>
                                    </span>
                                  </div>
                                </div>
                                {item.qty >= item.stock ? 'Out of Stock' : ''}
                              </td>
                              <td>
                                <a href="#" className="icon" onClick={() => removeFromCart(item.id)} >
                                  <i className="fa fa-times"></i>
                                </a>
                              </td>
                              <td><h2 className="td-color">{symbol}{item.sum} </h2></td>
                            </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                    <table className="table cart-table table-responsive-md">
                      <tfoot>
                        <tr>
                          <td>total price :</td>
                          <td><h2>{symbol}{total}</h2></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div className="row cart-buttons">
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
                    <div>
                      <div className="col-sm-12 empty-cart-cls text-center">
                        <img className="img-fluid mb-4" alt="no cart item" src={`${process.env.PUBLIC_URL}/assets/images/icon-empty-cart.png`} />
                        <h3>
                          <strong>Your Cart is Empty</strong>
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
    cartItems: state.cartList.cart,
    symbol: state.data.symbol,
    total: getCartTotal(state.cartList.cart)
  }
}
export default connect(mapStateToProps, { removeFromCart, incrementQty, decrementQty })(Cart);