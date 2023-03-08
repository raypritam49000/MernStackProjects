import React, { Component } from 'react'
import userImg from '../../../assets/images/user.png'
import { User, LogOut } from 'react-feather'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Global from '../../../_helpers/basePath'

class UserMenu extends Component {
    render() {
        return (
            <div className="nav-right col">
                <ul className="nav-menus open">
                    <li>
                        <ul>
                            <li className="onhover-dropdown">
                                <div className="align-items-center">
                                    <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
                                        alt="header-user" 
                                        src={(this.props.user.userDetails.imagePath != null && this.props.user.userDetails.imagePath != "")
                                        ? Global.BASE_USER_IMAGES_PATH + this.props.user.userDetails.imagePath : userImg} />
                                    <div className="dotted-animation">
                                        <span className="animatecircle"></span>
                                        <span className="main-circle"></span></div>
                                </div>
                                <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                                    <li><Link to="/settings/profile"><User /> Edit Profile </Link></li>
                                    <li><Link to="/auth/login"><LogOut /> Logout </Link></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}


const MapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(MapStateToProps)(UserMenu)