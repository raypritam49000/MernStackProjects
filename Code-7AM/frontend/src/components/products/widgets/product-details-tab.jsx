import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default class ProductDetailsTab extends Component {
    render() {
        const { item } = this.props;

        return (
            <>
                <section className="tab-product m-0">
                    <div className="row">
                        <div className="col-sm-12 col-lg-12">
                            <Tabs className="tab-content nav-material">
                                <TabList className="nav nav-tabs nav-material">
                                    <Tab className="nav-item">
                                        <span className="nav-link active">
                                            <i className="icofont icofont-uihome"></i>Description</span>
                                        <div className="material-border">{item.shortDetails}</div>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link" ><i className="icofont
icofont-man-in-glasses"></i>Details</span>
                                        <div className="material-border"></div>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link" >
                                            <i className="icofont icofontcontacts"></i>Video</span>
                                        <div className="material-border"></div>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link" >
                                            <i className="icofont icofont-contacts"></i>Write
                                            Review</span>
                                        <div className="material-border"></div>
                                    </Tab>
                                </TabList>
                                <TabPanel className="tab-pane fade mt-4 show active">
                                    <table className="table table-striped mb-0">
                                        <tbody>
                                            <tr>
                                                <th>Ideal For :</th>
                                                <td>N/A</td>
                                            </tr>
                                            <tr>
                                                <th>Dress :</th>
                                                <td>N/A</td>
                                            </tr>
                                            <tr>
                                                <th>Type :</th>
                                                <td>N/A</td>
                                            </tr>
                                            <tr>
                                                <th>Work :</th>
                                                <td>N/A</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </TabPanel>
                                <TabPanel>
                                    <p className="mt-4 p-0">
                                        description
                                    </p>
                                </TabPanel>
                                <TabPanel>
                                    <div className="mt-4 text-center">
                                        <div className="embed-responsive embed-responsive16by9">
                                            <iframe

                                                src="https://www.youtube.com/embed/MIPWJshU954?autoplay=1&amp;hd=
1&amp;rel=0&amp;autohide=1&amp;showinfo=0&amp;modestbranding=1&a
mp;iv_load_policy=3&amp;enablejsapi=1"
                                                allow="autoplay; encrypted-media"
                                                allowFullScreen>
                                            </iframe>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <form className="theme-form mt-4">
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="name">Name</label>
                                                <input type="text" className="form-control"
                                                    id="name" placeholder="Enter Your name" required />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="email">Email</label>
                                                <input type="text" className="form-control"
                                                    id="email" placeholder="Email" required />
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="review">Review Title</label>
                                                <input type="text" className="form-control"
                                                    id="review" placeholder="Enter your Review Subjects" required />
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="review">Review Title</label>
                                                <textarea className="form-control"
                                                    placeholder="Wrire Your Testimonial Here"
                                                    id="exampleFormControlTextarea1" rows="6"></textarea>
                                            </div>
                                            <div className="col-md-12">
                                                <button className="btn btn-solid"
                                                    type="submit">Submit YOur Review</button>
                                            </div>
                                        </div>
                                    </form>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </section>

            </>
        )
    }
}
