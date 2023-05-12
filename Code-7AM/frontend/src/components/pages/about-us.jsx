import React, { Component } from 'react'
import { Helmet } from "react-helmet";
import Breadcrumb from "../common/breadcrumb";
import { Team,Testimonial } from '../../services/script'
import Slider from "react-slick";

export default class AboutUs extends Component {


  render() {

    return (
      <>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Sahosoft Mall | About US</title>
          <meta name='description' content='Sahosoft Mall | About US' />
        </Helmet>
        <Breadcrumb title={'About US'} />
        {/*about section*/}
        <section className="about-page section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="banner-section">
                  <img className="img-fluid" alt="about us" src={`${process.env.PUBLIC_URL}/assets/images/aboutus.jpg`} />
                </div>
              </div>
              <div className="col-sm-12">
                <h4>Sahosoft is the best resource for learning Web Technologies Quickly & Easily.
                  Sahosoft website is all about creativity and innovative work in the field of Technology.</h4>
                <p>We provide Online Classes, Online Live Project Training, Corporate Training,
                  web development course videos and articles. Sahosoft Online Classes are amazing and easy to learn
                  from basic to advanced level.</p>
                <p>Sahosoft provides tutorials of different programming languages and Computer
                  subjects. The main purpose of this Course is to provide quality learning content for students and
                  professionals. we understand your attachment with the content, so committed for delivering you
                  the best possible material.</p>
              </div>
            </div>
          </div>
        </section>
        {/*Testimonial*/}
        <section className="testimonial small-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <Slider className='slide-2 testimonial-slide no-arrow' {...Testimonial}>
                  <div>
                    <div className="media">
                      <div className="text-center">
                        <img alt="testimonial image" src={`${process.env.PUBLIC_URL}/assets/images/testimonial/1.jpg`} />
                        <h5 style={{'text-align' :'left'}}>Mohan</h5>
                        <h6 style={{'text-align' :'left'}}>Designer</h6>
                      </div>
                      <div className="media-body">
                        <p>123</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="media">
                      <div className="text-center">
                        <img alt="testimonial image" src={`${process.env.PUBLIC_URL}/assets/images/testimonial/2.jpg`} />
                        <h5 style={{'text-align' :'left'}}>Satyam</h5>
                        <h6 style={{'text-align' :'left'}}>Designer</h6>
                      </div>
                      <div className="media-body">
                        <p>456</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="media">
                      <div className="text-center">
                        <img alt="testimonial image" src={`${process.env.PUBLIC_URL}/assets/images/testimonial/3.jpg`} />
                        <h5 style={{'text-align' :'left'}}>Priyanshu</h5>
                        <h6 style={{'text-align' :'left'}}>Designer</h6>
                      </div>
                      <div className="media-body">
                        <p style={{'text-align' :'left'}}>789</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="media">
                      <div className="text-center">
                        <img alt="testimonial image" src={`${process.env.PUBLIC_URL}/assets/images/testimonial/4.jpg`} />
                        <h5 style={{'text-align' :'left'}}>Payal</h5>
                        <h6 style={{'text-align' :'left'}}>Designer</h6>
                      </div>
                      <div className="media-body">
                        <p>abc</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="media">
                      <div className="text-center">
                        <img alt="testimonial image" src={`${process.env.PUBLIC_URL}/assets/images/testimonial/5.jpg`} />
                        <h5 style={{'text-align' :'left'}}>Rahul</h5>
                        <h6  style={{'text-align' :'left'}}>Designer</h6>
                      </div>
                      <div className="media-body">
                        <p>xyx</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="media">
                      <div className="text-center">
                        <img alt="testimonial image" src={`${process.env.PUBLIC_URL}/assets/images/testimonial/6.jpg`} />
                        <h5 style={{'text-align' :'left'}}>Pawan</h5>
                        <h6 style={{'text-align' :'left'}}>Designer</h6>
                      </div>
                      <div className="media-body">
                        <p>pqr</p>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </section>
        {/*Team Section*/}
        <section id="team" className="team section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h2>Our Team</h2>
                <Slider className='team' {...Team}>
                  <div>
                    <img className="img-fluid" alt="team image" src={`${process.env.PUBLIC_URL}/assets/images/team/1.jpg`} />
                    <h4>Ajeet Kumar</h4>
                    <h6>CEo & Founder At Sahosoft</h6>
                  </div>
                  <div>
                    <img className="img-fluid" alt="team image" src={`${process.env.PUBLIC_URL}/assets/images/team/2.jpg`} />
                    <h4>Chandan Kumar</h4>
                    <h6>CEo & Founder At Sahosoft</h6>
                  </div>
                  <div>
                    <img className="img-fluid" alt="team image" src={`${process.env.PUBLIC_URL}/assets/images/team/3.jpg`} />
                    <h4>Madhu Lata</h4>
                    <h6>CEo & Founder At Sahosoft</h6>
                  </div>
                  <div>
                    <img className="img-fluid" alt="team image" src={`${process.env.PUBLIC_URL}/assets/images/team/4.jpg`} />
                    <h4>Shyamli Saloni</h4>
                    <h6>CEo & Founder At Sahosoft</h6>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}
