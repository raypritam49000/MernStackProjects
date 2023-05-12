import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LogoImage from '../header/widgets/logo'

export default class Footer extends Component {
  render() {
    return (
      <>
        <footer className="footer-light">
          <div className="light-layout">
            <div className="container">
              <section className="small-section border-section border-top-0">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="subscribe">
                      <div>
                        <h4>KNOW IT ALL FIRST!</h4>
                        <p>Never Miss Anything From Sahosoft Mall By Signing Up To Our
                          Newsletter. </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <form className="form-inline subscribe-form">
                      <div className="form-group mx-sm-3">
                        <input type="text" className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter your email" />
                      </div>
                      <button type="submit" className="btn btn-solid">subscribe</button>
                    </form>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <section className="section-b-space light-layout">
            <div className="container">
              <div className="row footer-theme partition-f">
                <div className="col-lg-4 col-md-6">
                  <div className="footer-title footer-mobile-title">
                    <h4>about</h4>
                  </div>
                  <div className="footer-contant">
                    <div className="footer-logo">
                     <LogoImage logo={this.props.logoname} />
                    </div>
                    <p>Sahosoft Mall is the best place for shopping in the world</p>
                    <div className="footer-social">
                      <ul>
                        <li>
                          <Link to={'https://www.facebook.com/'} ><i className="fa fa-facebook"
                            aria-hidden="true"></i></Link>
                        </li>
                        <li>
                          <Link to={'https://plus.google.com/'} ><i className="fa fa-google-plus"
                            aria-hidden="true"></i></Link>
                        </li>
                        <li>
                          <Link to={'https://twitter.com'}><i className="fa fa-twitter" ariahidden="true"></i></Link>
                        </li>
                        <li>
                          <Link to={'https://instagram.com'}><i className="fa fa-instagram" ariahidden="true"></i></Link>
                        </li>
                        <li>
                          <Link to={'https://rss.com/'}><i className="fa fa-rss" ariahidden="true"></i></Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col offset-xl-1">
                  <div className="sub-title">
                    <div className="footer-title">
                      <h4>Categories</h4>
                    </div>
                    <div className="footer-contant">
                      <ul>
                        <li>womens
                        </li>
                        <li>men
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="sub-title">
                    <div className="footer-title">
                      <h4>why we choose</h4>
                    </div>
                    <div className="footer-contant">
                      <ul>
                        <li><a href="#">shipping & return</a></li>
                        <li><a href="#">secure shopping</a></li>
                        <li><a href="#">gallary</a></li>
                        <li><a href="#">affiliates</a></li>
                        <li><a href="#">contacts</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="sub-title">
                    <div className="footer-title">
                      <h4>store information</h4>
                    </div>
                    <div className="footer-contant">
                      <ul className="contact-list">
                        <li><i className="fa fa-map-marker"></i>Sahosoft Mall India 256-896
                        </li>
                        <li><i className="fa fa-phone"></i>Call Us: 8376817046</li>
                        <li><i className="fa fa-envelope-o"></i>Email Us: <a
                          href="#">Support@sahosoftmall.com</a></li>
                        <li><i className="fa fa-fax"></i>Fax: 123456</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="sub-footer ">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-md-6 col-sm-12">
                  <div className="footer-end">
                    <p><i className="fa fa-copyright" aria-hidden="true"></i> 2022-23 Sahosoft
                      Mall powered by sahosoft</p>
                  </div>
                </div>
                <div className="col-xl-6 col-md-6 col-sm-12">
                  <div className="payment-card-bottom">
                    <ul>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    )
  }
}
