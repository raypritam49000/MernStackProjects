import React, { Component } from 'react'
import Breadcrumb from "../common/breadcrumb";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { dataService } from '../../services/data.service';

import { connect } from 'react-redux';
import { changeloggedIn } from '../../actions';

import FromValidator from '../../validator/formValidator';
import { Link } from 'react-router-dom'


import withNavigation from '../../helpers/withNavigate';
import {Helmet} from "react-helmet";

class Login extends Component {
    constructor(props) {
        super(props);

        this.validatorLogin = new FromValidator([
            {
                field: 'userName',
                method: 'isEmpty',
                validWhen: false,
                message: 'Username is required'
            },
            {
                field: 'userName',
                method: 'isEmail',
                validWhen: true,
                message: 'Enter valid Username'
            },
            {
                field: 'password',
                method: 'isEmpty',
                validWhen: false,
                message: 'password is required'
            }
        ]);

        this.state = {
            userName: '',
            password: '',
            loginSubmitted: false,

            validationLogin: this.validatorLogin.valid(),
        };

        this.doLogin = this.doLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.logout();
    }

    handleChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    async doLogin(event) {
        event.preventDefault();
        const validation = this.validatorLogin.validate(this.state, '');
        this.setState({ validationLogin: validation });

        this.setState({ loginSubmitted: true });

        const { userName, password } = this.state;

        if (validation.isValid) {
            dataService.login(userName, password)
                .then(
                    res => {
                        if (res.isSuccess) {
                            if (res.data.id === 0) {
                                toast.error("Please enter valid username and password !!", "Login");
                                localStorage.removeItem("userDetails");
                                this.clearLoginForm();
                            } else {
                                localStorage.setItem("userDetails", JSON.stringify(res.data));
                                //this.props.setLoggedIn(true, res.data);
                                this.props.changeloggedIn(true, res.data);
                                this.clearLoginForm();
                                this.props.navigate('/');
                            }
                        } else {
                            localStorage.removeItem("userDetails");
                            toast.error("Invalid Credetials !!", "Login");
                            this.clearLoginForm();
                        }
                    }, error => {
                        localStorage.removeItem("userDetails");
                        toast.error("Invalid Credetials !!", "Login");
                        this.clearLoginForm();
                    }
                )
        }
    }

    clearLoginForm = () => {
        this.setState({
            userName: '',
            password: ''
        });
    }

    logout() {
        localStorage.clear();
        //this.props.setLoggedIn(false, {});
        this.props.changeloggedIn(false, {});
    }

    render() {
        const { userName, password, loginSubmitted } = this.state;
        let _validatorLogin = loginSubmitted ? this.validatorLogin.validate(this.state, '') : this.state.validationLogin;

        return (
            <div>
                <Helmet>
                    <meta charSet='utf-8' />
                    <title>Sahosoft Mall | Login</title>
                    <meta name='description' content='Sahosoft Mall | Login' />
                </Helmet>
                <Breadcrumb title={'Login'} />
                {/*Login section*/}
                <section className="login-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h3>Login</h3>
                                <div className="theme-card">
                                    <form className="theme-form" onSubmit={this.doLogin} >
                                        <div className='form-group'>
                                            <input name="userName" type="email"
                                                className={"form-control " + (_validatorLogin.userName.isInvalid ? "has-error" : "")}
                                                placeholder="Username" value={userName} onChange={this.handleChange} />
                                            {_validatorLogin.userName.isInvalid &&
                                                <div className="help-block" >{_validatorLogin.userName.message}</div>
                                            }
                                        </div>
                                        <div className='form-group'>
                                            <input name="password" type="password"
                                                className={"form-control " + (_validatorLogin.password.isInvalid ? "has-error" : "")}
                                                placeholder="Password" value={password} onChange={this.handleChange} />
                                            {_validatorLogin.password.isInvalid &&
                                                <div className="help-block" >{_validatorLogin.password.message}</div>
                                            }
                                        </div>
                                        <div className="form-button">
                                            <button className="btn btn-primary" type="submit" >Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 right-login">
                                <h3>New Customer</h3>
                                <div className="theme-card authentication-right">
                                    <h6 className="title-font">Create A Account</h6>
                                    <p>Sign up for a free account at our store. Registration is quick and easy. It
                                        allows you to be able to order from our shop. To start shopping click register.</p>

                                    <Link to={`${process.env.PUBLIC_URL}/pages/register`} className="btn btn-solid">Create an Account</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <ToastContainer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

// const MapDispatchToProps = (dispatch) => {
//     return {
//         setLoggedIn: (isLoggedIn, user) => {
//             dispatch(changeLoggedIn(isLoggedIn, user))
//         }
//     }
// }

//export default connect(mapStateToProps, MapDispatchToProps) (withNavigation(Login));

 export default connect(mapStateToProps, { changeloggedIn }) (withNavigation(Login));