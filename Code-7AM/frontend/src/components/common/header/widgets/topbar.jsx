import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual'


class Topbar extends Component {
  render() {
    const { translate } = this.props;
    return (
      <>
        <div className="top-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="header-contact">
                  <ul>
                    <li> {translate('topbar_title')}</li>
                    <li><i className="fa fa-phone" aria-hidden="true"></i>{translate('call_us')} :
                      8376817046</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 text-right">
                <ul className="header-dropdown">
               
                <li className="mobile-wishlist"> <i className="fa fa-heart" ariahidden="true"></i> 
                  <Link to={`${process.env.PUBLIC_URL}/cart`}>{translate('cart')}</Link>
                  </li>

                  <li className="mobile-wishlist"> <i className="fa fa-heart" ariahidden="true"></i> 
                  <Link to={`${process.env.PUBLIC_URL}/wishlist`}>{translate('wishlist')}</Link>
                  </li>

                  <li className="mobile-wishlist compare-mobile"> <i className="fa fa-random"
                    aria-hidden="true"></i> 
                    <Link to={`${process.env.PUBLIC_URL}/compare`}>{translate('compare')}</Link> 
                    </li>
                 
                  <li className="onhover-dropdown mobile-account">
                    <i className="fa fa-user" aria-hidden="true"></i> {translate('my_account')}
                    <ul className="onhover-show-div">
                      <li>
                        <Link to={`${process.env.PUBLIC_URL}/pages/login`}>
                          {translate('login')}
                        </Link>
                      </li>
                      <li>
                        <Link to={`${process.env.PUBLIC_URL}/pages/register`}>
                          {translate('register')}
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </>
    )
  }
}

export default withTranslate(Topbar);