import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getVisibleproducts } from '../../../services'

class FilterBar extends Component {

    gridLayout() {
        document.querySelector(".product-wrapper-grid").classList.remove("list-view");
        var elements = document.querySelector(".infinite-scroll-component  .row").childNodes;
        for (var i = 0; i < elements.length; i++) {
            elements[i].className = "";
            elements[i].classList.add("col-xl-3");
        }
    }
    listLayout() {
        document.querySelector(".product-wrapper-grid").classList.add("list-view");
        var elements = document.querySelector(".infinite-scroll-component  .row").childNodes;
        for (var i = 0; i < elements.length; i++) {
            elements[i].className = "";
            elements[i].classList.add("col-xl-12");
        }
    }
    layoutView(colSize) {
        if (!document.querySelector(".product-wrapper-grid").classList.contains("list-view")) {
            var elements = document.querySelector(".infinite-scroll-component  .row").childNodes;
            for (var i = 0; i < elements.length; i++) {
                elements[i].className = "";
                elements[i].classList.add("col-xl-" + colSize);
            }
        }
        this.props.onLayoutViewClicked(colSize);
    }
    render() {
        const { products } = this.props;
        return (
            <>
                <div className="product-filter-content">
                    <div className="search-count">
                        <h5>Showing Products 1-{products.length} Result</h5>
                    </div>
                    <div className="collection-view">
                        <ul>
                            <li><i className="fa fa-th grid-layout-view" onClick={this.gridLayout} ></i>
                            </li>
                            <li><i className="fa fa-list-ul list-layout-view" onClick={this.listLayout} ></i>
                            </li>
                        </ul>
                    </div>
                    <div className="collection-grid-view">
                        <ul>
                            <li>
                                <img src={`${process.env.PUBLIC_URL}/assets/images/icon/2.png`} className="product-2-layout-view"
                                    onClick={() => this.layoutView(6)} />
                            </li>
                            <li>
                                <img src={`${process.env.PUBLIC_URL}/assets/images/icon/3.png`} className="product-3-layout-view"
                                    onClick={() => this.layoutView(4)} />
                            </li>
                            <li>
                                <img src={`${process.env.PUBLIC_URL}/assets/images/icon/4.png`} className="product-4-layout-view"
                                    onClick={() => this.layoutView(3)} />
                            </li>
                            <li>
                                <img src={`${process.env.PUBLIC_URL}/assets/images/icon/6.png`} className="product-6-layout-view"
                                    onClick={() => this.layoutView(2)} />
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        products: getVisibleproducts(state.data, state.filters, props.category),
        filters: state.filters
    }
}
export default connect(mapStateToProps, null)(FilterBar);