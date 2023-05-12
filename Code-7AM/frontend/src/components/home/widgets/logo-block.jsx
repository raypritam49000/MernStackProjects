import React, { Component } from 'react'
import Slider from 'react-slick'
import { BrandLogoSlider } from '../../../services/script'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dataService } from '../../../services/data.service';

export default class LogoBlock extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.getBrandsLogo();
    }

    getBrandsLogo() {
        dataService.getAllBrands()
            .then(res => {
                if (res.isSuccess) {
                    this.setState({
                        data: res.data
                    });
                } else {
                    toast.error(res.errors[0], "Fashion Store");
                }
            }, () => {
                toast.error("Something went wrong  !!", "Fashion Store");
            });
    }
    render() {
        const { data } = this.state;
        return (
            <>
                <section className="section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <Slider className="slider-6 no arrow"  {...BrandLogoSlider} >
                                    {
                                        data.map((logo, index) => {
                                            return (
                                                <div key={index} className="logo-block" >
                                                    <img alt="brand logo" src={logo.imagePath} style={{ width: 150, height: 150 }} />
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
