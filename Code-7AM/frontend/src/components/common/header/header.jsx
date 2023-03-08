import React, { Component } from 'react'
import Sidebar from './widgets/sidebar';
import LogoImage from './widgets/logo'
import Navbar from './widgets/navbar'
import Topbar from './widgets/topbar'
import { IntlActions } from 'react-redux-multilingual'
import store from '../../../store'
import CartContainer from './widgets/cart-container'

export default class Header extends Component {
  openSidebar() {
    var sideNav = document.getElementById('mySidenav');
    if (sideNav) {
      sideNav.classList.add('open-side');
    }
  }
  changeLanguage(lang){
    store.dispatch(IntlActions.setLocale(lang))
  }

  render() {
    return (
      <>
        <div>
          <header id="sticky" className="sticky">

            <div className="mobile-fix-option"></div>
            {/*Top Header Component*/}
           <Topbar />
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="main-menu">
                    <div className="menu-left">
                      <div className="navbar">
                        <a href="javascript:void(0)" onClick={this.openSidebar}>
                          <div className="bar-style"> <i className="fa fa-bars sidebar-bar" ariahidden="true"></i></div>
                        </a>
                        {/*SideBar Navigation Component*/}
                       <Sidebar />
                      </div>
                      <div className="brand-logo">
                      <LogoImage logo={this.props.logoname} />
                      </div>
                    </div>
                    <div className="menu-right pull-right">
                      {/*Top Navigation Bar Component*/}
                     <Navbar />
                      <div>
                        <div className="icon-nav">
                          <ul>
                            <li className="onhover-div mobile-setting">
                              <div><img src='/assets/images/icon/setting.png' className="imgfluid" alt="" />
                                <i className="fa fa-cog"></i></div>
                              <div className="show-div setting">
                                <h6>language</h6>
                                <ul>
                                  <li><a href={null} onClick={() => this.changeLanguage('en')} >English</a> </li>
                                  <li><a href={null} onClick={() => this.changeLanguage('hi')}>Hindi</a> </li>
                                </ul>
                              </div>
                            </li>
                            <CartContainer />
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      </>
    )
  }
}
