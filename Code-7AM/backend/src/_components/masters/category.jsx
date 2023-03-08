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
import noImage from '../../assets/images/noImage.png';


export default class Category extends Component {
  constructor() {
    super();

    this.validatorForm = new FormValidator([
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'Name is required'
      },
      {
        field: 'title',
        method: 'isEmpty',
        validWhen: false,
        message: 'Title is required'
      },
      {
        field: 'isSave',
        method: 'isEmpty',
        validWhen: false,
        message: 'Discount Value is required'
      },
      {
        field: 'isSave',
        method: 'isNumeric',
        validWhen: true,
        message: 'Discount Value must be numbers only'
      },
      {
        field: 'link',
        method: 'isEmpty',
        validWhen: false,
        message: 'Link is required'
      }
    ]);

    this.state = {
      dbops: DbOperation.create,
      btnText: "Save",
      data: [],
      open: false,
      category: {
        id: 0,
        name: '',
        title: '',
        isSave: '',
        link: '',
        image: ''
      },
      submitted: false,
      uploadedImage: noImage,
      formValidation: this.validatorForm.valid(),
    };
  }

  handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const { category } = this.state;

    this.setState({
      category: {
        ...category,
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
      category: {
        id: 0,
        name: '',
        title: '',
        isSave: '',
        link: '',
        image: ''
      },
      submitted: false,
      uploadedImage: noImage,
      formValidation: this.validatorForm.valid(),
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const validation = this.validatorForm.validate(this.state, 'category');
    this.setState({
      formValidation: validation,
      submitted: true
    });

    const { category, dbops } = this.state;

    if (dbops === DbOperation.create && !category.image) {
      toast.error("Please upload image !!", "Category");
      return;
    }

    if (validation.isValid) {
      let formData = new FormData();
      formData.append("Id", category.id);
      formData.append("Name", category.name);
      formData.append("Title", category.title);
      formData.append("IsSave", category.isSave);
      formData.append("Link", category.link);

      if (category.image) {
        formData.append("Image", category.image, category.image.name);
      }


      switch (dbops) {
        case DbOperation.create:
          commonService.save("Category", true, formData)
            .then(
              res => {
                if (res.isSuccess) {
                  toast.success("Data has been saved successfully !!", "Category Master");
                  this.clearForm();
                  this.getData();
                }
                else {
                  toast.error(res.errors[0], "Category Master");
                }
              },
              (error) => {
                toast.error("Someting Went Wrong !!", "Category Master");
              }
            )
          break;
        case DbOperation.update:
          commonService.update("Category", true, formData)
            .then(
              res => {
                if (res.isSuccess) {
                  toast.success("Data has been updated successfully !!", "Category Master");
                  this.clearForm();
                  this.getData();
                } else {
                  toast.error(res.errors[0], "Category Master");
                }
              },
              (error) => {
                toast.error("Someting Went Wrong !!", "Category Master");
              }
            )
          break;
      }
    }
  }

  getData = () => {
    commonService.getAll("Category", false)
      .then(
        res => {
          if (res.isSuccess) {
            this.setState({
              data: res.data
            });
          } else {
            toast.error(res.errors[0], "Category Master");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "Category Master");
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
      category: {
        id: objRow.id,
        name: objRow.name,
        title: objRow.title,
        isSave: objRow.isSave,
        link: objRow.link,
        image: ''
      },
      uploadedImage: objRow.imagePath,
      submitted: false,
      formValidation: this.validatorForm.valid(),
    });
  }

  onOpenModal = () => {
    this.setState({
      dbops: DbOperation.create,
      btnText: "Save",
      open: true,
      category: {
        id: 0,
        name: '',
        title: '',
        isSave: '',
        link: '',
        image: ''
      },
      submitted: false,
      uploadedImage: noImage,
      formValidation: this.validatorForm.valid(),
    });
  }

  onCloseModal = () => {
    this.setState({
      dbops: DbOperation.create,
      btnText: "Save",
      open: false,
      category: {
        id: 0,
        name: '',
        title: '',
        isSave: '',
        link: '',
        image: ''
      },
      submitted: false,
      uploadedImage: noImage,
      formValidation: this.validatorForm.valid(),
    });
  }

  onDelete = (Id) => {
    let obj = { id: Id };
    commonService.delete("Category", false, obj)
      .then(
        res => {
          if (res.isSuccess) {
            this.getData();
          } else {
            toast.error(res.errors[0], "Category Master");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "Category Master");
        }
      )
  }

  handleImgChange = (e) => {
    e.preventDefault();

    let files = e.target.files;

    if (files.length === 0) {
      return;
    }

    let type = files[0].type;
    if (type.match(/image\/*/) == null) {
      toast.error("Only images are supported here !!", "Category Master");
      e.target.value = null;
      this.setState({
        uploadedImage: noImage
      });
      return;
    }

    const { category } = this.state;

    this.setState({
      category: {
        ...category,
        image: files[0]
      }
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


  render() {
    const { open, data, submitted, formValidation, category, btnText, uploadedImage } = this.state;
    let _validation = submitted ? this.validatorForm.validate(this.state, 'category') : formValidation;
    let columns = ['name','title','isSave','link' ,'imagePath', 'createdOn'];
    let tableCols = getColumns(columns, true, this.onEdit, this.onDelete);

    return (
      <>
        <Breadcrumb title="Category" parent="Masters" />
        < div className="container-fluid" >
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Category Master</h5>
                </div>
                <div className="card-body">
                  <div className="btn-popup pull-right">
                    <button type="button" className="btn btn-primary" onClick={this.onOpenModal} >Add category</button>
                    <Modal open={open} onClose={this.onCloseModal}>
                      <div className="modal-header">
                        <h5 className="modal-title f-w-600" >Add
                          category</h5>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={this.handleSubmit} >
                          <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label" >
                              Name :</label>
                            <input
                              type="text"
                              name="name"
                              className={"form-control " + (_validation.name.isInvalid ? "has-error" : "")}
                              value={category.name}
                              onChange={this.handleInputChange}
                            />
                            {
                              _validation.name.isInvalid &&
                              <div className='help-block' >{_validation.name.message}</div>
                            }
                          </div>

                          <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label" >
                              Title :</label>
                            <input
                              type="text"
                              name="title"
                              className={"form-control " + (_validation.title.isInvalid ? "has-error" : "")}
                              value={category.title}
                              onChange={this.handleInputChange}
                            />
                            {
                              _validation.title.isInvalid &&
                              <div className='help-block' >{_validation.title.message}</div>
                            }
                          </div>

                          <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label" >
                              Discount Value :</label>
                            <input
                              type="text"
                              name="isSave"
                              className={"form-control " + (_validation.isSave.isInvalid ? "has-error" : "")}
                              value={category.isSave}
                              onChange={this.handleInputChange}
                            />
                            {
                              _validation.isSave.isInvalid &&
                              <div className='help-block' >{_validation.isSave.message}</div>
                            }
                          </div>

                          <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label" >
                              Link :</label>
                            <input
                              type="text"
                              name="link"
                              className={"form-control " + (_validation.link.isInvalid ? "has-error" : "")}
                              value={category.link}
                              onChange={this.handleInputChange}
                            />
                            {
                              _validation.link.isInvalid &&
                              <div className='help-block' >{_validation.link.message}</div>
                            }
                          </div>

                          <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label" >category
                              Logo :</label>
                            <input
                              className="form-control"
                              type="file"
                              name="image"
                              accept="image/*"
                              onChange={this.handleImgChange}
                            />
                            <br />
                            <img alt='brand logo' src={uploadedImage}
                              style={{ width: '100px', height: '100px' }} />
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
