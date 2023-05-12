import React, { Component } from 'react'
import Header from './common/header/header'
import Sidebar from './common/sidebar/sidebar'
import Footer from './common/footer'

export default class Layout extends Component {
    render() {
        return (
            <div className='page-wrapper' >
                <Header />
                <div className='page-body-wrapper' >
                    <Sidebar />
                    <div className='page-body'>
                        {this.props.children}
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}
