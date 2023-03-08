import React, { Component } from 'react'
import LoginTabset from './login-tabset'

export default class Login extends Component {
    render() {
        return (
            <div className="page-wrapper">
                <div className="authentication-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 p-0 card-right">
                                <div className="card tab2-card">
                                    <div className="card-body">
                                        <LoginTabset />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
