import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dataService } from '../../../services/data.service';

export default class ColleactioBanner extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        dataService.getAllCategory()
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
                <section className="pb-0">
                    <div className="container">
                        <div className="row partition2">
                            {
                                data.map((item, index) => {
                                    return (
                                        <div className="col-md-6" key={index}>
                                            <Link to={`${process.env.PUBLIC_URL}${item.link}`} >
                                                <div className="collection-banner p-right text-center">
                                                    <img src={item.imagePath} className="img-fluid" alt="Category Image" />
                                                    <div className="contain-banner">
                                                        <div>
                                                            <h4>save {item.isSave}%</h4>
                                                            <h2>{item.name}</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
