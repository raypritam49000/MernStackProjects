import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb'

export default class PageNotFound extends Component {
  render() {
    return (
      <>
        <Breadcrumb title='Error Page' />
        <section className="p-0">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="error-section">
                  <h1>404</h1>
                  <h2>page not found</h2>
                  <Link to={`${process.env.process}/`} >   back to home</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}
