import React, { Component } from 'react'
import { TableWithPagination } from '../../../_helpers/table/tableWithPagination';
import getColumns from '../../../_helpers/table/genColumns';
import Breadcrumb from '../../common/breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { commonService } from '../../../_services/common.service';
import withNavigate from '../../../_helpers/withNavigate';


class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  handleAddProduct = () => {
    this.props.navigate('/products/physical/add-product');
  }
  onEdit = (row) => {
    this.props.navigate('/products/physical/add-product', { state: { productId: row.id } });
  }
  onDelete = (Id) => {
    let obj = { id: Id };
    commonService.delete("ProductMaster", false, obj)
      .then(
        res => {
          if (res.isSuccess) {
            this.getData();
          } else {
            toast.error(res.errors[0], "Add Product");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "Add Product");
        }
      )
  }

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    commonService.getAll("ProductMaster", false)
      .then(
        res => {
          if (res.isSuccess) {
            this.setState({
              data: res.data
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
  render() {
    const { data } = this.state;
    let columns = ['name', 'title', 'code', 'price', 'salePrice', 'discount', 'quantity', 'createdOn'];
    let tableCols = getColumns(columns, true, this.onEdit, this.onDelete);

    return (
      <>
        <Breadcrumb title="Products List" parent="Products/Physical" />
        <div className="container-fluid" >
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Products List</h5>
                </div>
                <div className="card-body">
                  <div className='btn-popup pull-right'>
                    <button type='button' className='btn  btn-primary' onClick={this.handleAddProduct} >Add Product</button>
                  </div>
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <TableWithPagination data={data} columnFilter={false} columns={tableCols} />
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

export default withNavigate(ProductList);