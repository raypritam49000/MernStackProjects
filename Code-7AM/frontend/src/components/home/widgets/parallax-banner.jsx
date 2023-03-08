import React, { Component } from 'react'

export default class ParallaxBanner extends Component {
    render() {
        return (
            <>
                <section className="p-0">
                    <div className="full-banner parallax-banner1 parallax text-center p-left">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="banner-contain">
                                        <h2>2022</h2>
                                        <h3>fashion trends</h3>
                                        <h4>special offer</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
