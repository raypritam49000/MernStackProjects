import React, { Component } from 'react'
import { TableWithPagination } from '../../_helpers/table/tableWithPagination';
import getColumns from '../../_helpers/table/genColumns';
import Breadcrumb from '../common/breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { commonService } from '../../_services/common.service';
import withNavigate from '../../_helpers/withNavigate';


class ListUser extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  handleAddUser = () => {
    this.props.navigate('/users/add-user');
  }
  onEdit = (row) => {
    this.props.navigate('/users/add-user', { state: { objRow: row } });
  }
  onDelete = (Id) => {
    let obj = { id: Id };
    commonService.delete("UserMaster", false, obj)
      .then(
        res => {
          if (res.isSuccess) {
            this.getData();
          } else {
            toast.error(res.errors[0], "User Master");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "User Master");
        }
      )
  }

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    commonService.getAll("UserMaster", false)
      .then(
        res => {
          if (res.isSuccess) {
            this.setState({
              data: res.data
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
  render() {
    const { data } = this.state;
    let columns = ['firstName', 'lastName', 'email', 'userType', 'createdOn'];
    let tableCols = getColumns(columns, true, this.onEdit, this.onDelete);

    return (
      <>
        <Breadcrumb title="List Users" parent="Users" />
        <div className="container-fluid" >
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>User List</h5>
                </div>
                <div className="card-body">
                  <div className='btn-popup pull-right'>
                    <button type='button' className='btn  btn-primary' onClick={this.handleAddUser} >Add User</button>
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

export default withNavigate(ListUser);