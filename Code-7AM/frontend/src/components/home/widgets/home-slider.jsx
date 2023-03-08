import React, { Component } from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { HomeBannerSlider } from '../../../services/script'

export default class HomeSlider extends Component {
    render() {
        return (
            <>
                <section className="p-0">
                    <Slider className="slide-1 home-slider"  {...HomeBannerSlider} >
                        <div className="home home1 text-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <div className="slider-contain">
                                            <div>
                                                <h4>welcome to fashion</h4>
                                                <h1>men fashion</h1>
                                                <Link
                                                    className='btn btn-solid'
                                                    to={`${process.env.PUBLIC_URL}/left-sidebar/collection/men`}
                                                >Shop Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="home home2 text-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <div className="slider-contain">
                                            <div>
                                                <h4>welcome to fashion</h4>
                                                <h1>women fashion</h1>
                                                <Link
                                                    className='btn btn-solid'
                                                    to={`${process.env.PUBLIC_URL}/left-sidebar/collection/women`}
                                                >Shop Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </section>
            </>
        )
    }
}
