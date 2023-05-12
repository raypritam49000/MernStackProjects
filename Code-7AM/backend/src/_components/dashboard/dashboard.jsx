import React, { Component } from 'react'
import { TableWithPagination } from '../../_helpers/table/tableWithPagination';
import getColumns from '../../_helpers/table/genColumns';
import Breadcrumb from '../common/breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { commonService } from '../../_services/common.service';
import CountTo from 'react-count-to';
import { Navigation, Box, MessageSquare, Users } from 'react-feather';
import { Chart } from "react-google-charts";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],

      orders: 0,
      shipAmt: 0,
      cashonDelivery: 0,
      cancelled: 0,

      chartData: [],

      chartOptions: {
        title: "Order Status",
        curveType: "function",
        legend: { position: "bottom" },
      }

    }
  }

  componentDidMount() {
    this.getData();
    this.getReportNetFigure();
    this.getChartOrderStatus();
  }
  getData = () => {
    commonService.getDataFN("PaymentMaster", "GetReportManageOrder", false)
      .then(
        res => {
          if (res.isSuccess) {
            this.setState({
              data: res.data
            });
          } else {
            toast.error(res.errors[0], "Dashboard");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "Dashboard");
        }
      )
  }

  getReportNetFigure = () => {
    commonService.getDataFN("PaymentMaster", "GetReportNetFigure", false)
      .then(
        res => {
          if (res.isSuccess) {
            this.setState({
              orders: res.data[0].orders,
              cancelled: res.data[0].cancelled,
              cashonDelivery: res.data[0].cashOnDelivery,
              shipAmt: res.data[0].shippingAmount
            });
          } else {
            toast.error(res.errors[0], "Dashboard");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "Dashboard");
        }
      )
  }


  getChartOrderStatus() {
    // this.setState({
    //   chartData: [
    //     ["Year", "Sales", "Expenses"],
    //     ["2004", 1000, 400],
    //     ["2005", 1170, 460],
    //     ["2006", 660, 1120],
    //     ["2007", 1030, 540],
    //   ],
    // });

    commonService.getDataFN("PaymentMaster", "GetChartOrderStatus", false)
      .then(
        res => {
          if (res.isSuccess) {
            let objOderStatusChartData = [];
            let arr = ["Date"];
            let allData = res.data;
            // counts: 4 date: "04-05-2022" orderStatus: "Processing"
            let allDates = allData.map(item => item.date).filter((value, index, self) => self.indexOf(value) === index);
            let allOrderStatus = allData.map(item => item.orderStatus).filter((value, index, self) => self.indexOf(value) === index);

            arr.push(...allOrderStatus);
            objOderStatusChartData.push(arr);

            var varzero = 0;

            for (let date of allDates) {
              arr = [date];

              for (let status of allOrderStatus) {
                arr.push(varzero);
              }

              for (let i in allOrderStatus) {
                for (let index in allData) {
                  if (allOrderStatus[i] === allData[index].orderStatus && date === allData[index].date) {
                    arr[parseInt(i) + 1] = allData[index].counts;
                  }
                }
              }

              objOderStatusChartData.push(arr);

            }

            this.setState({
              chartData: objOderStatusChartData,
            });

          } else {
            toast.error(res.errors[0], "Dashboard");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "Dashboard");
        }
      )

  }

  render() {
    const { data, cancelled, cashonDelivery, orders, shipAmt, chartData, chartOptions } = this.state;
    let columns = ['orderId', 'orderStatus', 'paymentDate', 'paymentMethod', 'paymentStatus', 'shippingAmount', 'subTotalAmount', 'totalAmount'];
    let tableCols = getColumns(columns, false, null, null);

    return (
      <>
        <Breadcrumb title="Dashboard" parent="Dashboard" />
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-3 col-md-6 xl-50">
              <div class="card o-hidden widget-cards">
                <div class="bg-warning card-body">
                  <div class="media static-top-widget row">
                    <div class="icons-widgets col-4">
                      <div class="align-self-center text-center">
                        <Navigation className='font-warning' />
                      </div>
                    </div>
                    <div class="media-body col-8"><span class="m-0">Orders</span>
                      <h3 class="mb-0">₹ <CountTo to={orders} speed={1234} /><small>This Year</small></h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6 xl-50">
              <div class="card o-hidden widget-cards">
                <div class="bg-secondary card-body">
                  <div class="media static-top-widget row">
                    <div class="icons-widgets col-4">
                      <div class="align-self-center text-center">
                        <Box className='font-secondary' />
                      </div>
                    </div>
                    <div class="media-body col-8"><span class="m-0">Shipping amount</span>
                      <h3 class="mb-0">₹ <CountTo to={shipAmt} speed={1234} /><small>This Year</small></h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6 xl-50">
              <div class="card o-hidden widget-cards">
                <div class="bg-primary card-body">
                  <div class="media static-top-widget row">
                    <div class="icons-widgets col-4">
                      <div class="align-self-center text-center">
                        <MessageSquare className='font-primary' />
                      </div>
                    </div>
                    <div class="media-body col-8"><span class="m-0">Cash On Delivery</span>
                      <h3 class="mb-0">₹ <CountTo to={cashonDelivery} speed={1234} /><small>This Year</small></h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6 xl-50">
              <div class="card o-hidden widget-cards">
                <div class="bg-danger card-body">
                  <div class="media static-top-widget row">
                    <div class="icons-widgets col-4">
                      <div class="align-self-center text-center">
                        <Users className='font-danger' />
                      </div>
                    </div>
                    <div class="media-body col-8"><span class="m-0">Cancelled</span>
                      <h3 class="mb-0">₹ <CountTo to={cancelled} speed={1234} /><small>This Year</small></h3>
                    </div>
                  </div>
                </div>
              </div>
            </div >
            <div class="col-xl-12 xl-100">
              <div class="card">
                <div class="card-header">
                  <h5>Latest Orders</h5>
                </div>
                <div class="card-body">
                  <div class="user-status table-responsive latest-order-table">
                    <div id="batchDelete" class="category-table custom-datatable transcationdatatable">
                      <div class="table-responsive">
                        <TableWithPagination data={data} columnFilter={true} columns={tableCols} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div >
            <div class="col-sm-12">
              <div class="card">
                <div class="card-header">
                  <h5> Order Status </h5>
                </div>
                <div class="card-body sell-graph">
                  <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={chartData}
                    options={chartOptions}
                  />
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
