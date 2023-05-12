import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import Breadcrumb from "../common/breadcrumb";
import { removeFromWishlist } from '../../actions'
import { getCartTotal } from "../../services";
import FromValidator from '../../validator/formValidator';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { dataService } from '../../services/data.service';
import withNavigation from '../../helpers/withNavigate';

class checkOut extends Component {

  constructor(props) {
    super(props)

    this.validatorReg = new FromValidator([
      {
        field: 'firstname',
        method: 'isEmpty',
        validWhen: false,
        message: 'firstname is required'
      },
      {
        field: 'lastname',
        method: 'isEmpty',
        validWhen: false,
        message: 'lastname is required'
      },
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'email is required'
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'Enter valid email address'
      },
      {
        field: 'phone',
        method: 'isEmpty',
        validWhen: false,
        message: 'Phone is required'
      },
      {
        field: 'address',
        method: 'isEmpty',
        validWhen: false,
        message: 'address is required'
      },
      {
        field: 'town',
        method: 'isEmpty',
        validWhen: false,
        message: 'town is required'
      },
      {
        field: 'state',
        method: 'isEmpty',
        validWhen: false,
        message: 'state is required'
      },
      {
        field: 'postalcode',
        method: 'isEmpty',
        validWhen: false,
        message: 'postalcode is required'
      },
    ]);

