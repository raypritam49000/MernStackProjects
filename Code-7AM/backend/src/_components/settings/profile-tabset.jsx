import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Settings, User } from 'react-feather';
import noImage from '../../assets/images/noImage.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux'
import { commonService } from '../../_services/common.service';

class ProfileTabSet extends Component {
    constructor() {
        super();
        this.state = {
            image: '',
            uploadedImage: noImage
        };
    }

    handleImgChange = (e) => {
        e.preventDefault();

        let files = e.target.files;

        if (files.length === 0) {
            return;
        }

        let type = files[0].type;
        if (type.match(/image\/*/) == null) {
            toast.error("Only images are supported here !!", "BrandLogo Master");
            e.target.value = null;
            this.setState({
                uploadedImage: noImage
            });
            return;
        }


        this.setState({
            image: files[0]
        });

        //Show Image
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
            this.setState({
                uploadedImage: reader.result
            });
        }

    }

    uploadImage = (e) => {
        e.preventDefault();
        const { image } = this.state;

        if (image.length <= 0) {
            toast.error("Please upload image !!", "Profile");
            return;
        }

        let formData = new FormData();
        formData.append("Id", this.props.user.userDetails.id);
        
        if (image) {
          formData.append("Image", image, image.name);
        }
  
        commonService.updateProfile("UserMaster", true, formData)
        .then(
          res => {
            if (res.isSuccess) {
              toast.success("Profile has been saved successfully !!", "Update Profile");
              this.setState({
                  image: '',
                uploadedImage : noImage
              });
            
            }
            else {
              toast.error(res.errors[0], "Update Profile");
            }
          },
          (error) => {
            toast.error("Someting Went Wrong !!", "Update Profile");
          }
        )

    }

    render() {
        const { uploadedImage } = this.state;
        return (
            <>
                <Tabs>
                    <TabList className="nav nav-tabs tab-coupon" >
                        <Tab className="nav-link"><User className="mr-2" /> Profile</Tab>
                        <Tab className="nav-link"><Settings className="mr-2" /> Update Profile</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="tab-pane fade show active">
                            <h5 className="f-w-600 f-16">Profile</h5>
                            <div className="table-responsive profile-table">
                                <table className="table table-responsive">
                                    <tbody>
                                        <tr>
                                            <td>First Name:</td>
                                            <td>{`${this.props.user.userDetails.firstName}`}</td>
                                        </tr>
                                        <tr>
                                            <td>Last Name:</td>
                                            <td>{`${this.props.user.userDetails.lastName}`}</td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td>{`${this.props.user.userDetails.email}`}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='tab-pane fade show'>
                            <h5 className='f-w-600 f-16' ></h5>
                            <input
                                className="form-control"
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={this.handleImgChange}
                            />
                            <button type='button' className='btn btn-primary' onClick={this.uploadImage} >Upload</button>
                            <br /> <br />
                            <img alt='brand logo' src={uploadedImage}
                                style={{ width: '100px', height: '100px' }} />
                        </div>
                    </TabPanel>
                </Tabs>
                <ToastContainer />
            </>
        )
    }
}


const MapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(MapStateToProps)(ProfileTabSet)