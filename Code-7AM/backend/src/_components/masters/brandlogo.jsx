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


export default class BrandLogo extends Component {
  constructor() {
    super();

    this.validatorForm = new FormValidator([
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'BrandLogo Name is required'
      }
    ]);

    this.state = {
      dbops: DbOperation.create,
      btnText: "Save",
      data: [],
      open: false,
      brandlogo: {
        id: 0,
        name: '',
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
    const { brandlogo } = this.state;

    this.setState({
      brandlogo: {
        ...brandlogo,
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
      brandlogo: {
        id: 0,
        name: '',
        image: ''
      },
      submitted: false,
      uploadedImage : noImage,
      formValidation: this.validatorForm.valid(),
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const validation = this.validatorForm.validate(this.state, 'brandlogo');
    this.setState({
      formValidation: validation,
      submitted: true
    });

    const { brandlogo, dbops } = this.state;

    if (dbops === DbOperation.create && !brandlogo.image) {
      toast.error("Please upload image !!", "BrandLogo");
      return;
    }

    if (validation.isValid) {
      let formData = new FormData();
      formData.append("Id", brandlogo.id);
      formData.append("Name", brandlogo.name);

      if (brandlogo.image) {
        formData.append("Image", brandlogo.image, brandlogo.image.name);
      }

      
      switch (dbops) {
        case DbOperation.create:
          commonService.save("BrandLogo", true, formData)
            .then(
              res => {
                if (res.isSuccess) {
                  toast.success("Data has been saved successfully !!", "BrandLogo Master");
                  this.clearForm();
                  this.getData();
                }
                else {
                  toast.error(res.errors[0], "BrandLogo Master");
                }
              },
              (error) => {
                toast.error("Someting Went Wrong !!", "BrandLogo Master");
              }
            )
          break;
        case DbOperation.update:
          commonService.update("BrandLogo", true, formData)
            .then(
              res => {
                if (res.isSuccess) {
                  toast.success("Data has been updated successfully !!", "BrandLogo Master");
                  this.clearForm();
                  this.getData();
                } else {
                  toast.error(res.errors[0], "BrandLogo Master");
                }
              },
              (error) => {
                toast.error("Someting Went Wrong !!", "BrandLogo Master");
              }
            )
          break;
      }
    }
  }

  getData = () => {
    commonService.getAll("BrandLogo", false)
      .then(
        res => {
          if (res.isSuccess) {
            this.setState({
              data: res.data
            });
          } else {
            toast.error(res.errors[0], "BrandLogo Master");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "BrandLogo Master");
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
      brandlogo: {
        id: objRow.id,
        name: objRow.name,
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
      brandlogo: {
        id: 0,
        name: '',
        image: ''
      },
      submitted: false,
      uploadedImage : noImage,
      formValidation: this.validatorForm.valid(),
    });
  }

  onCloseModal = () => {
    this.setState({
      dbops: DbOperation.create,
      btnText: "Save",
      open: false,
      brandlogo: {
        id: 0,
        name: '',
        image: ''
      },
      submitted: false,
      uploadedImage : noImage,
      formValidation: this.validatorForm.valid(),
    });
  }

  onDelete = (Id) => {
    let obj = { id: Id };
    commonService.delete("BrandLogo", false, obj)
      .then(
        res => {
          if (res.isSuccess) {
            this.getData();
          } else {
            toast.error(res.errors[0], "BrandLogo Master");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "BrandLogo Master");
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
      toast.error("Only images are supported here !!", "BrandLogo Master");
      e.target.value = null;
      this.setState({
        uploadedImage: noImage
      });
      return;
    }

    const { brandlogo } = this.state;

    this.setState({
      brandlogo: {
        ...brandlogo,
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
    const { open, data, submitted, formValidation, brandlogo, btnText, uploadedImage } = this.state;
    let _validation = submitted ? this.validatorForm.validate(this.state, 'brandlogo') : formValidation;
    let columns = ['name', 'imagePath', 'createdOn'];
    let tableCols = getColumns(columns, true, this.onEdit, this.onDelete);

    return (
      <>
        <Breadcrumb title="BrandLogo" parent="Masters" />
        < div className="container-fluid" >
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>BrandLogo Master</h5>
                </div>
                <div className="card-body">
                  <div className="btn-popup pull-right">
                    <button type="button" className="btn btn-primary" onClick={this.onOpenModal} >Add brandlogo</button>
                    <Modal open={open} onClose={this.onCloseModal}>
                      <div className="modal-header">
                        <h5 className="modal-title f-w-600" >Add
                          brandlogo</h5>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={this.handleSubmit} >
                          <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label" >brandlogo
                              Name :</label>
                            <input
                              type="text"
                              name="name"
                              className={"form-control " + (_validation.name.isInvalid ? "has-error" : "")}
                              value={brandlogo.name}
                              onChange={this.handleInputChange}
                            />
                            {
                              _validation.name.isInvalid &&
                              <div className='help-block' >{_validation.name.message}</div>
                            }
                          </div>
                          <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label" >brandlogo
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
