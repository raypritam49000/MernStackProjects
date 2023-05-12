import React, { Component } from 'react'
import Header from './common/header/header'
import Footer from './common/footer/footer'

class Layout extends Component {
  render() {
    return (
      <>
        <Header logoname="logo.png" />
        {this.props.children}
        <Footer logoname="logo.png" />
      </>
    )
  }
}


export default Layout;