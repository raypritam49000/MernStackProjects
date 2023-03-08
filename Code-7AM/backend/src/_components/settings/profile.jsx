import React, { Component } from 'react'
import ProfileTabSet from './profile-tabset';
import userImg from '../../assets/images/user.png'
import { connect } from 'react-redux'
import Global from '../../_helpers/basePath'

 class Profile extends Component {
  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body">
                  <div className="profile-details text-center">
                    <img alt="User Pic" className="img-fluid img-90 rounded-circle blur-up lazyloaded"
                     src={(this.props.user.userDetails.imagePath != null && this.props.user.userDetails.imagePath != "")
                     ? Global.BASE_USER_IMAGES_PATH + this.props.user.userDetails.imagePath : userImg} />
                    <h5 className="f-w-600 f-16 mb-0">{`${this.props.user.userDetails.firstName} ${this.props.user.userDetails.lastName}`}</h5>
                    <span>{this.props.user.userDetails.email}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="card profile-card">
                <div className="card-body">
                  <div>
                   <ProfileTabSet />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}


const MapStateToProps = (state) => {
  return {
      user: state.user
  }
}

export default connect(MapStateToProps)(Profile)