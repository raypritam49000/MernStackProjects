import React, { Component } from 'react'
import FormValidator from '../../../_validators/FormValidator'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { commonService } from '../../../_services/common.service';
import DbOperation from '../../../_helpers/dbOperation';
import Breadcrumb from '../../common/breadcrumb';

import withNavigate from '../../../_helpers/withNavigate';
import withLocation from '../../../_helpers/withLocation';

import productImg from '../../../assets/images/noImage.png';
import bigImg from '../../../assets/images/bigImage.jpg';
import Global from '../../../_helpers/basePath';
import CKEditor from "react-ckeditor-component";

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.validatorReg = new FormValidator([
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
        field: 'code',
        method: 'isEmpty',
        validWhen: false,
        message: 'Code is required'
      },
      {
        field: 'price',
        method: 'isEmpty',
        validWhen: false,
        message: 'Price is required'
      },
      {
        field: 'salePrice',
        method: 'isEmpty',
        validWhen: false,
        message: 'Sale Price is required'
      },
      {
        field: 'discount',
        method: 'isEmpty',
        validWhen: false,
        message: 'Discount is required'
      },
      {
        field: 'sizeId',
        method: 'isEmpty',
        validWhen: false,
        message: 'Size is required'
      },
      {
        field: 'colorId',
        method: 'isEmpty',
        validWhen: false,
        message: 'Color is required'
      },
      {
        field: 'tagId',
        method: 'isEmpty',
        validWhen: false,
        message: 'Tag is required'
      },
      {
        field: 'categoryId',
        method: 'isEmpty',
        validWhen: false,
        message: 'Category is required'
      },
    ]);

    this.state = {
      bigImage: bigImg,
      productImages: [
        { img: productImg },
        { img: productImg },
        { img: productImg },
        { img: productImg },
        { img: productImg }
      ],
      dbops: DbOperation.create,
      btnText: "Save",

      product: {
        id: 0,
        name: '',
        title: '',
        code: '',
        price: '',
        salePrice: '',
        discount: '',
        quantity: 1,
        colorId: '',
        tagId: '',
        categoryId: '',
        sizeId: '',
        isNew: false,
        isSale: false,
        shortDetails: '',
        description: '',
      },
      objSizes: [],
      objColors: [],
      objTags: [],
      objCategories: [],

      submitted: false,
      validationReg: this.validatorReg.valid()
    }

    this.fileToUpload = []
  }

  componentDidMount() {
    this.getCategories();
    this.getColors();
    this.getSizes();
    this.getTags();

    if (this.props.location.state) {
      if (this.props.location.state.productId) {
        this.fillData(this.props.location.state.productId);
      }
    }
  }

  fillData = (productId) => {
    commonService.getById("ProductMaster", false, productId)
      .then(
        response => {
          if (response.isSuccess) {
            let res = response.data;
            this.setState({
              dbops: DbOperation.update,
              btnText: "Update",
              product: {
                id: res.id,
                name: res.name,
                code: res.code,
                title: res.title,
                price: res.price,
                salePrice: res.salePrice,
                discount: res.discount,
                quantity: res.quantity,
                colorId: res.colorId,
                tagId: res.tagId,
                categoryId: res.categoryId,
                sizeId: res.sizeId,
                isSale: res.isSale === 1 ? true : false,
                isNew: res.isNew === 1 ? true : false,
                shortDetails: res.shortDetails,
                description: res.description
              },
            });
            this.getPictures(res.id);
          } else {
            toast.error(response.errors[0], "Add Product");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "Add Product");
        }
      )
  }

  getPictures = (id) => {
    commonService.getProductPicturebyId("ProductMaster", false, id)
      .then(
        res => {
          if (res.isSuccess) {
            if (res.data.length > 0) {
              this.setState({
                bigImage: res.data[0] != null ? Global.BASE_IMAGES_PATH + res.data[0].name : bigImg,
                productImages: [
                  { img: res.data[0] != null ? Global.BASE_IMAGES_PATH + res.data[0].name : productImg },
                  { img: res.data[1] != null ? Global.BASE_IMAGES_PATH + res.data[1].name : productImg },
                  { img: res.data[2] != null ? Global.BASE_IMAGES_PATH + res.data[2].name : productImg },
                  { img: res.data[3] != null ? Global.BASE_IMAGES_PATH + res.data[3].name : productImg },
                  { img: res.data[4] != null ? Global.BASE_IMAGES_PATH + res.data[4].name : productImg }
                ]
              });

            }
          } else {
            toast.error(res.errors[0], "Add Product");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "Add Product");
        }
      )
  }

  getColors = () => {
    commonService.getAll("ColorMaster", false)
      .then(
        res => {
          if (res.isSuccess) {
            this.setState({
              objColors: res.data
            });
          } else {
            toast.error(res.errors[0], "Add Product");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "Add Product");
        }
      )
  }

  getTags = () => {
    commonService.getAll("TagMaster", false)
      .then(
        res => {
          if (res.isSuccess) {
            this.setState({
              objTags: res.data
            });
          } else {
            toast.error(res.errors[0], "Add Product");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "Add Product");
        }
      )
  }

  getSizes = () => {
    commonService.getAll("SizeMaster", false)
      .then(
        res => {
          if (res.isSuccess) {
            this.setState({
              objSizes: res.data
            });
          } else {
            toast.error(res.errors[0], "Add Product");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "Add Product");
        }
      )
  }

  getCategories = () => {
    commonService.getAll("Category", false)
      .then(
        res => {
          if (res.isSuccess) {
            this.setState({
              objCategories: res.data
            });
          } else {
            toast.error(res.errors[0], "Add Product");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "Add Product");
        }
      )
  }

  handleInputChange = (e) => {
    e.preventDefault();
    const { name, value, type, checked } = e.target;
    const { product } = this.state;

    type === 'checkbox' ?
      this.setState({
        product: {
          ...product,
          [name]: checked
        }
      }) :
      this.setState({
        product: {
          ...product,
          [name]: value
        }
      })
  }

  handleEditorChange = (e) => {
    const { product } = this.state;
    let content = e.editor.getData();

    this.setState({
      product: {
        ...product,
        description: content
      }
    })
  }

  clearForm = () => {
    this.fileToUpload = [];
    this.setState({
      bigImage: bigImg,
      productImages: [
        { img: productImg },
        { img: productImg },
        { img: productImg },
        { img: productImg },
        { img: productImg }
      ],
      dbops: DbOperation.create,
      btnText: "Save",
      product: {
        id: 0,
        name: '',
        title: '',
        code: '',
        price: '',
        salePrice: '',
        discount: '',
        quantity: 1,
        colorId: '',
        tagId: '',
        categoryId: '',
        sizeId: '',
        isNew: false,
        isSale: false,
        shortDetails: '',
        description: '',
      },
      objSizes: [],
      objColors: [],
      objTags: [],
      objCategories: [],

      submitted: false,
      validationReg: this.validatorReg.valid()
    });
  }

  handleCancel = () => {
    this.props.navigate('/products/physical/product-list');
  }

  incrementItem = () => {
    const { product } = this.state;
    this.setState({
      product: {
        ...product,
        quantity: product.quantity + 1
      }
    });
  }

  decrementItem = () => {
    const { product } = this.state;
    if (product.quantity > 1) {
      this.setState({
        product: {
          ...product,
          quantity: product.quantity - 1
        }
      });
    }
  }

  handleImgChange = (e, i) => {
    e.preventDefault();

    let files = e.target.files;

    if (files.length === 0) {
      return;
    }

    let type = files[0].type;
    if (type.match(/image\/*/) == null) {
      toast.error("Only images are supported here !!", "Add Product");
      e.target.value = null;
      return;
    }

    this.fileToUpload[i] = e.target.files[0];

    const { product, productImages } = this.state;

    //Show Image
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);

    reader.onload = () => {
      productImages[i].img = reader.result;
      this.setState({
        productImages: productImages,
        bigImage: productImages[0].img
      });
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();
    const validation = this.validatorReg.validate(this.state, 'product');
    this.setState({
      validationReg: validation,
      submitted: true
    });

    const { product, dbops } = this.state;

    if (dbops === DbOperation.create && this.fileToUpload.length < 5) {
      toast.error("Please upload 5 images per product !!", "Add Product");
      return;
    } else if ((dbops === DbOperation.update && this.fileToUpload.length > 0) && this.fileToUpload.length < 5) {
      toast.error("Please upload 5 images per product !!", "Add Product");
      return;
    }

    if (validation.isValid) {

      let formData = new FormData();
      formData.append("Id", product.id);
      formData.append("Name", product.name);
      formData.append("Title", product.title);
      formData.append("Code", product.code);
      formData.append("Price", product.price);
      formData.append("SalePrice", product.salePrice);
      formData.append("Discount", product.discount);
      formData.append("Quantity", product.quantity);
      formData.append("TagId", product.tagId);
      formData.append("ColorId", product.colorId);
      formData.append("CategoryId", product.categoryId);
      formData.append("SizeId", product.sizeId);
      formData.append("IsSale", product.isSale);
      formData.append("IsNew", product.isNew);
      formData.append("ShortDetails", product.shortDetails);
      formData.append("Description", product.description);

      if (this.fileToUpload) {
        for (let i = 0; i < this.fileToUpload.length; i++) {
          //formData.append("Image", this.fileToUpload[i], this.fileToUpload[i].name);
          let ToUpload = this.fileToUpload[i];
          formData.append("Image", ToUpload, ToUpload.name);
        }
      }

      switch (dbops) {
        case DbOperation.create:
          commonService.save("ProductMaster", true, formData)
            .then(
              res => {
                if (res.isSuccess) {
                  toast.success("Product has been added successfully !!", "Add Product");
                  this.clearForm();
                  this.props.navigate('/products/physical/product-list');
                } else {
                  toast.error(res.errors[0], "Add Product");
                }
              },
              (error) => {
                toast.error("Someting Went Wrong !!", "Add Product");
              }
            )
          break;
        case DbOperation.update:
          commonService.update("ProductMaster", true, formData)
            .then(
              res => {
                if (res.isSuccess) {
                  toast.success("Product data has been updated successfully !!", "Add Product");
                  this.clearForm();
                  this.props.navigate('/products/physical/product-list');
                } else {
                  toast.error(res.errors[0], "Add Product");
                }
              },
              (error) => {
                toast.error("Someting Went Wrong !!", "Add Product");
              }
            )
          break;
      }
    }
  }

  render() {
    const { objCategories, objColors, objSizes, objTags, btnText, submitted, product, validationReg, productImages, bigImage } = this.state;
    let _validator = submitted ? this.validatorReg.validate(this.state, 'product') : validationReg;

    return (
      <>
        <Breadcrumb title="Add Product" parent="Products/Physical" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Add Product</h5>
                </div>
                <div className="card-body">
                  <div className="row product-adding">
                    <div className="col-xl-5">
                      <div className="add-product">
                        <div className="row">
                          <div className="col-xl-9 xl-50 col-sm-6 col-9">
                            <img alt="Product banner" src={bigImage} className="img-fluid image_zoom_1 blur-up lazyloaded"
                            />
                          </div>
                          <div className="col-xl-3 xl-50 col-sm-6 col-3">
                            <ul className="file-upload-product">
                              {
                                productImages.map((res, i) => {
                                  return (
                                    <li key={i} >
                                      <div className='box-input-file'>
                                        <input type="file" className='upload' onChange={(e) => this.handleImgChange(e, i)} />
                                        <img alt="image" src={res.img} style={{ width: '50px', height: '50px' }} />
                                      </div>
                                    </li>
                                  )
                                })
                              }
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-7">
                      <form className="needs-validation add-product-form" onSubmit={this.handleSubmit} >
                        <div className="form form-label-center">
                          <div className="form-group mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">Name :</label>
                            <div className="col-xl-8 col-sm-7">
                              <input
                                type="text"
                                name="name"
                                className={"form-control " + (_validator.name.isInvalid ? "has-error" : "")}
                                value={product.name}
                                onChange={this.handleInputChange}
                              />
                              {
                                _validator.name.isInvalid &&
                                <div className='help-block' >{_validator.name.message}</div>
                              }
                            </div>
                          </div>
                          <div className="form-group mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">Title :</label>
                            <div className="col-xl-8 col-sm-7">
                              <input type="text" name="title"
                                className={"form-control " + (_validator.title.isInvalid ? "has-error" : "")}
                                value={product.title}
                                onChange={this.handleInputChange}
                              />
                              {
                                _validator.title.isInvalid &&
                                <div className='help-block' >{_validator.title.message}</div>
                              }
                            </div>
                          </div>
                          <div className="form-group mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">Code :</label>
                            <div className="col-xl-8 col-sm-7">
                              <input type="text" name="code"
                                className={"form-control " + (_validator.code.isInvalid ? "has-error" : "")}
                                value={product.code}
                                onChange={this.handleInputChange}
                              />
                              {
                                _validator.code.isInvalid &&
                                <div className='help-block' >{_validator.code.message}</div>
                              }
                            </div>
                          </div>
                          <div className="form-group mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">Price :</label>
                            <div className="col-xl-8 col-sm-7">
                              <input name="price"
                                type="number" className={"form-control " + (_validator.price.isInvalid ? "has-error" : "")}
                                value={product.price}
                                onChange={this.handleInputChange}
                              />
                              {
                                _validator.price.isInvalid &&
                                <div className='help-block' >{_validator.price.message}</div>
                              }
                            </div>
                          </div>
                          <div className="form-group mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">Sale Price :</label>
                            <div className="col-xl-8 col-sm-7">
                              <input
                                name="salePrice" type="number"
                                className={"form-control " + (_validator.salePrice.isInvalid ? "has-error" : "")}
                                value={product.salePrice}
                                onChange={this.handleInputChange}
                              />
                              {
                                _validator.salePrice.isInvalid &&
                                <div className='help-block' >{_validator.salePrice.message}</div>
                              }
                            </div>
                          </div>
                          <div className="form-group mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">Discount :</label>
                            <div className="col-xl-8 col-sm-7">
                              <input
                                name="discount" type="number"
                                className={"form-control " + (_validator.discount.isInvalid ? "has-error" : "")}
                                value={product.discount}
                                onChange={this.handleInputChange}
                              />
                              {
                                _validator.discount.isInvalid &&
                                <div className='help-block' >{_validator.discount.message}</div>
                              }
                            </div>
                          </div>

                          <div className="form-group  mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0" >Size :</label>
                            <div className="col-xl-8 col-sm-7">
                              <select name="sizeId" className={"form-control " + (_validator.sizeId.isInvalid ? "has-error" : "")}
                                value={product.sizeId}
                                onChange={this.handleInputChange}>
                                <option>--Select Size--</option>
                                {
                                  objSizes.map((value) => <option key={value.id} value={value.id} >{value.name}</option>)
                                }
                              </select>
                              {
                                _validator.sizeId.isInvalid &&
                                <div className='help-block' >{_validator.sizeId.message}</div>
                              }
                            </div>
                          </div>
                          <div className="form-group  mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0" >Categories :</label>
                            <div className="col-xl-8 col-sm-7">
                              <select name="categoryId" className={"form-control " + (_validator.categoryId.isInvalid ? "has-error" : "")}
                                value={product.categoryId}
                                onChange={this.handleInputChange}>
                                <option>--Select Category--</option>
                                {
                                  objCategories.map((value) => <option key={value.id} value={value.id} >{value.name}</option>)
                                }
                              </select>
                              {
                                _validator.categoryId.isInvalid &&
                                <div className='help-block' >{_validator.categoryId.message}</div>
                              }
                            </div>
                          </div>
                          <div className="form-group  mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0" >Tag :</label>
                            <div className="col-xl-8 col-sm-7">
                              <select name="tagId" className={"form-control " + (_validator.tagId.isInvalid ? "has-error" : "")}
                                value={product.tagId}
                                onChange={this.handleInputChange}>
                                <option>--Select Tag--</option>
                                {
                                  objTags.map((value) => <option key={value.id} value={value.id} >{value.name}</option>)
                                }
                              </select>
                              {
                                _validator.tagId.isInvalid &&
                                <div className='help-block' >{_validator.tagId.message}</div>
                              }
                            </div>
                          </div>
                          <div className="form-group  mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0" >Color :</label>
                            <div className="col-xl-8 col-sm-7">
                              <select name="colorId" className={"form-control " + (_validator.colorId.isInvalid ? "has-error" : "")}
                                value={product.colorId}
                                onChange={this.handleInputChange}>
                                <option>--Select Color--</option>
                                {
                                  objColors.map((value) => <option key={value.id} value={value.id} >{value.name}</option>)
                                }
                              </select>
                              {
                                _validator.colorId.isInvalid &&
                                <div className='help-block' >{_validator.colorId.message}</div>
                              }
                            </div>
                          </div>
                          <div className="form-group  mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">Total Products :</label>
                            <fieldset className="qty-box ml-0">
                              <div className="input-group bootstrap-touchspin">
                                <div className="input-group-prepend">
                                  <button className="btn btn-primary btn-square bootstraptouchspin-down" type="button"
                                    onClick={this.decrementItem} >
                                    <i className="fa fa-minus"></i>
                                  </button>
                                </div>
                                <div className="input-group-prepend">
                                  <span className="input-group-text bootstrap-touchspinprefix" ></span>
                                </div>
                                <input className="touchspin form-control qtyheight" style={{
                                  height: "46px"
                                }} type="text" value={product.quantity} disabled />
                                <div className="input-group-append">
                                  <span className="input-group-text bootstrap-touchspinpostfix"></span>
                                </div>
                                <div className="input-group-append ml-0">
                                  <button className="btn btn-primary btn-square bootstraptouchspin-up" type="button"
                                    onClick={this.incrementItem}>
                                    <i className="fa fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                          <div className="form-group  mb-3 row">
                            <label htmlFor="validationCustom0" className="col-xl-3 colmd-4">IsSale
                              :</label>
                            <div className="col-xl-8 col-md-7">
                              <input name="isSale" id="checkbox-primary-2" type="checkbox" checked={product.isSale}
                                onChange={this.handleInputChange} />
                              <label htmlFor="checkbox-primary-2">Select for mark this product for
                                Sale</label>
                            </div>
                          </div>
                          <div className="form-group  mb-3 row">
                            <label htmlFor="validationCustom0" className="col-xl-3 colmd-4">IsNew
                              :</label>
                            <div className="col-xl-8 col-md-7">
                              <input name="isNew" id="checkbox-primary-3" type="checkbox" checked={product.isNew}
                                onChange={this.handleInputChange}
                              />
                              <label htmlFor="checkbox-primary-3">Select for mark this product for
                                New</label>
                            </div>
                          </div>
                          <div className="form-group  mb-3 row">
                            <label htmlFor="validationCustom0" className="col-xl-3 col-md4"><span>*</span>Short
                              Details</label>
                            <textarea rows="5" cols="12" className="form-control col-xl-8 col-md-7" value={product.shortDetails}
                              onChange={this.handleInputChange}
                              name="shortDetails"></textarea>
                          </div>
                          <div className="form-group  mb-3 row">
                            <label className="col-xl-3 col-sm-4">Add Description :</label>
                            <div className="col-xl-8 col-sm-7 description-sm">
                              <CKEditor
                                activeClass="p10"
                                content={product.description}
                                events={{
                                  "change": this.handleEditorChange
                                }}
                              />
                            </div>
                          </div>
                          <div className="offset-xl-3 offset-sm-4">
                            <button type="submit" className="btn btn-primary">{btnText}</button>
                            <button type="button" className="btn btn-light" onClick={this.handleCancel} >Discard</button>
                          </div>
                        </div>
                      </form>
                    </div>
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


export default withNavigate(withLocation(AddProduct));