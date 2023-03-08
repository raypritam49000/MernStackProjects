import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SlideToggle from "react-slide-toggle";

export default class CategoryBlock extends Component {
    render() {
        return (
            <>
                <div className="collection-filter-block">
                    <SlideToggle
                        render={({ toggle, setCollapsibleElement }) => (
                            <div className="collection-collapse-block">
                                <h3 className="collapse-block-title" onClick={toggle}>category</h3>
                                <div className="collection-collapse-block-content" ref={setCollapsibleElement}>
                                    <div className="collection-brand-filter">
                                        <ul className="category-list">
                                            <li><Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection/men`} >Men</Link></li>
                                            <li><Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection/women`} >Women</Link></li>
                                        </ul>
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
