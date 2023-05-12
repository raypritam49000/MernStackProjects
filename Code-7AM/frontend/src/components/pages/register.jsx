import React, { Component } from 'react'
import Breadcrumb from "../common/breadcrumb";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { dataService } from '../../services/data.service';
import FromValidator from '../../validator/formValidator';

import withNavigation from '../../helpers/withNavigate';
import {Helmet} from "react-helmet";

class Register extends Component {
    constructor(props) {
        super(props);

        this.validatorReg = new FromValidator([
            {
                field: 'firstName',
                method: 'isEmpty',
                validWhen: false,
                message: 'firstName is required'
            },
            {
                field: 'lastName',
                method: 'isEmpty',
                validWhen: false,
                message: 'lastName is required'
            },
            {
                field: 'email',
                method: 'isEmpty',
                validWhen: false,
                message: 'email is required'
            },
            {
                field: 'email',
                method: 'isEmail',
                validWhen: true,
                message: 'Enter valid email address'
            },
            {
                field: 'password',
                method: 'isEmpty',
                validWhen: false,
                message: 'password is required'
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
                message: 'Password and Confirm Password do not match'
            }
        ]);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                userTypeId: 1,
                password: '',
                confirmPassword: ''
            },
            regSubmitted: false,

            validationReg: this.validatorReg.valid(),
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    passwordMatch = (confirmation, state) => {
        return state.user.password === confirmation;
    };


    handleInputChange(event) {
        const { name, value } = event.target;
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
            user: {
                firstName: '',
                lastName: '',
                email: '',
                userTypeId: 1,
                password: '',
                confirmPassword: ''
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ regSubmitted: true });
        const { user } = this.state;

        const validation = this.validatorReg.validate(this.state, 'user');
        this.setState({ validationReg: validation });

        if (validation.isValid) {
            dataService.register(user)
                .then(
                    res => {
                        if (res.isSuccess) {
                            toast.success("Registration has been done successfully !!", "Registration");
                            this.clearRegForm();
                            this.props.navigate('/pages/login');
                        } else {
                            toast.error(res.errors[0], "Registration");
                        }
                    },
                    () => {
                        toast.error("Something went wrong", "Registration");
                    }
                )
        }
    }

    render() {
        const { user, regSubmitted } = this.state;
        let _validatorReg = regSubmitted ? this.validatorReg.validate(this.state, 'user') : this.state.validationReg;

        return (
            <div>
                 <Helmet>
                    <meta charSet='utf-8' />
                    <title>Sahosoft Mall | Registraion</title>
                    <meta name='description' content='Sahosoft Mall | Registraion' />
                </Helmet>
                <Breadcrumb title={'Create Account'} />
                {/*Regsiter section*/}
                <section className="register-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h3>create account</h3>
                                <div className="theme-card">
                                    <form className="theme-form" onSubmit={this.handleSubmit}>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="email">First Name</label>
                                                <input name="firstName" type="text"
                                                  className={"form-control " + (_validatorReg.firstName.isInvalid ? "has-error" : "")}
                                                    placeholder="First Name" value={user.firstName} onChange={this.handleInputChange} />
                                                {_validatorReg.firstName.isInvalid &&
                                                    <div className="help-block" >{_validatorReg.firstName.message}</div>
                                                }
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="review">Last Name</label>
                                                <input name="lastName" type="text"
                                                    className={"form-control " + (_validatorReg.lastName.isInvalid ? "has-error" : "")}
                                                    placeholder="Last Name" value={user.lastName} onChange={this.handleInputChange} />
                                                {_validatorReg.lastName.isInvalid &&
                                                    <div className="help-block" >{_validatorReg.lastName.message}</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="email">email</label>
                                                <input name="email" type="email"
                                                    className={"form-control " + (_validatorReg.email.isInvalid ? "has-error" : "")}
                                                    placeholder="Email" value={user.email} onChange={this.handleInputChange} />
                                                {_validatorReg.email.isInvalid &&
                                                    <div className="help-block" >{_validatorReg.email.message}</div>
                                                }
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="review">Password</label>
                                                <input required="" name="password" type="password"
                                                    className={"form-control " + (_validatorReg.password.isInvalid ? "has-error" : "")}
                                                    placeholder="Password" value={user.password} onChange={this.handleInputChange} />
                                                {_validatorReg.password.isInvalid &&
                                                    <div className="help-block" >{_validatorReg.password.message}</div>
                                                }
                                            </div>
                                           
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-6">
                                            <label htmlFor="review">Confirm Password</label>
                                            <input name="confirmPassword" type="password"
                                                className={"form-control " + (_validatorReg.confirmPassword.isInvalid ? "has-error" : "")}
                                                placeholder="Confirm Password" value={user.confirmPassword} onChange={this.handleInputChange} />
                                            {_validatorReg.confirmPassword.isInvalid &&
                                                <div className="help-block" >{_validatorReg.confirmPassword.message}</div>
                                            }
                                            </div>
                                            <div className="col-md-6">
                                                <br/>   <br/>
                                            <button type="submit" className="btn btn-solid">create Account</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default  withNavigation(Register);