import React, { Component } from 'react'
import UserMenu from './user-menu'
import { AlignLeft } from 'react-feather'

export default class Header extends Component {
    constructor() {
        super();
        this.state = {
            sidebar: true
        };
    }

    openCloseSidebar = () => {
        if (this.state.sidebar) {
            this.setState({ sidebar: false });
            document.querySelector(".page-main-header").classList.add('open');
            document.querySelector(".page-sidebar").classList.add('open');
        } else {
            this.setState({ sidebar: true });
            document.querySelector(".page-main-header").classList.remove('open');
            document.querySelector(".page-sidebar").classList.remove('open');
        }
    }

    render() {
        return (
            <div className="page-main-header ">
                <div className="main-header-right row">
                    <div className="mobile-sidebar">
                        <div className="media-body text-right switch-sm">
                            <label className="switch"><a onClick={this.openCloseSidebar} ><AlignLeft /></a></label>
                        </div>
                    </div>
                    <UserMenu />
                </div>
            </div>
        )
    }
}
