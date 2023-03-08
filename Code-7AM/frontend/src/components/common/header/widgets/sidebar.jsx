import React, { Component } from 'react'

export default class Sidebar extends Component {
  closeSidebar() {
    var sideNav = document.getElementById('mySidenav');
    if (sideNav) {
      sideNav.classList.remove('open-side');
    }
  }
  render() {
    return (
      <>
        <div id="mySidenav" className="sidenav">
          <a href="javascript:void(0)" className="sidebar-overlay" onClick={this.closeSidebar}></a>
          <nav>
            <a onClick={this.closeSidebar}>
              <div className="sidebar-back text-left">
                <i className="fa fa-angle-left pr-2" aria-hidden="true"></i> Back
              </div>
            </a>
            <ul id="sub-menu" className="sidebar-menu">
              <li>
                clothing
                <span className="sub-arrow"></span>
                <ul className="mega-menu clothing-menu">
                  <li>
                    <div className="row m-0">
                      <div className="col-xl-4">
                        <div className="link-section">
                          <h5>women's fashion</h5>
                          <ul>
                            <li>
                              dresses
                            </li>
                            <li>
                              skirts
                            </li>
                            <li>
                              westarn wear
                            </li>
                            <li>
                              ethic wear
                            </li>
                            <li>
                              sport wear
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div className="link-section">
                          <h5>men's fashion</h5>
                          <ul>
                            <li>
                              sports wear
                            </li>
                            <li>
                              western wear
                            </li>
                            <li>
                              ethic wear
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>

      </>
    )
  }
}
