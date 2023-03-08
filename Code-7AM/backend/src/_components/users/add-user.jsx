import React, { Component } from 'react'
import FormValidator from '../../_validators/FormValidator'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { commonService } from '../../_services/common.service';
import DbOperation from '../../_helpers/dbOperation';
import Breadcrumb from '../common/breadcrumb';

import withNavigate from '../../_helpers/withNavigate';
import withLocation from '../../_helpers/withLocation';

class AddUser extends Component {
  constructor(props) {
    super(props);

    this.validatorReg = new FormValidator([
      {
        field: 'firstName',
        method: 'isEmpty',
        validWhen: false,
        message: 'First Name is required'
      },
      {
        field: 'lastName',
        method: 'isEmpty',
        validWhen: false,
        message: 'Last Name is required'
      },
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'Email Id is required'
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'Please enter valid email id'
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'Password is required'
      },
      {
        field: 'userTypeId',
        method: 'isEmpty',
        validWhen: false,
        message: 'User Type is required'
      },
      {
        field: 'confirmPassword',
        method: 'isEmpty',
        validWhen: false,
        message: 'Confirm Password is required'
      },
      {
        field: 'confirmPassword',
        method: this.passwordMatch,
        validWhen: true,
        message: 'Password and Confirm Password must be match'
      }
    ]);

    this.state = {
      dbops: DbOperation.create,
      btnText: "Save",
      userTypes: [],
      user: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        userTypeId: '',
        password: '',
        confirmPassword: ''
      },
      regSubmitted: false,
      validationReg: this.validatorReg.valid()
    }
  }

  passwordMatch = (confirmPass, state) => {
    return state.user.password === confirmPass;
  }


  componentDidMount() {
    this.getUserTypes();

    if (this.props.location.state) {
      if (this.props.location.state.objRow) {
        this.fillData(this.props.location.state.objRow);
      }
    }
  }

  fillData = (data) => {
    this.setState({
      dbops: DbOperation.update,
      btnText: "Update",
      user: {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        userTypeId: data.userTypeId,
        password: '',
        confirmPassword: ''
      },
    });
  }

  handleRegInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const { user } = this.state;

    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  clearRegForm = () => {
    this.setState({
      dbops: DbOperation.create,
      btnText: "Save",
      user: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        userTypeId: '',
        password: '',
        confirmPassword: ''
      },
      regSubmitted: false,
      validationReg: this.validatorReg.valid()
    });
  }

  getUserTypes = () => {
    commonService.getAll("UserType", false)
      .then(
        res => {
          if (res.isSuccess) {
            this.setState({
              userTypes: res.data
            });
          } else {
            toast.error(res.errors[0], "User Master");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "User Master");
        }
      )
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const validation = this.validatorReg.validate(this.state, 'user');
    this.setState({
      validationReg: validation,
      regSubmitted: true
    });

    const { user, dbops } = this.state;

    if (validation.isValid) {
      switch (dbops) {
        case DbOperation.create:
          commonService.save("UserMaster", false,user)
            .then(
              res => {
                if (res.isSuccess) {
                  if (res.data == -1) {
                    toast.warning("EmailId already exists !!", "Add User");
                  } else {
                    toast.success("User has been added successfully !!", "Add User");
                    this.clearRegForm();
                  }
                } else {
                  toast.error(res.errors[0], "Add User");
                }
              },
              (error) => {
                toast.error("Someting Went Wrong !!", "Add User");
              }
            )
          break;
        case DbOperation.update:
          commonService.update("UserMaster", false,user)
            .then(
              res => {
                if (res.isSuccess) {
                  if (res.data == -1) {
                    toast.warning("EmailId already exists !!", "Add User");
                  } else {
                    toast.success("User data has been updated successfully !!", "Add User");
                    this.clearRegForm();
                  }
                } else {
                  toast.error(res.errors[0], "Add User");
                }
              },
              (error) => {
                toast.error("Someting Went Wrong !!", "Add User");
              }
            )
          break;
      }
    }
  }

  handleCancel = () => {
    this.props.navigate('/users/list-user');
  }
  render() {
    const { userTypes, btnText, user, regSubmitted, validationReg } = this.state;
    let _validatorReg = regSubmitted ? this.validatorReg.validate(this.state, 'user') : validationReg;

    return (
      <>
        <Breadcrumb title="Add User" parent="Users" />
        <div className="container-fluid" >
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Add User</h5>
                </div>
                <div className="card-body">
                  <form className="form-horizontal auth-form" onSubmit={this.handleSubmit} >
                    <div className="form-group">
                      <input name="firstName"
                        type="text"
                        placeholder="First Name"
                        className={"form-control " + (_validatorReg.firstName.isInvalid ? "has-error" : "")}
                        value={user.firstName}
                        onChange={this.handleRegInput}
                      />
                      {
                        _validatorReg.firstName.isInvalid &&
                        <div className='help-block' >{_validatorReg.firstName.message}</div>
                      }
                    </div>
                    <div className="form-group">
                      <input name="lastName"
                        type="text"
                        placeholder="Last Name"
                        className={"form-control " + (_validatorReg.lastName.isInvalid ? "has-error" : "")}
                        value={user.lastName}
                        onChange={this.handleRegInput}
                      />
                      {
                        _validatorReg.lastName.isInvalid &&
                        <div className='help-block' >{_validatorReg.lastName.message}</div>
                      }
                    </div>
                    <div className="form-group">
                      <input name="email"
                        type="email"
                        placeholder="Email"
                        className={"form-control " + (_validatorReg.email.isInvalid ? "has-error" : "")}
                        value={user.email}
                        onChange={this.handleRegInput}
                      />
                      {
                        _validatorReg.email.isInvalid &&
                        <div className='help-block' >{_validatorReg.email.message}</div>
                      }
                    </div>


                    <div className="form-group">
                      <select name="userTypeId" className={"form-control " + (_validatorReg.userTypeId.isInvalid ? "has-error" : "")}
                        value={user.userTypeId}
                        onChange={this.handleRegInput}>
                        <option>--Select User Type--</option>
                        {
                          userTypes.map((value) => <option key={value.id} value={value.id} >{value.name}</option>)
                        }
                      </select>
                      {
                        _validatorReg.userTypeId.isInvalid &&
                        <div className='help-block' >{_validatorReg.userTypeId.message}</div>
                      }
                    </div>


                    <div className="form-group">
                      <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className={"form-control " + (_validatorReg.password.isInvalid ? "has-error" : "")}
                        value={user.password}
                        onChange={this.handleRegInput}
                      />
                      {
                        _validatorReg.password.isInvalid &&
                        <div className='help-block' >{_validatorReg.password.message}</div>
                      }
                    </div>
                    <div className="form-group">
                      <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        className={"form-control " + (_validatorReg.confirmPassword.isInvalid ? "has-error" : "")}
                        value={user.confirmPassword}
                        onChange={this.handleRegInput}
                      />
                      {
                        _validatorReg.confirmPassword.isInvalid &&
                        <div className='help-block' >{_validatorReg.confirmPassword.message}</div>
                      }
                    </div>
                    <br/>
                    <div className="form-button">
                      <button className="btn btn-primary me-2" type="submit">{btnText}</button>
                      <button type='button' className='btn btn-danger' onClick={this.handleCancel} >Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </>
    )
  }
}


export default withNavigate(withLocation(AddUser));