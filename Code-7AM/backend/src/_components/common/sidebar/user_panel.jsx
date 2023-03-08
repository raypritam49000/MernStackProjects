import React, { Component } from 'react'
import userImg from '../../../assets/images/user.png'
import { connect } from 'react-redux'
import Global from '../../../_helpers/basePath'

class UserPanel extends Component {
    render() {
        return (
            <div className="sidebar-user text-center">
                <div><img className="img-60 rounded-circle lazyloaded blur-up" alt="User Image"
                    src={(this.props.user.userDetails.imagePath != null && this.props.user.userDetails.imagePath != "")
                        ? Global.BASE_USER_IMAGES_PATH + this.props.user.userDetails.imagePath : userImg} />
                </div>
                <h6 className="mt-3 f-14">{`${this.props.user.userDetails.firstName} ${this.props.user.userDetails.lastName}`}</h6>
                <p>{this.props.user.userDetails.email}</p>
            </div>
        )
    }
}

const MapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(MapStateToProps)(UserPanel)