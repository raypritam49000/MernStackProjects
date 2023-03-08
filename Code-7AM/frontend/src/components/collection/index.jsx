import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import withRouter from '../../helpers/withRouter'
import Breadcrumb from '../common/breadcrumb'

import CategoryBlock from '../common/category-block'
import NewProduct from '../common/new-product'
import Filter from './widgets/filter'
import FilterBar from './widgets/filter-bar'
import ProductListing from './widgets/product-listing'
import { ToastContainer } from 'react-toastify'


class Collection extends Component {
  constructor() {
    super();

    this.state = {
      layoutColumn: 3
    };
  }

  LayoutViewClicked(column) {
    this.setState({
      layoutColumn: column
    });
  }

  render() {
    return (
      <>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Sahosoft Mall | Collection of Products</title>
          <meta name='description' content='Sahosoft Mall | Fashion Store' />
        </Helmet>
        <Breadcrumb parent='Products' title='Collection' />
        <section className="section-b-space">
          <div className="collection-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-sm-3 collection-filter">
                  <CategoryBlock />
                  <Filter />
                  <NewProduct />
                </div>
                <div className="collection-content col">
                  <div className="page-main-content ">
                    <div className="">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="top-banner-wrapper">
                            {
                              this.props.match.params.category === 'men' ?
                                <img src={`${process.env.PUBLIC_URL}/assets/images/mega-menu/2.jpg`} alt='category image' className='img-fluid' />
                                : <img src={`${process.env.PUBLIC_URL}/assets/images/mega-menu/1.jpg`} alt='category image' className='img-fluid' />
                            }
                            <div className="top-banner-content small-section">
                              <h4>fashion</h4>
                              <h5>Sahosoft</h5>
                              <p>Sahosoft Mall</p>
                            </div>
                          </div>
                          <div className="collection-product-wrapper">
                            <div className="product-top-filter">
                              <div className="container-fluid p-0">
                                <div className="row">
                                  <div className="col-12">
                                    <FilterBar
                                      onLayoutViewClicked={(col) => this.LayoutViewClicked(col)}
                                      category={this.props.match.params.category}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <ProductListing
                              category={this.props.match.params.category}
                              colSize={this.state.layoutColumn}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer />
      </>
    )
  }
}


export default withRouter(Collection);