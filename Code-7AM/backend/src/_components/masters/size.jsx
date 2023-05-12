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
import Swal from 'sweetalert2'

export default class Size extends Component {
    constructor() {
        super();

        this.validatorForm = new FormValidator([
            {
                field: 'name',
                method: 'isEmpty',
                validWhen: false,
                message: 'Size Name is required'
            }
        ]);

        this.state = {
            dbops: DbOperation.create,
            btnText: "Save",
            data: [],
            open: false,
            size: {
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
        const { size } = this.state;

        this.setState({
            size: {
                ...size,
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
            size: {
                id: 0,
                name: ''
            },
            submitted: false,
            formValidation: this.validatorForm.valid(),
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const validation = this.validatorForm.validate(this.state, 'size');
        this.setState({
            formValidation: validation,
            submitted: true
        });

        const { size, dbops } = this.state;

        if (validation.isValid) {
            switch (dbops) {
                case DbOperation.create:
                    commonService.save("SizeMaster", false, size)
                        .then(
                            res => {
                                if (res.isSuccess) {
                                    toast.success("Data has been saved successfully !!", "Size Master");
                                    this.clearForm();
                                    this.getData();
                                }
                                else {
                                    toast.error(res.errors[0], "Size Master");
                                }
                            },
                            (error) => {
                                toast.error("Someting Went Wrong !!", "Size Master");
                            }
                        )
                    break;
                case DbOperation.update:
                    commonService.update("SizeMaster", false, size)
                        .then(
                            res => {
                                if (res.isSuccess) {
                                    toast.success("Data has been updated successfully !!", "Size Master");
                                    this.clearForm();
                                    this.getData();
                                } else {
                                    toast.error(res.errors[0], "Size Master");
                                }
                            },
                            (error) => {
                                toast.error("Someting Went Wrong !!", "Size Master");
                            }
                        )
                    break;
            }
        }
    }

    getData = () => {
        commonService.getAll("SizeMaster", false)
            .then(
                res => {
                    if (res.isSuccess) {
                        this.setState({
                            data: res.data
                        });
                    } else {
                        toast.error(res.errors[0], "Size Master");
                    }
                },
                (error) => {
                    toast.error("Someting Went Wrong !!", "Size Master");
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
            size: {
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
            size: {
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
            size: {
                id: 0,
                name: ''
            },
            submitted: false,
            formValidation: this.validatorForm.valid(),
        });
    }

    onDelete = (Id) => {
        let obj = { id: Id };
        commonService.delete("SizeMaster", false, obj)
            .then(
                res => {
                    if (res.isSuccess) {
                        this.getData();
                    } else {
                        toast.error(res.errors[0], "Size Master");
                    }
                },
                (error) => {
                    toast.error("Someting Went Wrong !!", "Size Master");
                }
            )
    }



    render() {
        const { open, data, submitted, formValidation, size, btnText } = this.state;
        let _validation = submitted ? this.validatorForm.validate(this.state, 'size') : formValidation;
        let columns = ['name', 'createdOn'];
        let tableCols = getColumns(columns, true, this.onEdit, this.onDelete);

        return (
            <>
                <Breadcrumb title="Size" parent="Masters" />
                < div className="container-fluid" >
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Size Master</h5>
                                </div>
                                <div className="card-body">
                                    <div className="btn-popup pull-right">
                                        <button type="button" className="btn btn-primary" onClick={this.onOpenModal} >Add Size</button>
                                        <Modal open={open} onClose={this.onCloseModal}>
                                            <div className="modal-header">
                                                <h5 className="modal-title f-w-600" >Add
                                                    Size</h5>
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={this.handleSubmit} >
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label" >Size
                                                            Name :</label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            className={"form-control " + (_validation.name.isInvalid ? "has-error" : "")}
                                                            value={size.name}
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
