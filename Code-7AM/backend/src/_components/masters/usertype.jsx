import React, { Component } from 'react'
import FormValidator from '../../_validators/FormValidator'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { commonService } from '../../_services/common.service';
import DbOperation from '../../_helpers/dbOperation'
import Breadcrumb from '../common/breadcrumb'

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { TableWithPagination } from '../../_helpers/table/tableWithPagination';
import getColumns from '../../_helpers/table/genColumns.js';

export default class UserType extends Component {
    constructor() {
        super();

        this.validatorForm = new FormValidator([
            {
                field: 'name',
                method: 'isEmpty',
                validWhen: false,
                message: 'User Type Name is required'
            }
        ]);

        this.state = {
            dbops: DbOperation.create,
            btnText: "Save",
            data: [],
            open: false,
            usertype: {
                id: 0,
                name: ''
            },
            submitted: false,
            formValidation: this.validatorForm.valid(),
        };
    }

    handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const { usertype } = this.state;

        this.setState({
            usertype: {
                ...usertype,
                [name]: value
            }
        });
    }

    clearForm = () => {
        this.setState({
            dbops: DbOperation.create,
            btnText: "Save",
            data: [],
            open: false,
            usertype: {
                id: 0,
                name: ''
            },
            submitted: false,
            formValidation: this.validatorForm.valid(),
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const validation = this.validatorForm.validate(this.state, 'usertype');
        this.setState({
            formValidation: validation,
            submitted: true
        });

        const { usertype, dbops } = this.state;

        if (validation.isValid) {
            switch (dbops) {
                case DbOperation.create:
                    commonService.save("UserType", false, usertype)
                        .then(
                            res => {
                                if (res.isSuccess) {
                                    toast.success("Data has been saved successfully !!", "UserType Master");
                                    this.clearForm();
                                    this.getData();
                                }
                                else {
                                    toast.error(res.errors[0], "UserType Master");
                                }
                            },
                            (error) => {
                                toast.error("Someting Went Wrong !!", "UserType Master");
                            }
                        )
                    break;
                case DbOperation.update:
                    commonService.update("UserType", false, usertype)
                        .then(
                            res => {
                                if (res.isSuccess) {
                                    toast.success("Data has been updated successfully !!", "UserType Master");
                                    this.clearForm();
                                    this.getData();
                                } else {
                                    toast.error(res.errors[0], "UserType Master");
                                }
                            },
                            (error) => {
                                toast.error("Someting Went Wrong !!", "UserType Master");
                            }
                        )
                    break;
            }
        }
    }

    getData = () => {
        commonService.getAll("UserType", false)
            .then(
                res => {
                    if (res.isSuccess) {
                        this.setState({
                            data: res.data
                        });
                    } else {
                        toast.error(res.errors[0], "UserType Master");
                    }
                },
                (error) => {
                    toast.error("Someting Went Wrong !!", "UserType Master");
                }
            )
    }

    componentDidMount() {
        this.getData();
    }

    onEdit = (objRow) => {
        this.setState({
            dbops: DbOperation.update,
            btnText: "Update",
            open: true,
            usertype: {
                id: objRow.id,
                name: objRow.name
            },
            submitted: false,
            formValidation: this.validatorForm.valid(),
        });
    }

    onOpenModal = () => {
        this.setState({
            dbops: DbOperation.create,
            btnText: "Save",
            open: true,
            usertype: {
                id: 0,
                name: ''
            },
            submitted: false,
            formValidation: this.validatorForm.valid(),
        });
    }

    onCloseModal = () => {
        this.setState({
            dbops: DbOperation.create,
            btnText: "Save",
            open: false,
            usertype: {
                id: 0,
                name: ''
            },
            submitted: false,
            formValidation: this.validatorForm.valid(),
        });
    }

    onDelete = (Id) => {
        let obj = { id: Id };
        commonService.delete("UserType", false, obj)
            .then(
                res => {
                    if (res.isSuccess) {
                        this.getData();
                    } else {
                        toast.error(res.errors[0], "UserType Master");
                    }
                },
                (error) => {
                    toast.error("Someting Went Wrong !!", "UserType Master");
                }
            )
    }



    render() {
        const { open, data, submitted, formValidation, usertype, btnText } = this.state;
        let _validation = submitted ? this.validatorForm.validate(this.state, 'usertype') : formValidation;
        let columns = ['name','createdOn'];
        let tableCols = getColumns(columns,true,this.onEdit,this.onDelete);

        return (
            <>
                <Breadcrumb title="UserType" parent="Masters" />
                < div className="container-fluid" >
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>UserType Master</h5>
                                </div>
                                <div className="card-body">
                                    <div className="btn-popup pull-right">
                                        <button type="button" className="btn btn-primary" onClick={this.onOpenModal} >Add usertype</button>
                                        <Modal open={open} onClose={this.onCloseModal}>
                                            <div className="modal-header">
                                                <h5 className="modal-title f-w-600" >Add
                                                    usertype</h5>
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={this.handleSubmit} >
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label" >usertype
                                                            Name :</label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            className={"form-control " + (_validation.name.isInvalid ? "has-error" : "")}
                                                            value={usertype.name}
                                                            onChange={this.handleInputChange}
                                                        />
                                                        {
                                                            _validation.name.isInvalid &&
                                                            <div className='help-block' >{_validation.name.message}</div>
                                                        }
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="submit" className="btn btnprimary">{btnText}</button>
                                                        <button type="button" className="btn btnsecondary"
                                                            onClick={this.onCloseModal}>Close</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        <TableWithPagination data={data} columnFilter columns={tableCols} />
                                    </div>
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
