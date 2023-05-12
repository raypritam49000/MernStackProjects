import React, { Component } from 'react'
import { TableWithPagination } from '../../_helpers/table/tableWithPagination';
import getColumns from '../../_helpers/table/genColumns';
import Breadcrumb from '../common/breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { commonService } from '../../_services/common.service';
import { Chart } from "react-google-charts";

export default class Reports extends Component {
  constructor() {
    super();
    this.state = {
      data: [],

      salesChartData: [],
      salesChartOptions: {
        title: "Sales Data PaymentType Wise",
        hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
        vAxis: { minValue: 0 },
        chartArea: { width: "50%", height: "70%" },
      },

      customerGrowthData: [],
      customerGrowthOptions: {
        title: "Customer Growth",
        curveType: "function",
        legend: { position: "bottom" },
      },
      orderStatusData: []
    }
  }

  componentDidMount() {
    this.getData();
    this.chartSalesDataPaymentTypeWise();
    this.chartCustomerGrowthData();
    this.chartDataOrderStatus();
  }

  getData = () => {
    commonService.getDataFN("PaymentMaster", "GetReportInvoiceList", false)
      .then(
        res => {
          if (res.isSuccess) {

            this.setState({
              data: res.data
            });
          } else {
            toast.error(res.errors[0], "Reports");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "Reports");
        }
      )
  }

  chartSalesDataPaymentTypeWise = () => {
    // this.setState({
    //   salesChartData: [
    //     ["Year", "Sales", "Expenses"],
    //     ["2013", 1000, 400],
    //     ["2014", 1170, 460],
    //     ["2015", 660, 1120],
    //     ["2016", 1030, 540],
    //   ]
    // });

    commonService.getDataFN("PaymentMaster", "GetChartSalesDataPaymentTypeWise", false)
      .then(
        res => {
          if (res.isSuccess) {
            let objPatmentTypeChartData = [];
            let arr = ["Date"];
            let allData = res.data;
            // counts: 4 date: "04-05-2022" paymentType: "Processing"
            let allDates = allData.map(item => item.date).filter((value, index, self) => self.indexOf(value) === index);
            let allPayemtTypes = allData.map(item => item.paymentType).filter((value, index, self) => self.indexOf(value) === index);

            arr.push(...allPayemtTypes);
            objPatmentTypeChartData.push(arr);

            var varzero = 0;

            for (let date of allDates) {
              arr = [date];

              for (let type of allPayemtTypes) {
                arr.push(varzero);
              }

              for (let i in allPayemtTypes) {
                for (let index in allData) {
                  if (allPayemtTypes[i] === allData[index].paymentType && date === allData[index].date) {
                    arr[parseInt(i) + 1] = allData[index].counts;
                  }
                }
              }

              objPatmentTypeChartData.push(arr);

            }

            this.setState({
              salesChartData: objPatmentTypeChartData,
            });

          } else {
            toast.error(res.errors[0], "Reports");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "Reports");
        }
      )
  }

  chartCustomerGrowthData = () => {
    // this.setState({
    //   customerGrowthData: [
    //     ["Year", "Sales", "Expenses"],
    //     ["2004", 1000, 400],
    //     ["2005", 1170, 460],
    //     ["2006", 660, 1120],
    //     ["2008", 1030, 540],
    //     ["2009", 1000, 400],
    //     ["2010", 1170, 460],
    //     ["2011", 660, 1120],
    //     ["2012", 1030, 540],
    //   ]
    // });

    commonService.getDataFN("PaymentMaster", "GetChartUserGrowth", false)
      .then(
        res => {
          if (res.isSuccess) {
            let objCustomerGrowth = [];
            let arr = ["Date", "Counts"];
            objCustomerGrowth.push(arr);

            let allData = res.data;
            let allDates = allData.map(item => item.date).filter((value, index, self) => self.indexOf(value) === index);

            for (let date of allDates) {
              for (let index in allData) {
                if (date === allData[index].date) {
                  arr = [];
                  arr[0] = date;
                  arr[1] = allData[index].counts;
                }
              }
              objCustomerGrowth.push(arr);
            }

            this.setState({
              customerGrowthData: objCustomerGrowth,
            });

          } else {
            toast.error(res.errors[0], "Reports");
          }
        },
        (error) => {
          toast.error("Someting Went Wrong !!", "Reports");
        }
      )
  }

  chartDataOrderStatus = () => {
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
              orderStatusData: objOderStatusChartData,
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
    const { data, salesChartData, salesChartOptions, customerGrowthData, customerGrowthOptions, orderStatusData } = this.state;
    let columns = ['invoiceNo', 'orderStatus', 'paymentDate', 'paymentMethod', 'paymentStatus', 'shippingAmount', 'subTotalAmount', 'totalAmount'];
    let tableCols = getColumns(columns, false, null, null);

    return (
      <>
        <Breadcrumb title="Reports" parent="Reports" />
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-12 col-md-12">
              <div class="card">
                <div class="card-header">
                  <h5>Sales Data Payment Type Wise</h5>
                </div>
                <div class="card-body sell-graph">
                  <Chart
                    chartType="AreaChart"
                    width="100%"
                    height="400px"
                    data={salesChartData}
                    options={salesChartOptions}
                  />
                </div>
              </div>
            </div>
            <div class="col-xl-12 col-md-12">
              <div class="card report-employee">
                <div class="card-header">
                  <h5>Customer Growth</h5>
                </div>
                <div class="card-body p-0 o-hidden">
                  <div>
                    <Chart
                      chartType="ScatterChart"
                      width="80%"
                      height="400px"
                      data={customerGrowthData}
                      options={customerGrowthOptions}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="card">
                <div class="card-header">
                  <h5>Invoice List</h5>
                </div>
                <div class="card-body">
                  <div id="batchDelete" class="custom-datatable">
                    <div class="table-responsive">
                      <TableWithPagination data={data} columnFilter={true} columns={tableCols} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="card">
                <div class="card-header">
                  <h5>Order status data</h5>
                </div>
                <div class="card-body">
                  <div class="sales-chart">
                    <Chart chartType="ColumnChart" width="100%" height="400px" data={orderStatusData} />
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