    this.state = {
      user: {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        country: '',
        address: '',
        town: '',
        state: '',
        postalcode: ''
      },

      amount: [0],
      regSubmitted: false,

      validationReg: this.validatorReg.valid(),
    }
  }


  setStateFromInput = (event) => {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });

  }

  clearRegForm = () => {
    this.setState({
      user: {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        country: '',
        address: '',
        town: '',
        state: '',
        postalcode: ''
      }
    });
  }
  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (window).StripeCheckout.configure({
          key: 'pk_test_IMfLDyTjBvG9AK7MNtHntboG00XQFgMOiE', //need to change your Publishable key
          locale: 'auto',
          token: function () {
          }
        });
      }
      window.document.body.appendChild(s);
    }
  }
  componentDidMount() {
    this.loadStripe();
  }
  StripeClick = (event) => {

    event.preventDefault();
    this.setState({ regSubmitted: true });
    const { user } = this.state;

    const validation = this.validatorReg.validate(this.state, 'user');
    this.setState({ validationReg: validation });

    const { cartItems, total } = this.props;

    if (validation.isValid) {
      let allItems = [];
      for (let i = 0; i < cartItems.length; i++) {
        allItems[i] = {
          ProductId: cartItems[i].id,
          Quantity: cartItems[i].qty,
          Size: '',
          Color: '',
          Price: cartItems[i].price,
          Discount: cartItems[i].discount
        }
      }

      let obj = {
        id: 0,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        email: user.email,
        address: user.address,
        country: user.country,
        town: user.town,
        state: user.state,
        postalcode: user.postalcode,
        amount: total,
        shippingAmount: 40,
        paymentTypeId: 1,
        items: allItems,
        payment: null
      }

      let saveData = (obj, token) => dataService.doPayment(obj)
        .then(
          res => {
            if (res.isSuccess) {
              toast.success("Payment done successfully !!", "Payment Master");

              this.props.navigate(
                '/order-success',
                { state: { payment: token, items: this.props.cartItems, orderTotal: this.props.total, symbol: this.props.symbol, details: this.state.user } }
              );

              this.clearRegForm();
            } else {
              toast.error(res.errors[0], "Payment Master");
            }
          },
          error => {
            toast.error("Something went wrong", "Payment Master");
          }
        )


      var handler = (window).StripeCheckout.configure({
        key: 'pk_test_IMfLDyTjBvG9AK7MNtHntboG00XQFgMOiE',
        locale: 'auto',
        token: (token) => {
          let objPayment = {
            tokenId: token.id,
            amount: obj.amount + obj.shippingAmount,
            description: "Shopping with sahosoft mall--ReactJS-03-08-2022"
          };
          obj.payment = objPayment;
          saveData(obj, token);
        }
      });
      handler.open({
        name: 'Sahosoft Mall',
        description: 'Online Fashion Store',
        country: 'INDIA',
        currency: 'INR',
        amount: this.amount * 100
      });


    }
  }

  render() {
    const { cartItems, symbol, total } = this.props;
    const { user, regSubmitted } = this.state;
    let _validatorReg = regSubmitted ? this.validatorReg.validate(this.state, 'user') : this.state.validationReg;

    return (
      <div>

        {/*SEO Support*/}
        <Helmet>
          <title>Sahosoft Mall | CheckOut Page</title>
          <meta name="description" content="Sahosoft Mall" />
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb title={'Checkout'} />

        <section className="section-b-space">
          <div className="container padding-cls">
            <div className="checkout-page">
              <div className="checkout-form">
                <form>
                  <div className="checkout row">
                    <div className="col-lg-6 col-sm-12 col-xs-12">
                      <div className="checkout-title">
                        <h3>Billing Details</h3>
                      </div>
                      <div className="row check-out">
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">First Name</div>
                          <input type="text" name="firstname" value={user.firstname} onChange={this.setStateFromInput} />
                          {_validatorReg.firstname.isInvalid &&
                            <div className="help-block" >{_validatorReg.firstname.message}</div>
                          }
                        </div>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">Last Name</div>
                          <input type="text" name="lastname" value={user.lastname} onChange={this.setStateFromInput} />
                          {_validatorReg.lastname.isInvalid &&
                            <div className="help-block" >{_validatorReg.lastname.message}</div>
                          }
                        </div>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">Phone</div>
                          <input type="text" name="phone" value={user.phone} onChange={this.setStateFromInput} />
                          {_validatorReg.phone.isInvalid &&
                            <div className="help-block" >{_validatorReg.phone.message}</div>
                          }
                        </div>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">Email Address</div>
                          <input type="text" name="email" value={user.email} onChange={this.setStateFromInput} />
                          {_validatorReg.email.isInvalid &&
                            <div className="help-block" >{_validatorReg.email.message}</div>
                          }
                        </div>

                      </div>
                      <div className="form-group col-md-12 col-sm-12 col-xs-12">
                        <div className="field-label">Address</div>
                        <input type="text" name="address" value={user.address} onChange={this.setStateFromInput} placeholder="Street address" />
                        {_validatorReg.address.isInvalid &&
                          <div className="help-block" >{_validatorReg.address.message}</div>
                        }
                      </div>
                      <div className="form-group col-md-12 col-sm-12 col-xs-12">
                        <div className="field-label">Town/City</div>
                        <input type="text" name="town" value={user.town} onChange={this.setStateFromInput} />
                        {_validatorReg.town.isInvalid &&
                          <div className="help-block" >{_validatorReg.town.message}</div>
                        }
                      </div>
                      <div className="form-group col-md-12 col-sm-6 col-xs-12">
                        <div className="field-label">State </div>
                        <input type="text" name="state" value={user.state} onChange={this.setStateFromInput} />
                        {_validatorReg.state.isInvalid &&
                          <div className="help-block" >{_validatorReg.state.message}</div>
                        }
                      </div>
                      <div className="form-group col-md-12 col-sm-12 col-xs-12">
                        <div className="field-label">Country</div>
                        <select name="country" value={user.country} onChange={this.setStateFromInput}>
                          <option>India</option>
                        </select>
                        <div className="form-group col-md-12 col-sm-6 col-xs-12">
                          <div className="field-label">Postal Code</div>
                          <input type="text" name="postalcode" value={user.postalcode} onChange={this.setStateFromInput} />
                          {_validatorReg.postalcode.isInvalid &&
                            <div className="help-block" >{_validatorReg.postalcode.message}</div>
                          }
                        </div>

                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-xs-12">
                      <div className="checkout-details">
                        <div className="order-box">
                          <div className="title-box">
                            <div>Product <span> Total</span></div>
                          </div>
                          <ul className="qty">
                            {
                              cartItems.map((item, index) => {
                                return <li key={index} >
                                  {item.name} X {item.qty} <span>{symbol} {item.sum}</span>
                                </li>
                              })
                            }
                          </ul>
                          {(total !== 0) ?
                            <>
                              <ul className="sub-total">
                                <li>Subtotal <span className="count">{symbol} {total}</span></li>
                              </ul>
                              <ul className="sub-total">
                                <li>Shipping Charge <span className="count">{symbol} {40}</span></li>
                              </ul>
                              <ul className="total">
                                <li>Total <span className="count">{symbol} {total + 40}</span></li>
                              </ul>
                            </>
                            : ''
                          }
                        </div>

                        <div className="payment-box">
                          {(total !== 0) ?
                            <div className="text-right">
                              <button type="button" className="btn-solid btn" onClick={(e) => this.StripeClick(e)}  >Place Order</button>
                            </div> : ''
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.cartList.cart,
  symbol: state.data.symbol,
  total: getCartTotal(state.cartList.cart)
})

export default connect(mapStateToProps, { removeFromWishlist }) (withNavigation(checkOut));
