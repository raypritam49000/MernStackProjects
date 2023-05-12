import React, { Component } from 'react'
import { TableWithPagination } from '../../_helpers/table/tableWithPagination';
import getColumns from '../../_helpers/table/genColumns';
import Breadcrumb from '../common/breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { commonService } from '../../_services/common.service';

export default class Invoice extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    commonService.getDataFN("PaymentMaster","GetReportInvoiceList", false)
      .then(
        res => {
          if (res.isSuccess) {
            this.setState({
              data: res.data
            });
          } else {
            toast.error(res.errors[0], "Invoice");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "Invoice");
        }
      )
  }
  render() {
    const { data } = this.state;
    let columns = ['invoiceNo', 'orderStatus', 'paymentDate', 'paymentMethod', 'paymentStatus', 'shippingAmount', 'subTotalAmount', 'totalAmount'];
    let tableCols = getColumns(columns, true, null, null);

    return (
      <>
        <Breadcrumb title="Invoice" parent="Invoice" />
        <div className="container-fluid" >
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Invoice List</h5>
                </div>
                <div className="card-body">
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
