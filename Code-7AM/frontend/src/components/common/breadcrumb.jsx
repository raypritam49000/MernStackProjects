import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Breadcrumb extends Component {
  render() {
    const { title, parent } = this.props;
    return (
      <>
        <div className="breadcrumb-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="page-title">
                  <h2>{title}</h2>
                </div>
              </div>
              <div className="col-md-6">
                <nav aria-label="breadcrumb" className="themebreadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to={`${process.env.PUBLIC_URL}`} >Home</Link></li>
                    {
                      parent ? <li className="breadcrumb-item">{parent}</li> : ''
                    }
                    <li className="breadcrumb-item active" ariacurrent="page">{title}</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
