import React, { Component } from 'react'
import { connect } from 'react-redux'
import SlideToggle from "react-slide-toggle";

import { getBrands, getColors, getMinMaxPrice } from '../../../services'
import { filterBrandAction, filterColorAction, filterPriceAction } from '../../../actions'

import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

class Filter extends Component {
    constructor() {
        super();
        this.activeColor = "";
    }

    brandHandler = (event, filterBrand) => {
        if (event.target.checked) {
            filterBrand.push(event.target.value);
        } else {
            let index = filterBrand.indexOf(event.target.value);
            filterBrand.splice(index, 1);
        }

        this.props.filterBrandAction(filterBrand);
    }

    colorHandler = (event, color) => {
        var elements = document.querySelectorAll(".color-selector ul li");

        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove("active");
        }

        if (this.activeColor === color) {
            this.activeColor = "";
            this.props.filterColorAction('');
        } else {
            event.target.classList.add("active");
            this.activeColor = color;
            this.props.filterColorAction(color);
        }
    }
    render() {
        const { brands, colors, prices, filters, filterPriceAction } = this.props;
        const filterBrand = this.props.filters.brand;

        return (
            <>
                <div className="collection-filter-block">
                    {/*brand filter start*/}
                    <SlideToggle
                        render={({ toggle, setCollapsibleElement }) => (
                            <div className="collection-collapse-block">
                                <h3 className="collapse-block-title" onClick={toggle}>brand</h3>
                                <div className="collection-collapse-block-content" ref={setCollapsibleElement}>
                                    <div className="collection-brand-filter">
                                        {
                                            brands.map((brand, index) => {
                                                return (
                                                    <div className="custom-control custom-checkbox collection-filtercheckbox" key={index}>
                                                        <input type="checkbox" className="custom-control-input"
                                                            onClick={(e) => this.brandHandler(e, filterBrand)}
                                                            value={brand}
                                                            id={brand}
                                                            defaultChecked={filterBrand.includes(brand) ? true : false}
                                                        />
                                                        <label className="custom-control-label"
                                                            htmlFor={brand}>{brand}</label>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                    {/*color filter start here*/}
                    <SlideToggle
                        render={({ toggle, setCollapsibleElement }) => (
                            <div className="collection-collapse-block">
                                <h3 className="collapse-block-title" onClick={toggle}>colors</h3>
                                <div className="collection-collapse-block-content" ref={setCollapsibleElement}>
                                    <div className="color-selector">
                                        <ul>
                                            {
                                                colors.map((color, index) => {
                                                    return (
                                                        <li className={color} key={index}
                                                            title={color}
                                                            onClick={(e) => this.colorHandler(e, color)}
                                                        >
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                    {/*price filter start here */}
                    <SlideToggle
                        render={({ toggle, setCollapsibleElement }) => (
                            <div className="collection-collapse-block open">
                                <h3 className="collapse-block-title" onClick={toggle}>price</h3>
                                <div className="collection-collapse-block-content block-price-content" ref={setCollapsibleElement}>
                                    <div className="collection-brand-filter">
                                        <div className="custom-control custom-checkbox collection-filtercheckbox">
                                            <InputRange
                                                maxValue={prices.max}
                                                minValue={prices.min}
                                                value={filters.value}
                                                onChange={(value) => filterPriceAction({ value })} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    />

                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        brands: getBrands(state.data.products),
        colors: getColors(state.data.products),
        prices: getMinMaxPrice(state.data.products),
        filters: state.filters
    }
}
export default connect(mapStateToProps, { filterBrandAction, filterColorAction, filterPriceAction })(Filter);