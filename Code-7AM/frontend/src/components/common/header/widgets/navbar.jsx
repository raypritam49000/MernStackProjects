import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <>
        <div>
          <div className="main-navbar">
            <div id="mainnav">
              <ul className="nav-menu">
                <li>
                  <Link to={`${process.env.PUBLIC_URL}/home`} >
                    home
                  </Link>
                </li>
                <li>
                  <Link to={`${process.env.PUBLIC_URL}/home`} >
                    shop
                  </Link>
                  <span className="sub-arrow"></span>
                  <ul className="nav-submenu">
                    <li>
                      <Link to={`${process.env.PUBLIC_URL}/products/collection/men`} >
                        Men-Fashion
                      </Link>
                    </li>
                    <li>
                      <Link to={`${process.env.PUBLIC_URL}/products/collection/women`} >
                        Women-Fashion
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to='#' className='nav-link' >pages</Link>
                  <span className='sub-arrow' ></span>
                  <ul className="nav-submenu">
                    <li><Link to={`${process.env.PUBLIC_URL}/pages/about-us`} >About Us</Link></li>
                    <li><Link to={`${process.env.PUBLIC_URL}/pages/contact-us`} >Contact Us</Link></li>
                    <li><Link to={`${process.env.PUBLIC_URL}/pages/faq`} >FAQ</Link></li>
                    <li><Link to={`${process.env.PUBLIC_URL}/pages/login`} >Login</Link></li>
                    <li><Link to={`${process.env.PUBLIC_URL}/pages/register`} >Register</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>

    )
  }
}
